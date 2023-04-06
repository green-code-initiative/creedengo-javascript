/**
 * Copyright (C) 2023 Green Code Initiative
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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @fileoverview JavaScript linter of ecoCode project
 * @author Green Code Initiative
 */
"use strict";

const rules = [
  // add rule names here in an alphabetical order to avoid conflicts
  "no-multiple-access-dom-element",
  "no-postfix-increment",
];

const ruleModules = {};
const configs = { recommended: { plugins: ["@ecocode"], rules: {} } };

rules.forEach((rule) => {
  ruleModules[rule] = require(`./rules/${rule}`);
  const {
    meta: {
      docs: { recommended },
    },
  } = ruleModules[rule];
  configs.recommended.rules[`@ecocode/${rule}`] =
    recommended === false ? "off" : recommended;
});

module.exports = { rules: ruleModules, configs };
