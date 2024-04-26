import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'lib/core'),
      '@dao': resolve(__dirname, 'lib/dao'),
      '@dto': resolve(__dirname, 'lib/dto'),
      '@dom': resolve(__dirname, 'lib/dom'),
      '@plugins': resolve(__dirname, 'lib/plugins'),
    },
  },
  build: {
    minify: true,
    cssMinify: true,
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
      name: 'lx_dt',
      // the proper extensions will be added
      fileName: 'lx_dt',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        'jquery',
        'husky',
        '@types/jest',
        '@types/jquery',
        '@types/node',
        'husky',
        'jest',
        'jest-environment-jsdom',
        'lint-staged',
        'prettier',
        'ts-jest',
        'typescript',
        'vite',
        'vite-plugin-dts',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    target: 'ES2015',
  },
  plugins: [dts()],
});
