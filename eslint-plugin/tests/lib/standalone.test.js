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

describe("standalone.js", () => {
  it("should export list of rule modules", () => {
    const { rules } = require("../../lib/standalone");
    assert.notEqual(Object.keys(rules).length, 0);
    const firstRuleName = Object.keys(rules)[0];
    assert.notEqual(rules[firstRuleName].meta, null);
  });

  it("should export all rules in recommended configuration", () => {
    const { configs, rules } = require("../../lib/standalone");
    const recommended = configs.recommended;
    assert.notEqual(recommended, null);
    assert.equal(recommended.plugins.length, 1);
    assert.equal(recommended.plugins[0], "@creedengo");
    assert.equal(recommended.rules.length, rules.length);
  });
});
