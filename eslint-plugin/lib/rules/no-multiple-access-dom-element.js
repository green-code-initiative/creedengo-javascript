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

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow multiple access of same DOM element",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      ShouldBeAssignToVariable:
        "'{{selector}}' selector is already used. Assign the result in a variable.",
    },
    schema: [],
  },
  create: function (context) {
    const map = {};
    const DOMAccessMethods = [
      "getElementById",
      "getElementsByTagName",
      "getElementsByClassName",
      "getElementsByName",
      "querySelector",
      "querySelectorAll",
    ];

    return {
      CallExpression(node) {
        if (
          node.callee.object?.name === "document" &&
          DOMAccessMethods.includes(node.callee.property.name) &&
          // We only accept string literals as arguments for now
          node.arguments[0].type === "Literal"
        ) {
          const selectorValue = node.arguments[0].value;
          const uniqueCallStr = node.callee.property.name + selectorValue;
          // todo: legacy support of context#getScope for eslint v7
          const scope =
            context.sourceCode?.getScope(node) ?? context.getScope();

          if (map[uniqueCallStr] === scope) {
            context.report({
              node,
              messageId: "ShouldBeAssignToVariable",
              data: { selector: selectorValue },
            });
          } else {
            map[uniqueCallStr] = scope;
          }
        }
      },
    };
  },
};
