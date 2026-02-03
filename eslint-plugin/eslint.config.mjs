/*
 * creedengo JavaScript plugin - Provides rules to reduce the environmental footprint of your JavaScript programs
 * Copyright © 2023 Green Code Initiative (https://green-code-initiative.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import globals from "globals";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import licenseHeaderPlugin from "eslint-plugin-license-header";

export default [
  {
    ignores: ["dist/**", "coverage/**"],
  },
  js.configs.recommended,
  eslintPlugin.configs.recommended,
  {
    files: ["**/*.js"],
    plugins: {
      "license-header": licenseHeaderPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "license-header/header": ["error", "./docs/license-header.txt"],
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  prettierConfig,
];
