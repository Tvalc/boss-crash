import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Ensure CSV files are copied to dist
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    open: true,
    port: 3000
  },
  define: {
    // Environment variables for Stake integration
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.STAKE_ENV': JSON.stringify(process.env.STAKE_ENV || 'staging')
  }
});