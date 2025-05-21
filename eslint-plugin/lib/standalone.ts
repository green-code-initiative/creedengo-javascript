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

import { RuleModule, rules } from "./rule-list";

type RecommendedRules = {
  [recommendedRule: `@creedengo/${string}`]: string
}

const allRules: {[ruleName: string]: RuleModule}= {};
const recommendedRules: RecommendedRules = {};

for (let { ruleName, ruleModule } of rules) {
  allRules[ruleName] = ruleModule;
  const { recommended } = ruleModule.meta.docs;
  const ruleConfiguration = recommended === false ? "off" : recommended;
  recommendedRules[`@creedengo/${ruleName}`] = ruleConfiguration;
}

export const plugin = {
  meta: {
    name: "@creedengo/eslint-plugin",
    version: "2.1.0", // dynamically updated by the release workflow
  },
  rules: allRules,
  configs: {}
};

plugin.configs = {
  recommended: {
    plugins: ["@creedengo"],
    rules: recommendedRules,
  },
  ["flat/recommended"]: {
    plugins: { "@creedengo": plugin },
    rules: recommendedRules,
  },
};
