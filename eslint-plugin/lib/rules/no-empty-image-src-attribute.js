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

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow usage of image with empty source attribute",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      SpecifySrcAttribute:
        "Make sure to specify src attribute when using <img/>.",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === "img") {
          const srcValue = node.attributes.find(
            (attr) => attr.name.name === "src",
          );
          if (srcValue?.value?.value === "") {
            //to prevent <img src='' alt='Empty image'/>
            context.report({
              node: srcValue,
              messageId: "SpecifySrcAttribute",
            });
          } else if (!srcValue) {
            //to prevent <img />
            context.report({
              node,
              messageId: "SpecifySrcAttribute",
            });
          }
        }
      },
    };
  },
};
