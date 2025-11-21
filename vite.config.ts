    1 import path from 'path';
    2 import { defineConfig } from 'vite';
    3 import react from '@vitejs/plugin-react';
    4
    5 export default defineConfig({
    6     server: {
    7       port: 3000,
    8       host: '0.0.0.0',
    9     },
   10     plugins: [react()],
   11     resolve: {
   12       alias: {
   13         '@': path.resolve(__dirname, '.'),
   14       }
   15     }
   16 });
