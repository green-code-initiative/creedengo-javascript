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

const rule = require("../../../lib/rules/provide-print-css");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const expectedError = {
  messageId: "noPrintCSSProvided",
  type: "JSXElement",
};

ruleTester.run("provide-print-css", rule, {
  valid: [
    `
    <head>
      <title>Web Page</title>
      <link rel="stylesheet" href="styles.css" media="print" />
    </head>
    `,
    `
    <head>
      <title>Web Page</title>
      <style>@media print {}</style>
    </head>
    `,
    `
    <head>
      <title>Web Page</title>
      <style>{'@media print {}'}</style>
    </head>
    `,
    `
    <head>
      <title>Web Page</title>
      <link rel="stylesheet" href="styles.css" media="print" />,
      <style>{'@media print {}'}</style>
    </head>   
    `,
    "<head><style>{`@media print {}`}</style></head>",
    `<link rel="stylesheet" href="styles.css" />`,
  ],
  invalid: [
    {
      code: `
        <head>
          <title>Web Page</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
      `,
      errors: [expectedError],
    },
    {
      code: `
        <head>
          <title>Web Page</title>
          <style>{'@media desktop {}'}</style>
        </head>
      `,
      errors: [expectedError],
    },
  ],
});
