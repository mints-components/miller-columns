import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import { dependencies, peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ outDir: 'types', rollupTypes: true })],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'miller-columns',
      fileName: 'miller-columns',
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
    },
  },
});
