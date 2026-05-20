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
      description: "Avoid polling without checking page visibility",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      AvoidPollingWithoutVisibilityCheck:
        "Add a visibilitychange event listener to pause polling when the page is hidden.",
    },
    schema: [],
  },
  create: function (context) {
    /** @type {import("eslint").Rule.Node[]} */
    const pollingCalls = [];
    let hasVisibilityChangeListener = false;

    /**
     * Stack of enclosing named function names (null for anonymous functions).
     * Used to detect recursive setTimeout patterns.
     * @type {(string|null)[]}
     */
    const functionNameStack = [];

    function isVisibilityChangeListener(node) {
      return (
        node.callee.type === "MemberExpression" &&
        node.callee.property.name === "addEventListener" &&
        node.arguments.length >= 1 &&
        node.arguments[0].type === "Literal" &&
        node.arguments[0].value === "visibilitychange"
      );
    }

    function isSetInterval(node) {
      return (
        node.callee.type === "Identifier" &&
        node.callee.name === "setInterval"
      );
    }

    /**
     * Detects `setTimeout(fnName, delay)` where `fnName` is an enclosing
     * function — i.e. a recursive polling pattern.
     */
    function isRecursiveSetTimeout(node) {
      if (
        node.callee.type !== "Identifier" ||
        node.callee.name !== "setTimeout" ||
        node.arguments.length < 1
      ) {
        return false;
      }
      const firstArg = node.arguments[0];
      return (
        firstArg.type === "Identifier" &&
        functionNameStack.includes(firstArg.name)
      );
    }

    return {
      FunctionDeclaration(node) {
        functionNameStack.push(node.id ? node.id.name : null);
      },
      "FunctionDeclaration:exit"() {
        functionNameStack.pop();
      },
      FunctionExpression(node) {
        functionNameStack.push(node.id ? node.id.name : null);
      },
      "FunctionExpression:exit"() {
        functionNameStack.pop();
      },

      CallExpression(node) {
        if (isVisibilityChangeListener(node)) {
          hasVisibilityChangeListener = true;
          return;
        }
        if (isSetInterval(node) || isRecursiveSetTimeout(node)) {
          pollingCalls.push(node);
        }
      },

      "Program:exit"() {
        if (!hasVisibilityChangeListener) {
          for (const node of pollingCalls) {
            context.report({
              node,
              messageId: "AvoidPollingWithoutVisibilityCheck",
            });
          }
        }
      },
    };
  },
};
