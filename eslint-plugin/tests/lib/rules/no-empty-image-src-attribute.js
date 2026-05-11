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

const rule = require("../../../lib/rules/no-empty-image-src-attribute");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});
const expectedError1 = {
  messageId: "SpecifySrcAttribute",
  type: "JSXAttribute",
};
const expectedError2 = {
  messageId: "SpecifySrcAttribute",
  type: "JSXOpeningElement",
};

ruleTester.run("image-src-attribute-not-empty", rule, {
  valid: [
    `
      <img src='logo.svg' alt='This is a SVG image'/>
    `,
    `
      import logoSvg from "../files/logo.svg";
      <img src={logoSvg} alt='This is a SVG image'/>
    `,
  ],

  invalid: [
    {
      code: `
        <img src=''/>
      `,
      errors: [expectedError1],
    },
    {
      code: `
        <img alt='This is an empty image'/>
      `,
      errors: [expectedError2],
    },
  ],
});
