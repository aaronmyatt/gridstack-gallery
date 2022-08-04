// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/gallery.ts'),
      name: 'GridStackGallery',
      // the proper extensions will be added
      fileName: 'gridstack-gallery',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ['gridstack'],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       gridstack: 'GridStack',
    //     },
    //   },
    // },
  },
});
