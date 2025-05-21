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

const rule = require("../../../lib/rules/avoid-getters-and-setters");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });
const expectedError = { messageId: "avoidGettersAndSetters" };

ruleTester.run("avoid-getters-and-setters", rule, {
  valid: [
    // Not a getter/setter
    `
      const obj = {
        foo: 42,
        bar() { return this.foo * 2; }
      };
    `,
    // Getter with computation (not simple property access)
    `
      const obj = {
        get diameter() {
          return this.radius * 2;
        }
      };
    `,
    // Setter with computation (not simple assignment)
    `
      const obj = {
        set radius(value) {
          this._radius = Math.abs(value);
        }
      };
    `,
    // Class with computed getter
    `
      class Circle {
        get diameter() {
          return this.radius * 2;
        }
      }
    `,
    // Class with computed setter
    `
      class Circle {
        set radius(value) {
          this._radius = Math.abs(value);
        }
      }
    `,
    // Getter/setter not returning/assigning a property
    `
      const obj = {
        get foo() {
          return 42;
        },
        set foo(value) {
          doSomething(value);
        }
      };
    `,
  ],

  invalid: [
    // Object literal simple getter
    {
      code: `
        const obj = {
          _length: 42,
          get length() {
            return this._length;
          },
        };
      `,
      errors: [expectedError],
    },
    // Object literal simple setter
    {
      code: `
        const obj = {
          set length(value) {
            this._length = value;
          },
        };
      `,
      errors: [expectedError],
    },
    // Object literal getter returning identifier
    {
      code: `
        const obj = {
          get foo() {
            return _foo;
          }
        };
      `,
      errors: [expectedError],
    },
    // Object literal setter assigning identifier
    {
      code: `
        const obj = {
          set foo(value) {
            _foo = value;
          }
        };
      `,
      errors: [expectedError],
    },
    // Class simple getter
    {
      code: `
        class MyClass {
          get foo() {
            return this._foo;
          }
        }
      `,
      errors: [expectedError],
    },
    // Class simple setter
    {
      code: `
        class MyClass {
          set foo(value) {
            this._foo = value;
          }
        }
      `,
      errors: [expectedError],
    },
    // Class getter returning identifier
    {
      code: `
        class MyClass {
          get bar() {
            return _bar;
          }
        }
      `,
      errors: [expectedError],
    },
    // Class setter assigning identifier
    {
      code: `
        class MyClass {
          set bar(value) {
            _bar = value;
          }
        }
      `,
      errors: [expectedError],
    },
    // Multiple simple getters/setters in one object
    {
      code: `
        const obj = {
          get foo() { return this._foo; },
          set foo(v) { this._foo = v; },
          get bar() { return _bar; },
          set bar(v) { _bar = v; }
        };
      `,
      errors: [expectedError, expectedError, expectedError, expectedError],
    },
    // Multiple simple getters/setters in one class
    {
      code: `
        class MyClass {
          get foo() { return this._foo; }
          set foo(v) { this._foo = v; }
          get bar() { return _bar; }
          set bar(v) { _bar = v; }
        }
      `,
      errors: [expectedError, expectedError, expectedError, expectedError],
    },
  ],
});
