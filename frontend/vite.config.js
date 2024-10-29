import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173, // Port to use
  },
});
