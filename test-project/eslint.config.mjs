import creedengo from "@creedengo/eslint-plugin";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  creedengo.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        parser: tseslint.parser, // use "espree" if not using TS
        extraFileExtensions: [".vue"],
      },
    },
  },
);
