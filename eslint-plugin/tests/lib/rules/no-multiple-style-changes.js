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

const rule = require("../../../lib/rules/no-multiple-style-changes");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
  messageId: "UseClassInstead",
  type: "AssignmentExpression",
};

ruleTester.run("no-multiple-style-changes", rule, {
  valid: [
    {
      code: 'element.style.height = "800px";',
    },
    {
      code: `element.style.height = "800px";
      element2.style.width = "800px";`,
    },
    {
      code: `element.style.height = "800px";
      function a() { element.style.width = "800px"; }
      `,
    },
  ],

  invalid: [
    {
      code: `function a(element){
          element.style.height = "800px";
          element.style.width = "800px";
        }`,
      errors: [expectedError],
    },
    {
      code: `element.style.height = "800px";
      element.style.width = "800px";`,
      errors: [expectedError],
    },
    {
      code: `
      function changeStyle()
      {
        var anyScopedVar;
        element.style.any = "800px";
        anotherChildElement.style.any = "800px";
        anyGlobalVar.assignation = "any";
        anyScopedVar = anyGlobalVar.assignation;
        element.style.anyOther = "800px";
      }
      `,
      errors: [expectedError],
    },
  ],
});
