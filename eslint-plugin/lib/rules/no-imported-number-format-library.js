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
      description: "You should not format number with an external library",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      ShouldNotUseImportedNumberFormatLibrary:
        "You should not format number with an external library",
    },
    schema: [],
  },

  create: function (context) {
    let variablesNumbro = [];

    const errorReport = (node) => ({
      node,
      messageId: "ShouldNotUseImportedNumberFormatLibrary",
    });

    return {
      VariableDeclarator(node) {
        if (node.init.callee?.name === "numbro") {
          variablesNumbro.push(node.id.name);
        }
      },
      CallExpression(node) {
        const formatIsCalledOnANumbroTypeVariable =
          node.callee.type === "MemberExpression" &&
          variablesNumbro.includes(node.callee.object.name) &&
          node.callee.property.name === "format";
        if (formatIsCalledOnANumbroTypeVariable) {
          context.report(errorReport(node.callee.property));
        }
        let formatIsCalledOnNumbroInstance =
          node.parent.type === "MemberExpression" &&
          node.callee.name === "numbro" &&
          node.parent.property.name === "format";
        if (formatIsCalledOnNumbroInstance) {
          context.report(errorReport(node.parent.property));
        }
      },
    };
  },
};
