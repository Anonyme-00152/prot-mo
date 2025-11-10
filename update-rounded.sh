#!/bin/bash

# Script pour arrondir tous les coins dans le projet

cd /home/ubuntu/prot-mo/src

# Fonction pour remplacer dans tous les fichiers JSX
find . -name "*.jsx" -type f -exec sed -i \
  -e 's/rounded-\[2px\]/rounded-lg/g' \
  -e 's/rounded-\[4px\]/rounded-xl/g' \
  -e 's/\brounded-xs\b/rounded-xl/g' \
  -e 's/\brounded-sm\b/rounded-xl/g' \
  -e 's/\brounded-md\b/rounded-2xl/g' \
  -e 's/\brounded-lg\b/rounded-2xl/g' \
  -e 's/\brounded-xl\b/rounded-3xl/g' \
  -e 's/\brounded-2xl\b/rounded-3xl/g' \
  -e 's/\brounded\b\([^-]\)/rounded-2xl\1/g' \
  {} +

echo "✅ Remplacement terminé dans tous les fichiers JSX"
