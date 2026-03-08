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

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-lighter-formats-for-image-files");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const preferLighterFormatsForImageFilesError = {
  messageId: "PreferLighterFormatsForImageFiles",
  type: "JSXOpeningElement",
};

ruleTester.run("prefer-lighter-formats-for-image-files", rule, {
  valid: [
    `
      <img src="./assets/images/cat.webp" alt="A cat"/>
    `,
    `
      <img src="./assets/images/cat.avif" alt="A cat"/>
    `,
    `
      <img src="./assets/images/cat.jxl" alt="A cat"/>
    `,
    `
      <picture>
        <source srcSet="image.webp" type="image/webp" />
        <img src="image.jpg" alt="..." />
      </picture>
    `,
    `
      <img src="./assets/images/cat" alt="A cat" />
    `,
    `
      <img src="" alt="" />
    `,
  ],

  invalid: [
    {
      code: `
        <img src="./assets/images/cat.jpg" alt="A cat"/>
      `,
      errors: [preferLighterFormatsForImageFilesError],
    },
    {
      code: `
        <img src="./assets/images/cat.png" alt="A cat"/>
      `,
      errors: [preferLighterFormatsForImageFilesError],
    },
  ],
});
