import MillionLint from "@million/lint";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
const _plugins = [react()];
_plugins.unshift(MillionLint.vite());
export default defineConfig({
  plugins: _plugins,
  server: {
    watch: {
      usePolling: true,
    },
    mimeTypes: {
      "text/javascript": ["js"],
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1"),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1"),
      },
    ],
  },
  assetsInclude: ["**/*.JPG"], // Include JPG as an asset
});
