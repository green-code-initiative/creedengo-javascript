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

const rule = require("../../../lib/rules/avoid-css-animations");
const { RuleTester } = require("eslint");
const { describe, it } = require("node:test");

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

const vueRuleTester = new RuleTester({
  languageOptions: {
    parser: require("vue-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: require("@typescript-eslint/parser"),
    },
  },
});

const tests = {
  valid: [
    `
    import React from 'react';
    import './styles.css'; // External CSS file

    const MyComponent = () => {
      return <div className="my-class">This content is styled using an external CSS file.</div>;
    };

    export default MyComponent;
    `,
    `<div style={{ width: '100px', height: '100px' }}>Hello world</div>`,
    `<div style="border: 2px solid red">My red element</div>`,
    // spread attributes should not throw an error (#49)
    "<input {...inputProps} className={styles.input} onChange={handleChange}/>",
    // spread style attributes should not throw an error (#100)
    "<input style={{ ...inputProps.style, color: 'red' }} onChange={handleChange}/>",
  ],

  invalid: [
    {
      code: "<div style={{ transition: 'width 2s' }} />",
      errors: [
        {
          messageId: "AvoidCSSAnimations",
          data: {
            attribute: "transition",
          },
        },
      ],
    },
    {
      code: "<div style={{ animationName: 'example', animationDuration: '4s' }} />",
      errors: [
        {
          messageId: "AvoidCSSAnimations",
          data: {
            attribute: "animationName",
          },
        },
      ],
    },
  ],
};

const vueTests = {
  valid: [
    "<template><div style='border: 2px solid red'></div></template>",
    "<template><div :style=\"{ transition: 'width 2s' }\"></div></template>",
  ],
  invalid: [
    {
      code: "<template><div style='transition: width 2s'></div></template>",
      errors: [
        { messageId: "AvoidCSSAnimations", data: { attribute: "transition" } },
      ],
    },
    {
      code: "<template><div style='animation: spin 2s linear'></div></template>",
      errors: [
        { messageId: "AvoidCSSAnimations", data: { attribute: "animation" } },
      ],
    },
  ],
};

describe("avoid-css-animations", () => {
  it("React", () => {
    ruleTester.run("avoid-css-animations", rule, tests);
  });

  it("Vue", () => {
    vueRuleTester.run("avoid-css-animations", rule, vueTests);
  });
});
