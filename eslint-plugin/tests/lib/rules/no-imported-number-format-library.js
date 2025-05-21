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

const rule = require("../../../lib/rules/no-imported-number-format-library");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});
const expectedError = {
  messageId: "ShouldNotUseImportedNumberFormatLibrary",
  type: "Identifier",
};

ruleTester.run("no-imported-number-format-library", rule, {
  valid: [
    "new Intl.NumberFormat().format(1000);",
    "numbro(1000).add(5);",
    `
    const number = numbro(1000);
    const number2 = numbro(2000);
    number2.add(1000);
    `,
  ],
  invalid: [
    {
      code: "numbro(1000).format({thousandSeparated: true});",
      errors: [expectedError],
    },
    {
      code: `
      const number = numbro(1000);
      number.format({thousandSeparated: true});
      `,
      errors: [expectedError],
    },
    {
      code: `
      const number = numbro(1000);
      const number2 = numbro(2000);
      number.format({thousandSeparated: true});
      `,
      errors: [expectedError],
    },
  ],
});
