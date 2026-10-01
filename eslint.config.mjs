// Fast lint tier for the toolkit's JavaScript templates. This repo has no
// TypeScript, no database layer and no log adapter, so the typed tier, the
// import-x boundaries and quality/no-direct-data-access were not installed.
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

import quality from "./eslint-rules/index.cjs";

export default defineConfig([
  {
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { quality },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "quality/max-lines": ["error", { max: 350 }],
      "quality/no-direct-console": ["error", { logger: "process.stdout/stderr" }],
    },
  },
  {
    // CLI scripts whose job is to print to the terminal.
    files: ["templates/eslint/verify.mjs", "templates/hooks/*.mjs"],
    rules: { "quality/no-direct-console": "off" },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { module: "readonly", require: "readonly", __dirname: "readonly" },
    },
  },
  globalIgnores([".claude/**", "node_modules/**", "dist/**", "build/**", "coverage/**", "package-lock.json"]),
]);
