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

const getPropertyValue = (propName) => (obj) => {
  if (obj.type !== "ObjectExpression") return null;
  return obj.properties.find((p) => {
    if (p.type !== "Property") return false;
    const name = p.key.type === "Identifier" ? p.key.name : p.key.value;
    return name === propName;
  })?.value;
};

const hasTorchTrueInAdvanced = (arg) => {
  const advanced = getPropertyValue("advanced")(arg);
  if (!advanced || advanced.type !== "ArrayExpression") return false;

  return advanced.elements.some((el) => {
    const torch = getPropertyValue("torch")(el);
    return torch?.type === "Literal" && torch.value === true;
  });
};

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Should not programmatically enable torch mode",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      ShouldNotProgrammaticallyEnablingTorchMode:
        "You should not programmatically enable torch mode",
    },
    schema: [],
  },
  create: function (context) {
    const reactNativeTorchLibrary = "react-native-torch";

    return {
      ImportDeclaration(node) {
        if (node.source.value === reactNativeTorchLibrary) {
          context.report({
            node,
            messageId: "ShouldNotProgrammaticallyEnablingTorchMode",
          });
        }
      },

      CallExpression(node) {
        const { callee } = node;

        const isApplyConstraints =
          callee.type === "MemberExpression" &&
          ((callee.computed &&
            callee.property.type === "Literal" &&
            callee.property.value === "applyConstraints") ||
            (!callee.computed &&
              callee.property.name === "applyConstraints")) &&
          node.arguments.length > 0;

        if (isApplyConstraints && hasTorchTrueInAdvanced(node.arguments[0])) {
          context.report({
            node,
            messageId: "ShouldNotProgrammaticallyEnablingTorchMode",
          });
        }
      },
    };
  },
};
