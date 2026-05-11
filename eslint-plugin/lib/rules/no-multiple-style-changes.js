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
      description: "Disallow multiple style changes at once",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      UseClassInstead:
        "There are more than two style assignments for '{{elementName}}'. Use a class instead.",
    },
    schema: [],
  },
  create: function (context) {
    const isNodeUseStyleProperty = (node) =>
      node?.object?.property?.name === "style";

    const getNodeFullName = (node) => {
      let names = [];
      do {
        names.unshift(node.name ?? node.property?.name);
        node = node.object;
      } while (node);
      return names.join(".");
    };

    return {
      AssignmentExpression(node) {
        // Check if there is a literal assignation on a style property
        if (
          node.right.type === "Literal" &&
          isNodeUseStyleProperty(node.left)
        ) {
          const domElementName = getNodeFullName(node.left.object.object);
          const currentRangestart = node.left.object.object.range[0];

          /**
           * Store parent AST to check if there is more
           * than one assignation on the style of the same domElement
           */
          const scope = context.sourceCode.getScope(node);
          const currentScopeASTBody =
            scope.block.body.length != null
              ? scope.block.body
              : scope.block.body.body;

          const filtered = currentScopeASTBody.filter(
            (e) =>
              e.type === "ExpressionStatement" &&
              e.expression.type === "AssignmentExpression" &&
              isNodeUseStyleProperty(e.expression.left) &&
              getNodeFullName(e.expression.left.object.object) ===
                domElementName,
          );

          // De-duplication, prevents multiple alerts for each line involved
          const isCurrentNodeTheFirstAssignation =
            filtered.length > 1 &&
            currentRangestart <=
              filtered[0].expression.left.object.object.range[0];

          if (isCurrentNodeTheFirstAssignation) {
            context.report({
              node,
              messageId: "UseClassInstead",
              data: { elementName: domElementName },
            });
          }
        }
      },
    };
  },
};
