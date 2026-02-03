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

/**
 * Helper function to get the closest function scope.
 *
 * @param {import("eslint").Scope.Scope} scope
 * @returns {import("eslint").Scope.Scope|null} the closest function scope
 */
function getFunctionScope(scope) {
  let currentScope = scope;
  while (currentScope) {
    if (currentScope.type === "function" || currentScope.type === "global") {
      return currentScope;
    }
    currentScope = currentScope.upper;
  }
  return null;
}

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
          const scope = context.sourceCode.getScope(node);
          const functionScope = getFunctionScope(scope);

          if (map[uniqueCallStr]) {
            const previousFunctionScope = map[uniqueCallStr];

            // Report error if both calls are in the same function scope
            if (previousFunctionScope === functionScope) {
              context.report({
                node,
                messageId: "ShouldBeAssignToVariable",
                data: { selector: selectorValue },
              });
              return;
            }
          }

          map[uniqueCallStr] = functionScope;
        }
      },
    };
  },
};
