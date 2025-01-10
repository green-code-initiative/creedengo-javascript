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
      description: "Should limit the number of returns for a SQL query",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      LimitTheNumberOfReturns:
        "Try and limit the number of data returned for a single query (by using the LIMIT keyword for example)",
    },
    schema: [],
  },
  create(context) {
    //list of limiting clauses to check against
    const limitingClauses = [
      "LIMIT",
      "TOP",
      "ROW_NUMBER",
      "FETCH FIRST",
      "WHERE",
    ];
    return {
      Literal: function (node) {
        if (typeof node.value == "string") {
          const query = node.value.toUpperCase();
          if (
            query.includes("SELECT") &&
            query.includes("FROM") &&
            !limitingClauses.some((clause) => query.includes(clause))
          ) {
            context.report({
              node: node,
              messageId: "LimitTheNumberOfReturns",
            });
          }
        }
      },
    };
  },
};
