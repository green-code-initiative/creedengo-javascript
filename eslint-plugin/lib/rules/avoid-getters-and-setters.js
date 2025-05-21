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
      description: "Avoid rewriting native getter and setters.",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      avoidGettersAndSetters:
        "Avoid rewriting native getter and setters for direct property access.",
    },
    schema: [],
  },
  create: function (context) {
    /**
     * Checks if a getter simply returns an object property.
     */
    function isSimpleGetter(node) {
      if (node.value && node.value.body && node.value.body.body.length === 1) {
        const stmt = node.value.body.body[0];
        if (
          stmt.type === "ReturnStatement" &&
          stmt.argument &&
          // return this.foo;
          ((stmt.argument.type === "MemberExpression" &&
            stmt.argument.object.type === "ThisExpression") ||
            // return _foo;
            stmt.argument.type === "Identifier")
        ) {
          return true;
        }
      }
      return false;
    }

    /**
     * Checks if a setter simply assigns its parameter to a property (this.foo = value or foo = value).
     */
    function isSimpleSetter(node) {
      if (node.value && node.value.body && node.value.body.body.length === 1) {
        const stmt = node.value.body.body[0];
        if (
          stmt.type === "ExpressionStatement" &&
          stmt.expression.type === "AssignmentExpression" &&
          // this.foo = value;
          ((stmt.expression.left.type === "MemberExpression" &&
            stmt.expression.left.object.type === "ThisExpression") ||
            // foo = value;
            stmt.expression.left.type === "Identifier") &&
          stmt.expression.right.type === "Identifier" &&
          node.value.params.length === 1 &&
          stmt.expression.right.name === node.value.params[0].name
        ) {
          return true;
        }
      }
      return false;
    }

    return {
      // For object literals: { get foo() {...} } or { set foo(v) {...} }
      Property(node) {
        if (
          (node.kind === "get" && isSimpleGetter(node)) ||
          (node.kind === "set" && isSimpleSetter(node))
        ) {
          context.report({ node, messageId: "avoidGettersAndSetters" });
        }
      },
      // For classes: class { get foo() {...} } or class { set foo(v) {...} }
      MethodDefinition(node) {
        if (
          (node.kind === "get" && isSimpleGetter(node)) ||
          (node.kind === "set" && isSimpleSetter(node))
        ) {
          context.report({ node, messageId: "avoidGettersAndSetters" });
        }
      },
    };
  },
};
