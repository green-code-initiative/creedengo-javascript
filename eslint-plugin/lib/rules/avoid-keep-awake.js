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

const keepAwakeLibrariesMethods = {
  "expo-keep-awake": ["activateKeepAwake", "useKeepAwake"],
};

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid screen keep awake",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      AvoidKeepAwake: "Avoid screen keep awake",
    },
    schema: [],
  },
  create: function (context) {
    // Maps the local identifier name to true when it was imported from a keep-awake library.
    // Using local names handles aliased imports: import { activateKeepAwake as ka } from '…'
    const importedMethods = new Set();

    return {
      ImportDeclaration(node) {
        const currentLibrary = node.source.value;
        const methods = keepAwakeLibrariesMethods[currentLibrary];

        if (!methods) return;

        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportSpecifier") {
            const importedName = specifier.imported.name;
            if (methods.includes(importedName)) {
              // Track the local alias so renamed imports are also caught
              importedMethods.add(specifier.local.name);
            }
          }
        }
      },
      CallExpression(node) {
        if (importedMethods.size === 0) return;

        if (importedMethods.has(node.callee.name)) {
          context.report({ node, messageId: "AvoidKeepAwake" });
        }
      },
    };
  },
};
