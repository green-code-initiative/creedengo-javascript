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

describe("rules.js", () => {
  it("should export all rules with a specific rule id pattern", () => {
    const { rules } = require("../../dist/rules");
    assert.notEqual(rules.length, 0);
    assert.match(rules[0].ruleId, /@creedengo\/.*/);
    assert.equal(rules[0].ruleConfig.length, 0);
  });
});