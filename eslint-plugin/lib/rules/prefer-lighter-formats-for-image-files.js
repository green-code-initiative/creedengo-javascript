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
      description: "Prefer lighter formats for image files",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      PreferLighterFormatsForImageFiles:
        "You should use lighter formats for image files such as {{ eligibleExtensions }}",
    },
    schema: [],
  },
  create(context) {
    const eligibleExtensions = ["webp", "avif", "svg", "jxl"];

    return {
      JSXOpeningElement(node) {
        const tagName = node.name.name;
        if (tagName?.toLowerCase() !== "img") return;

        const parentTagName = node.parent?.parent?.openingElement?.name?.name;
        if (parentTagName?.toLowerCase() === "picture") return;

        const srcAttribut = node.attributes.find(
          (attr) => attr.name.name === "src",
        );

        let srcValue = srcAttribut?.value?.value;

        if (!srcValue) return;

        srcValue = srcValue.substring(srcValue.lastIndexOf("/") + 1);
        const dotIndex = srcValue.lastIndexOf(".");

        if (dotIndex === -1) return;

        const imgExtension = srcValue.substring(dotIndex + 1);

        if (eligibleExtensions.includes(imgExtension.toLowerCase())) return;

        context.report({
          node,
          messageId: "PreferLighterFormatsForImageFiles",
          data: { eligibleExtensions: eligibleExtensions.join(", ") },
        });
      },
    };
  },
};
