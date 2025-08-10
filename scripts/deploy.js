#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Read the current astro config
const configPath = './astro.config.mjs';
let config = fs.readFileSync(configPath, 'utf8');

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

if (isProduction) {
  // Enable base path for production
  config = config.replace(
    /\/\/ base: '\/axivm-site', \/\/ Commented out for local development/,
    "base: '/axivm-site'"
  );
} else {
  // Disable base path for development
  config = config.replace(
    /base: '\/axivm-site'/,
    "// base: '/axivm-site', // Commented out for local development"
  );
}

// Write the updated config
fs.writeFileSync(configPath, config);

console.log(`✅ Astro config updated for ${isProduction ? 'production' : 'development'} mode`);
