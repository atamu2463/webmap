import { defineConfig } from 'vite';

const REPO_NAME = 'webmap'; 

export default defineConfig({
  plugins: [], 
  base: `/webmap/`, 
  build: {
    outDir: 'dist', 
  },
});