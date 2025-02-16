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

/**
 * @fileoverview JavaScript linter of Creedengo project (standalone mode)
 * @author Green Code Initiative
 */
"use strict";

const rules = require("./rule-list");

const ruleModules = rules.reduce((map, rule) => {
  map[rule.ruleName] = rule.ruleModule;
  return map;
}, {});

const ruleConfigs = rules.reduce((map, rule) => {
  const recommended = rule.ruleModule.meta.docs.recommended;
  map[`@creedengo/${rule.ruleName}`] =
    recommended === false ? "off" : recommended;
  return map;
}, {});

module.exports = {
  rules: ruleModules,
  configs: { recommended: { plugins: ["@creedengo"], rules: ruleConfigs } },
};
