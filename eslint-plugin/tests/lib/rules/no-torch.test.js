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

const rule = require("../../../lib/rules/no-torch");
const { RuleTester } = require("eslint");
const { describe, it } = require("node:test");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});
const expectedError = {
  messageId: "ShouldNotProgrammaticallyEnablingTorchMode",
};

const tests = {
  valid: [
    // Import tests
    `import axios from 'axios';`,
    `import * as torch from 'other-package';`,
    `import { torch } from 'other-package';`,

    // applyConstraints with torch: false
    `track.applyConstraints({ advanced: [{ torch: false }] });`,
    `track.applyConstraints({ advanced: [{ torch: false }, { facingMode: 'user' }] });`,

    // applyConstraints without torch property
    `track.applyConstraints({ advanced: [{ facingMode: 'environment' }] });`,
    `track.applyConstraints({ advanced: [{ facingMode: 'environment' }, { width: 640 }] });`,

    // applyConstraints with empty advanced
    `track.applyConstraints({ advanced: [] });`,

    // applyConstraints with standard constraints (no advanced)
    `track.applyConstraints({ width: 1280, height: 720 });`,

    // Non-applyConstraints methods
    `doSomething({ advanced: [{ torch: true }] });`,
  ],

  invalid: [
    // Import react-native-torch
    {
      code: "import Torch from 'react-native-torch';",
      errors: [expectedError],
    },
    {
      code: "import { torch } from 'react-native-torch';",
      errors: [expectedError],
    },
    {
      code: "import * as ReactNativeTorch from 'react-native-torch';",
      errors: [expectedError],
    },

    // applyConstraints with torch: true
    {
      code: "track.applyConstraints({ advanced: [{ torch: true }] });",
      errors: [expectedError],
    },

    // torch: true with other properties in advanced
    {
      code: "track.applyConstraints({ advanced: [{ facingMode: 'environment' }, { torch: true }] });",
      errors: [expectedError],
    },
    {
      code: "track.applyConstraints({ advanced: [{ torch: true }, { facingMode: 'user' }] });",
      errors: [expectedError],
    },
    {
      code: "track.applyConstraints({ advanced: [{ width: 640 }, { torch: true }, { facingMode: 'environment' }] });",
      errors: [expectedError],
    },

    // Multiple torch: true entries
    {
      code: "track.applyConstraints({ advanced: [{ torch: true }, { torch: true }] });",
      errors: [expectedError],
    },

    // torch: true with extra properties in same object
    {
      code: "track.applyConstraints({ advanced: [{ torch: true, width: 640 }] });",
      errors: [expectedError],
    },
  ],
};

describe("no-torch", () => {
  it("no-torch", () => {
    ruleTester.run("no-torch", rule, tests);
  });
});
