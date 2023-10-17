import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
   port: 3000
  },
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'), // Add this line
  ],
})
