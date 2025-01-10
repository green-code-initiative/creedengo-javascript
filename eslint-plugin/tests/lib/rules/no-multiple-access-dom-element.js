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

const rule = require("../../../lib/rules/no-multiple-access-dom-element");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
  messageId: "ShouldBeAssignToVariable",
  type: "CallExpression",
};

ruleTester.run("no-multiple-access-dom-element", rule, {
  valid: [
    `
    var el1 = document.getElementById('block1').test;
    var el2 = document.getElementById('block2').test
    `,
    `
    var el1 = document.getElementsByClassName('block1').test;
    var el2 = document.getElementsByClassName('block2').test
    `,
    `
    function test() { var link = document.getElementsByTagName('a'); }
    var link = document.getElementsByTagName('a');
    `,
  ],

  invalid: [
    {
      code: "var el1 = document.getElementById('block1').test1; var el2 = document.getElementById('block1').test2",
      errors: [expectedError],
    },
    {
      code: "function test() {var el1 = document.getElementById('block1').test1; if(toto) { var el2 = document.getElementById('block1').test2 }}",
      errors: [expectedError],
    },
    {
      code: "if (true) { var card = document.querySelector('.card'); } else { var card = document.querySelector('.card'); }",
      errors: [expectedError],
    },
  ],
});
