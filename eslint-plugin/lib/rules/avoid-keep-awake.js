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
    const librariesFoundInImports = [];

    return {
      ImportDeclaration(node) {
        const currentLibrary = node.source.value;

        if (keepAwakeLibrariesMethods[currentLibrary]) {
          librariesFoundInImports.push(currentLibrary);
        }
      },
      CallExpression(node) {
        if (librariesFoundInImports.length === 0) {
          return;
        }

        if (
          librariesFoundInImports.some((library) =>
            keepAwakeLibrariesMethods[library].includes(node.callee.name),
          )
        ) {
          context.report({ node, messageId: "AvoidKeepAwake" });
        }
      },
    };
  },
};
