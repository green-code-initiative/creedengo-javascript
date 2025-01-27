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
      description: "Should not import all from library",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      ShouldNotImportAllFromLibrary:
        "You should not import all from library {{library}}",
    },
    schema: [
      {
        type: "object",
        properties: {
          notAllowedLibraries: {
            type: "array",
            items: {
              type: "string",
            },
          },
          importByNamespaceNotAllowedLibraries: {
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
    const notAllowedLibraries = ["lodash", "underscore"];
    const importByNamespaceNotAllowedLibraries = ["lodash-es"];

    if (context.options?.length > 0) {
      const option = context.options[0];

      if (option.notAllowedLibraries) {
        notAllowedLibraries.push(...option.notAllowedLibraries);
      }

      if (option.importByNamespaceNotAllowedLibraries) {
        notAllowedLibraries.push(
          ...option.importByNamespaceNotAllowedLibraries,
        );
      }
    }

    return {
      ImportDeclaration(node) {
        const currentLibrary = node.source.value;

        const forbiddenByName = notAllowedLibraries.includes(currentLibrary);
        const forbiddenByNamespace =
          importByNamespaceNotAllowedLibraries.includes(currentLibrary) &&
          node.specifiers.some(
            (specifier) => specifier.type === "ImportNamespaceSpecifier",
          );

        if (forbiddenByName || forbiddenByNamespace) {
          context.report({
            node,
            messageId: "ShouldNotImportAllFromLibrary",
            data: { library: currentLibrary },
          });
        }
      },
    };
  },
};
