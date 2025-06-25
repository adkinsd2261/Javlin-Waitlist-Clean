import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'client', // 👈 Tells Vite to look in ./client for index.html
  plugins: [react()],
  build: {
    outDir: '../dist', // 👈 Output to project-level dist
    emptyOutDir: true,
  },
});

