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

const rule = require("../../../lib/rules/avoid-getting-size-collection-in-loop");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });
const expectedError = {
  messageId: "avoidSizeInLoop",
};

ruleTester.run("avoid-getting-size-collection-in-loop", rule, {
  valid: [
    // size/length assigned before loop, not used in loop body or test
    `
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        doSomething(arr[i]);
      }
    `,
    `
      const n = arr.length;
      for (let i = n; i < n + 5; i++) {
        doSomething(arr[i - 5]);
      }
    `,
    `
      for (let i = n, n = arr.length; i < n + 5; i++) {
        doSomething(arr[i - 5]);
      }
    `,
    // unrelated property in loop condition
    `
      for (let i = 0; i < arr.customProp; i++) {
        doSomething();
      }
    `,
    // computed property (should not be flagged)
    `
      for (let i = 0; i < arr["length"]; i++) {
        doSomething();
      }
    `,
    // size/length used outside loop
    `
      let len = arr.length;
      let s = set.size;
      doSomething(len, s);
    `,
    // callback with no size/length
    `
      arr.forEach(item => {
        doSomething(item);
      });
    `,
    // unrelated method in callback
    `
      arr.map(a => a + 1);
    `,
  ],

  invalid: [
    // 1. In loop condition (test)
    {
      code: `
        for (let i = 0; i < arr.length; i++) {
          doSomething(arr[i]);
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        while (set.size > 0) {
          set.deleteOne();
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        do {
          process();
        } while (list.length !== 0);
      `,
      errors: [expectedError],
    },
    {
      code: `
        for (; arr.length > 0;) {
          arr.pop();
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        while (0 !== arr.length) {
          arr.pop();
        }
      `,
      errors: [expectedError],
    },

    // 2. In loop body (direct)
    {
      code: `
        for (let i = 0; i < 5; i++) {
          arr.length;
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        while (true) {
          arr.size;
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        do {
          arr.length;
        } while (false);
      `,
      errors: [expectedError],
    },

    // 3. In loop body (recursive/nested)
    {
      code: `
        for (let i = 0; i < 5; i++) {
          if (arr.length > 0) {
            doSomething();
          }
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        while (true) {
          function inner() {
            return arr.size;
          }
        }
      `,
      errors: [expectedError],
    },

    // 4. As method call (arr.size())
    {
      code: `
        for (let i = 0; i < 5; i++) {
          arr.size();
        }
      `,
      errors: [expectedError],
    },
    {
      code: `
        while (true) {
          arr.length();
        }
      `,
      errors: [expectedError],
    },

    // 5. In callback of collection methods
    {
      code: `
        arr.filter(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.find(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.findIndex(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.findLast(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.findLastIndex(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.some(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.every(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.flatMap(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.forEach(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.map(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.reduce(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    {
      code: `
        arr.reduceRight(item => {
          doSomething(arr.length);
        });
      `,
      errors: [expectedError],
    },
    // 6. Multiple in one loop
    {
      code: `
        for (let i = 0; i < arr.length; i++) {
          arr.size();
        }
      `,
      errors: [expectedError, expectedError],
    },
  ],
});
