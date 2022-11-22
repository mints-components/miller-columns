import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'miller-columns-select',
      fileName: 'miller-columns-select',
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
  },
});
