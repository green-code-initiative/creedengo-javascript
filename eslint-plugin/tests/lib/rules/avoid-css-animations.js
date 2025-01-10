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

ruleTester.run("avoid-css-animations", rule, {
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
          type: "Property",
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
          type: "Property",
        },
      ],
    },
  ],
});
