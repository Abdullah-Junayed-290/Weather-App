import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from "dotenv";

//load .env 
config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
      "env": process.env
  }
})
