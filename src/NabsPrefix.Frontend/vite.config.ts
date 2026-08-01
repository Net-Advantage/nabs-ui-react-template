import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const apiBaseUrl =
  process.env.services__api__http__0 ?? process.env.SERVICES__API__HTTP__0 ?? "http://localhost:5363";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiBaseUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/ShellComponents/**/*.ts", "src/Pages/**/**.view-model.ts"],
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 85,
      },
    },
  },
});
