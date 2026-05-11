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

const assert = require("assert");

describe("rule-list.js", () => {
  it("should export list of valid rule modules", () => {
    const rules = require("../../lib/rule-list");
    assert.notEqual(rules.length, 0);
    const firstRule = rules[0];
    assert.notEqual(firstRule.ruleName, null);
    assert.notEqual(firstRule.ruleModule, null);
  });
});
