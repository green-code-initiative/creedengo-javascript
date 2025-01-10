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
      description: "Avoid usage of CSS animations",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      AvoidCSSAnimations: "Avoid using {{attribute}} in CSS.",
    },
    schema: [],
  },
  create(context) {
    const forbiddenProperties = ["transition", "animation"];
    return {
      JSXOpeningElement(node) {
        const styleAttribute = node.attributes.find(
          (attribute) => attribute.name.name === "style",
        );

        if (styleAttribute?.value.expression) {
          // To prevent (for example) <div style={{ animate: 'width 2s' }}>
          const property = styleAttribute.value.expression.properties.find(
            (prop) =>
              forbiddenProperties.some((forbidProp) =>
                prop.key.name.includes(forbidProp),
              ),
          );
          if (property != null) {
            context.report({
              node: property,
              messageId: "AvoidCSSAnimations",
              data: {
                attribute: property.key.name,
              },
            });
          }
        }
      },
    };
  },
};
