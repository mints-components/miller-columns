import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { dependencies, peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'miller-columns-select',
      fileName: (format) => `miller-columns-select.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
    },
  },
});
