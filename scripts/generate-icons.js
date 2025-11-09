/**
 * PWA Icon Generator
 * Generates all required icon sizes from a base image
 *
 * Usage: node scripts/generate-icons.js [source-image]
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Icon sizes required for PWA
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

// Paths
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons')
const DEFAULT_SOURCE = path.resolve(__dirname, '../src/assets/mikail_lekesiz.png')

/**
 * Generate a single icon size
 */
async function generateIcon(sourceImage, size, outputDir) {
  const outputPath = path.join(outputDir, `icon-${size}x${size}.png`)

  try {
    await sharp(sourceImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(outputPath)

    console.log(`✅ Generated: icon-${size}x${size}.png`)
    return true
  } catch (error) {
    console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error.message)
    return false
  }
}

/**
 * Generate maskable icons with safe zone
 * Adds padding for adaptive icons
 */
async function generateMaskableIcon(sourceImage, size, outputDir) {
  const outputPath = path.join(outputDir, `icon-${size}x${size}-maskable.png`)

  try {
    // Calculate padding (10% on each side = 80% safe zone)
    const padding = Math.floor(size * 0.1)
    const innerSize = size - (padding * 2)

    // Create canvas with padding
    await sharp(sourceImage)
      .resize(innerSize, innerSize, {
        fit: 'cover',
        position: 'center',
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(outputPath)

    console.log(`✅ Generated maskable: icon-${size}x${size}-maskable.png`)
    return true
  } catch (error) {
    console.error(`❌ Failed to generate maskable icon-${size}x${size}.png:`, error.message)
    return false
  }
}

/**
 * Check if source image exists and is valid
 */
async function validateSourceImage(imagePath) {
  try {
    const stats = await stat(imagePath)
    if (!stats.isFile()) {
      throw new Error('Source is not a file')
    }

    // Try to load with Sharp to validate it's an image
    const metadata = await sharp(imagePath).metadata()

    if (metadata.width < 512 || metadata.height < 512) {
      console.warn('⚠️  Warning: Source image is smaller than 512x512. Results may be low quality.')
    }

    console.log(`📸 Source image: ${path.basename(imagePath)}`)
    console.log(`   Size: ${metadata.width}x${metadata.height}`)
    console.log(`   Format: ${metadata.format}`)

    return true
  } catch (error) {
    console.error(`❌ Invalid source image: ${error.message}`)
    return false
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 PWA Icon Generator\n')

  // Get source image from command line or use default
  const sourceImage = process.argv[2] || DEFAULT_SOURCE

  // Validate source image
  console.log('🔍 Validating source image...')
  const isValid = await validateSourceImage(sourceImage)
  if (!isValid) {
    console.error('\n❌ Please provide a valid image file.')
    console.log('Usage: node scripts/generate-icons.js [source-image]')
    console.log(`Example: node scripts/generate-icons.js ${DEFAULT_SOURCE}`)
    process.exit(1)
  }

  // Generate icons
  console.log(`\n📦 Generating ${ICON_SIZES.length} icon sizes...`)

  let successCount = 0
  for (const size of ICON_SIZES) {
    const success = await generateIcon(sourceImage, size, ICONS_DIR)
    if (success) successCount++

    // Generate maskable versions for key sizes (192 and 512)
    if (size === 192 || size === 512) {
      await generateMaskableIcon(sourceImage, size, ICONS_DIR)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log(`✅ Successfully generated ${successCount}/${ICON_SIZES.length} icons`)
  console.log(`📁 Output directory: ${ICONS_DIR}`)

  if (successCount === ICON_SIZES.length) {
    console.log('\n🎉 All icons generated successfully!')
    console.log('\nNext steps:')
    console.log('1. Review icons in public/icons/')
    console.log('2. Test PWA installation on mobile device')
    console.log('3. Run: npm run build')
    console.log('4. Deploy to production')
  } else {
    console.log('\n⚠️  Some icons failed to generate. Please check the errors above.')
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
