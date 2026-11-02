import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho VH Sports E-Commerce (Sẵn sàng Deploy Vercel / Netlify / Cloudflare Pages)
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['vhsports.local', 'vhsports.test', 'localhost']
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
