// vite.config.js
import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    // щоб не падало у dev через відсутність global
    [command === 'serve' ? 'global' : '_global']: {},
  },

  root: 'src',

  build: {
    sourcemap: true,
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
        entryFileNames: chunk =>
          chunk.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
        assetFileNames: asset =>
          asset.name && asset.name.endsWith('.html')
            ? '[name].[ext]'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
  ],

  // postcss-плагін підключається ТУТ, а не в `plugins`
  css: {
    postcss: {
      plugins: [postcssSortMediaQueries({ sort: 'mobile-first' })],
    },
  },
}));
