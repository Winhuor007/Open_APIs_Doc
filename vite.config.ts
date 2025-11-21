import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],

  define: {
    global: "globalThis",
  },

  resolve: {
    alias: {
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      crypto: "rollup-plugin-node-polyfills/polyfills/crypto-browserify",
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },

  // ✅ ADD THIS SECTION
  build: {
    chunkSizeWarningLimit:3000, // Increase bundle size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";  // separate vendor bundle
          }
        },
      },
    },
  },

  server: {
    proxy: {
      "/api/deeplink": {
        target: "https://stage-partner.wingbank.com:6067",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api\/deeplink/, ""),
      },

      "/api/sdk": {
        target: "https://stage-pm2.wingbank.com",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api\/sdk/, ""),
      },
    },
  },
});
