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
      description: "Enforce providing a print stylesheet",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      noPrintCSSProvided: "Provide a print CSS",
    },
    schema: [],
  },
  create(context) {
    const isStyleWithPrintNode = (node) => {
      return (
        node.openingElement.name.name === "style" &&
        node.children.some((child) => {
          let element = null;
          if (child.value != null) {
            element = child.value;
          } else if (child.expression != null) {
            if (child.expression.value != null) {
              element = child.expression.value;
            } else if (child.expression.quasis?.length > 0) {
              element = child.expression.quasis[0].value.cooked;
            }
          }
          return element?.includes("@media print");
        })
      );
    };

    const isLinkForPrintNode = (node) =>
      node.openingElement.name.name === "link" &&
      node.openingElement.attributes.some(
        (attr) => attr.name.name === "media" && attr.value.value === "print",
      );

    return {
      JSXElement(node) {
        if (node.openingElement.name.name === "head") {
          const hasValidElement = node.children.some(
            (child) =>
              child.openingElement != null &&
              (isStyleWithPrintNode(child) || isLinkForPrintNode(child)),
          );

          if (!hasValidElement) {
            context.report({ node, messageId: "noPrintCSSProvided" });
          }
        }
      },
    };
  },
};
