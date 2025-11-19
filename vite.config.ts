import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),tailwindcss(), 

    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],

  // This is crucial for fixing the module resolution in the browser
  resolve: {
    alias: {
      // Common polyfills that need path aliases for the browser
      stream: "stream-browserify",
      util: "util/", // Mapping to util-browser
    },
  },

   server: {
    proxy: {
      "/api/deeplink": {
        target: "https://stage-partner.wingbank.com:6067",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/deeplink/, ""), 
      },

       "/api/sdk": {
        target: "https://stage-pm2.wingbank.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/sdk/, ""), 
      },  
    },
  },
});
