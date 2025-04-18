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
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/limit-db-query-results"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

const expectedError = {
  messageId: "LimitTheNumberOfReturns",
  type: "Literal",
};

ruleTester.run("limit-db-query-results", rule, {
  valid: [
    `
      sqlClient.query("SELECT id, name, email FROM customers LIMIT 10;");
    `,
    `
      sqlClient.query("SELECT TOP 5 * FROM products;");
    `,
    `
      sqlClient.query("SELECT id, name, email FROM customers WHERE id = 1");
    `,
    `
      sqlClient.query("SELECT * FROM orders FETCH FIRST 20 ROWS ONLY");
    `,
    `
      sqlClient.query("WITH numbered_customers AS (SELECT *, ROW_NUMBER() OVER (ORDER BY customer_id) AS row_num FROM customers) SELECT * FROM numbered_customers WHERE row_num <= 50");
    `,
    `
      console.log("SELECT id, name, email FROM customers WHERE id = 1");
    `,
  ],

  invalid: [
    {
      code: `sqlClient.query("SELECT * FROM bikes");`,
      errors: [expectedError],
    },
    {
      code: `sqlClient.run("SELECT id, departure, arrival FROM flights");`,
      errors: [expectedError],
    },
    {
      code: `sqlClient.execute("SELECT * FROM cars");`,
      errors: [expectedError],
    },
  ],
});
