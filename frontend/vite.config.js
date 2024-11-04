import { defineConfig } from 'vite';
<<<<<<< HEAD
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any IP
    port: 5173,      // Ensure it's the right port
  },
});
=======

export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173, // Specify the port you want to use
  },
});


>>>>>>> 7cb3df84cf967e5f032ed89043610627afc4892b
