import { defineConfig } from "vitest/config";
import mkcertPlugin from "vite-plugin-mkcert";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [process.env.HTTPS && mkcertPlugin(), sveltekit()],
  server: {
    proxy: {},
    port: 3000,
    host: "0.0.0.0"
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
