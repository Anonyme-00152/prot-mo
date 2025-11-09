#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP format with optimal compression
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp'
import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  quality: 85, // WebP quality (1-100)
  effort: 6,   // Compression effort (1-6, higher = better compression but slower)
  inputPatterns: [
    'src/assets/**/*.{png,jpg,jpeg}',
    'public/**/*.{png,jpg,jpeg}'
  ],
  // Exclude already optimized images
  excludePatterns: [
    '**/*.webp',
    '**/node_modules/**',
    '**/dist/**'
  ],
  // Create responsive sizes
  generateResponsive: true,
  responsiveSizes: [320, 640, 960, 1280]
}

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath)
  return stats.size
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

async function optimizeImage(inputPath) {
  const parsed = path.parse(inputPath)
  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`)

  try {
    // Get original file size
    const originalSize = await getFileSize(inputPath)

    // Convert to WebP
    await sharp(inputPath)
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort
      })
      .toFile(outputPath)

    // Get optimized file size
    const optimizedSize = await getFileSize(outputPath)
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)

    log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`, 'green')
    log(`  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% smaller)`, 'cyan')

    // Generate responsive sizes if enabled
    if (CONFIG.generateResponsive && originalSize > 100000) { // Only for files > 100KB
      await generateResponsiveSizes(inputPath, parsed)
    }

    return {
      input: inputPath,
      output: outputPath,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    }
  } catch (error) {
    log(`✗ Failed to optimize ${inputPath}: ${error.message}`, 'red')
    return null
  }
}

async function generateResponsiveSizes(inputPath, parsed) {
  const metadata = await sharp(inputPath).metadata()

  for (const width of CONFIG.responsiveSizes) {
    // Skip if original is smaller
    if (metadata.width <= width) continue

    const outputPath = path.join(parsed.dir, `${parsed.name}_${width}w.webp`)

    try {
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: CONFIG.quality,
          effort: CONFIG.effort
        })
        .toFile(outputPath)

      const size = await getFileSize(outputPath)
      log(`  → ${width}w: ${formatBytes(size)}`, 'blue')
    } catch (error) {
      log(`  ✗ Failed to generate ${width}w: ${error.message}`, 'yellow')
    }
  }
}

async function main() {
  log('\n🖼️  Image Optimization Starting...\n', 'cyan')

  // Find all images
  const images = []
  for (const pattern of CONFIG.inputPatterns) {
    const files = await glob(pattern, {
      ignore: CONFIG.excludePatterns,
      cwd: path.resolve(__dirname, '..')
    })
    images.push(...files)
  }

  if (images.length === 0) {
    log('No images found to optimize.', 'yellow')
    return
  }

  log(`Found ${images.length} image(s) to optimize\n`, 'blue')

  // Optimize each image
  const results = []
  for (const imagePath of images) {
    const fullPath = path.resolve(__dirname, '..', imagePath)
    const result = await optimizeImage(fullPath)
    if (result) results.push(result)
    console.log('') // Empty line between images
  }

  // Summary
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0)
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0)
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)

    log('\n📊 Summary:', 'cyan')
    log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan')
    log(`Images optimized: ${results.length}`, 'green')
    log(`Total size before: ${formatBytes(totalOriginal)}`, 'yellow')
    log(`Total size after: ${formatBytes(totalOptimized)}`, 'green')
    log(`Total savings: ${formatBytes(totalOriginal - totalOptimized)} (${totalSavings}%)`, 'cyan')
    log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`, 'cyan')

    log('✓ Optimization complete!\n', 'green')
  }
}

// Run the script
main().catch(error => {
  log(`\n✗ Error: ${error.message}\n`, 'red')
  process.exit(1)
})
