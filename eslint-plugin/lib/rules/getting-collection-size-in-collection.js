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
      description: "Avoid getting the size/length of the collection in loops and callbacks. Assign it to a variable before the loop/callback.",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      avoidSizeInLoop: "Avoid getting the size/length of the collection in the loop or callback. Assign it to a variable before the loop/callback.",
    },
    schema: [],
  },
  create: function (context) {
    const SIZE_PROPERTIES = ["length", "size"]; // We only include static analysis on size and length properties at the moment
    const CALLBACK_METHODS = ["map", "forEach", "filter", "some", "every"];

    /**
     * Checks if a node is a .length or .size property access (dot or bracket notation).
     * If you want to only match dot notation, keep !node.computed.
     */
    function isSizeOrLengthMember(node) {
      return node.type === "MemberExpression" && SIZE_PROPERTIES.includes(node.property.name);
    }

    /**
     * Recursively walk the AST node and report if .length or .size is accessed.
     */
    function checkNodeRecursively(node) {
      if (!node) return;

      if (isSizeOrLengthMember(node)) {
        context.report({ node, messageId: "avoidSizeInLoop" });
        return;
      }

      for (const key in node) {
        // Prevents infinite recursion
        if (key === "parent") continue;
        if (!Object.prototype.hasOwnProperty.call(node, key)) continue;

        // Recursively check on each child nodes
        const child = node[key];
        if (Array.isArray(child)) {
          child.forEach(checkNodeRecursively);
        } else if (child && typeof child.type === "string") {
          checkNodeRecursively(child);
        }
      }
    }

    /**
     * Checks the callback function body of array methods like map, forEach, etc.
     */
    function checkCallbackArg(node) {
      if (
        node.arguments &&
        node.arguments.length > 0 &&
        (node.arguments[0].type === "FunctionExpression" || node.arguments[0].type === "ArrowFunctionExpression")
      ) {
        checkNodeRecursively(node.arguments[0].body);
      }
    }

    return {
      ForStatement(node) {
        checkNodeRecursively(node.test);
        checkNodeRecursively(node.body);
      },
      WhileStatement(node) {
        checkNodeRecursively(node.test);
        checkNodeRecursively(node.body);
      },
      DoWhileStatement(node) {
        checkNodeRecursively(node.test);
        checkNodeRecursively(node.body);
      },
      ForInStatement(node) {
        checkNodeRecursively(node.body);
      },
      ForOfStatement(node) {
        checkNodeRecursively(node.body);
      },
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === "MemberExpression" &&
          CALLBACK_METHODS.includes(node.callee.property.name)
        ) {
          checkCallbackArg(node);
        }
      },
    };
  },
};
