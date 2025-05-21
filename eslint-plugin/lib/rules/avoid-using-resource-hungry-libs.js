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

/**
 * List of deprecated libraries and their suggested replacements.
 *
 * Key   = package name to forbid
 * Value = { reason: string, alternatives: string[] }
 */
const DEPRECATED_LIBS = {
  moment: {
    reason: "deprecated and heavy to load",
    alternatives: ["date-fns", "dayjs"],
  },
  iconsax: {
    reason: "does not support tree-shaking and adds large bundle size",
    alternatives: ["@mui/icons-material", "lucide-react"],
  },
  lodash: {
    reason: "too large, prefer modular imports or native methods",
    alternatives: ["lodash.get", "Array.prototype.map", "Object.assign"],
  },
  // add more entries here as needed
};

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow importing deprecated libraries and suggest lighter alternatives",
      category: "best-practice",
      recommended: "warn",
    },
    messages: {
      noDeprecatedLib:
        "Library '{{name}}' is {{reason}}. Consider using {{alternatives}}.",
    },
    schema: [],
  },

  create(context) {
    /**
     * Report a deprecation warning on the given node.
     */
    function reportDeprecation(node, libName) {
      const { reason, alternatives } = DEPRECATED_LIBS[libName];
      context.report({
        node,
        messageId: "noDeprecatedLib",
        data: {
          name: libName,
          reason,
          alternatives: alternatives.join(", "),
        },
      });
    }

    return {
      // import moment from "moment";
      ImportDeclaration(node) {
        const pkg = node.source.value;
        if (DEPRECATED_LIBS[pkg]) {
          reportDeprecation(node.source, pkg);
        }
      },

      // const moment = require("moment");
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length === 1
        ) {
          const arg = node.arguments[0];
          if (
            arg.type === "Literal" &&
            typeof arg.value === "string" &&
            DEPRECATED_LIBS[arg.value]
          ) {
            reportDeprecation(arg, arg.value);
          }
        }
      },

      // import("moment").then(...)
      ImportExpression(node) {
        const src = node.source;
        if (src.type === "Literal" && DEPRECATED_LIBS[src.value]) {
          reportDeprecation(src, src.value);
        }
      },
    };
  },
};
