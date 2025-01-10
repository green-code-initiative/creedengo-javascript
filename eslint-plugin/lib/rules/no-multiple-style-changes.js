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
    function isNodeUseStyleProperty(node) {
      return node?.object?.property?.name === "style";
    }

    return {
      AssignmentExpression(node) {
        // Are we checking an assignation on a style property
        if (isNodeUseStyleProperty(node.left)) {
          const domElementName = node.left.object.object.name;
          const currentRangestart = node.left.object.object.range[0];

          /** We get the parent AST to check if there is more than one assignation on
           the style of the same domElement */
          const currentScopeASTBody =
            context.getScope().block.body.length != null
              ? context.getScope().block.body
              : context.getScope().block.body.body;

          const filtered = currentScopeASTBody.filter(
            (e) =>
              e.type === "ExpressionStatement" &&
              e.expression.type === "AssignmentExpression" &&
              isNodeUseStyleProperty(e.expression.left) &&
              e.expression.left.object.object.name === domElementName,
          );

          // De-duplication, prevents multiple alerts for each line involved
          const isCurrentNodeTheFirstAssignation =
            currentRangestart <=
            filtered[0].expression.left.object.object.range[0];

          if (filtered.length > 1 && isCurrentNodeTheFirstAssignation) {
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
