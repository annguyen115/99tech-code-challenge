import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Main al
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@enums': path.resolve(__dirname, 'src/shared/enums'),
      '@common-types': path.resolve(__dirname, 'src/shared/types'),
      '@constants': path.resolve(__dirname, 'src/shared/constants'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
    }
  }
});
