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

const rule = require("../../../lib/rules/no-import-all-from-library");
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
  messageId: "ShouldNotImportAllFromLibrary",
  type: "ImportDeclaration",
};

ruleTester.run("no-import-all-from-library", rule, {
  valid: [
    `
    import isEmpty from 'lodash/isEmpty';
    `,
    `
    import orderBy from 'lodash/orderBy';
    `,
    `
    import { orderBy } from 'lodash-es';
    `,
    `
    import map from 'underscore/modules/map.js';
    `,
  ],

  invalid: [
    {
      code: "import lodash from 'lodash';",
      errors: [expectedError],
    },
    {
      code: "import * as lodash from 'lodash';",
      errors: [expectedError],
    },
    {
      code: "import * as lodash from 'lodash-es';",
      errors: [expectedError],
    },
    {
      code: "import someLib from 'some-lib';",
      options: [{ notAllowedLibraries: ["some-lib"] }],
      errors: [expectedError],
    },
    {
      code: "import * as someLib from 'some-lib';",
      options: [{ importByNamespaceNotAllowedLibraries: ["some-lib"] }],
      errors: [expectedError],
    },
  ],
});
