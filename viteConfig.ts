import { defineConfig } from 'vite';

const REPO_NAME = 'webmap'; 

export default defineConfig({
  plugins: [], 
  base: `/${REPO_NAME}/`, 
  build: {
    outDir: 'dist', 
  },
});