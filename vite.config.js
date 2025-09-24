import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/Amazon__Frontend",
    build: {
    chunkSizeWarningLimit: 1000, 
  },
  plugins: [react()],
  server: {
    port:3000,
  }
})


// 