export default defineConfig(({ command }) => {
  return {
    base: '/goit-js-hw-12/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
          assetFileNames: assetInfo =>
            assetInfo.name && assetInfo.name.endsWith('.html')
              ? '[name].[ext]'
              : 'assets/[name]-[hash][extname]',
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});
