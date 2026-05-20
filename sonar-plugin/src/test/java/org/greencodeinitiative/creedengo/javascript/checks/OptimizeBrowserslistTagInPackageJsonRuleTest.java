/*
 * Creedengo JavaScript plugin - Provides rules to reduce the environmental footprint of your JavaScript programs
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
package org.greencodeinitiative.creedengo.javascript.checks;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class OptimizeBrowserslistTagInPackageJsonRuleTest {

    @Test
    void detectNonCompliantBrowserslistArray() {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": [
                    "defaults"
                  ]
                }
                """;

        assertThat(OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(packageJson)).isTrue();
        assertThat(OptimizeBrowserslistTagInPackageJsonRule.browserslistLineNumber(packageJson)).isEqualTo(3);
    }

    @Test
    void acceptProductionBrowserslistObject() {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": {
                    "production": [
                      "last 2 Chrome versions"
                    ],
                    "development": [
                      "last 1 Chrome version"
                    ]
                  }
                }
                """;

        assertThat(OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(packageJson)).isFalse();
    }

    @Test
    void acceptPackageJsonWithoutBrowserslist() {
        String packageJson = """
                {
                  "name": "app"
                }
                """;

        assertThat(OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(packageJson)).isFalse();
        assertThat(OptimizeBrowserslistTagInPackageJsonRule.browserslistLineNumber(packageJson)).isEqualTo(1);
    }

    @Test
    void detectNonCompliantBrowserslistObjectWithoutProductionKey() {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": {
                    "development": [
                      "last 1 Chrome version"
                    ]
                  }
                }
                """;

        assertThat(OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(packageJson)).isTrue();
    }

    @Test
    void detectNonCompliantBrowserslistString() {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": "defaults and > 0.5%"
                }
                """;

        assertThat(OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(packageJson)).isTrue();
        assertThat(OptimizeBrowserslistTagInPackageJsonRule.browserslistLineNumber(packageJson)).isEqualTo(3);
    }

}