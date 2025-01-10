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
      description: "Encourage usage of shorthand CSS notations",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      PreferShorthandCSSNotation:
        "Prefer the shorthand CSS notation {{property}}",
    },
    schema: [
      {
        type: "object",
        properties: {
          disableProperties: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: function (context) {
    const shorthandProperties = {
      animation: ["animationName", "animationDuration"],
      background: [
        "backgroundColor",
        "backgroundImage",
        "backgroundPosition",
        "backgroundRepeat",
      ],
      border: ["borderColor", "borderStyle", "borderWidth"],
      column: ["columnCount", "columnWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      font: ["fontFamily", "fontSize", "fontStyle"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows"],
      gridTemplate: ["gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
      offset: ["offsetPath", "offsetPosition"],
      outline: ["outlineStyle", "outlineWidth", "outlineColor"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle",
      ],
      transition: ["transitionProperty", "transitionDuration"],
    };

    const disabledProperties = context.options?.[0]?.disableProperties ?? [];

    return {
      JSXOpeningElement(node) {
        const styleAttribute = node.attributes.find(
          (attr) => attr.name.name === "style",
        );
        if (styleAttribute) {
          const nodePropertyNames =
            styleAttribute.value.expression.properties.map(
              (property) => property.key.name,
            );

          for (const [shorthandProp, matchProperties] of Object.entries(
            shorthandProperties,
          )) {
            if (
              !disabledProperties.includes(shorthandProp) &&
              matchProperties.every((prop) => nodePropertyNames.includes(prop))
            ) {
              return context.report({
                node: styleAttribute,
                messageId: "PreferShorthandCSSNotation",
                data: { property: shorthandProp },
              });
            }
          }
        }
      },
    };
  },
};
