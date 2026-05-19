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
package org.greencodeinitiative.creedengo.javascript;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.sonar.check.Rule;

@Rule(key = OptimizeBrowserslistTagInPackageJsonRule.KEY)
public final class OptimizeBrowserslistTagInPackageJsonRule {

    public static final String KEY = "GCI2536";

    static final String ISSUE_MESSAGE = "Move the browserslist configuration to a \"production\" target.";

    private static final Pattern BROWSERSLIST_PATTERN = Pattern.compile(
            "\"browserslist\"\\s*:\\s*(\\{.*?\\}|\\[.*?\\]|\".*?\")", Pattern.DOTALL);

    private OptimizeBrowserslistTagInPackageJsonRule() {
    }

    static boolean isNonCompliant(String packageJsonContents) {
        Matcher matcher = BROWSERSLIST_PATTERN.matcher(packageJsonContents);
        if (!matcher.find()) {
            return false;
        }

        String browserslistConfiguration = matcher.group(1).trim();
        if (browserslistConfiguration.startsWith("{")) {
            return !browserslistConfiguration.contains("\"production\"");
        }

        return true;
    }

    static int browserslistLineNumber(String packageJsonContents) {
        Matcher matcher = BROWSERSLIST_PATTERN.matcher(packageJsonContents);
        if (!matcher.find()) {
            return 1;
        }

        return lineNumberAt(packageJsonContents, matcher.start());
    }

    private static int lineNumberAt(String text, int index) {
        return 1 + (int) text.substring(0, index).chars().filter(c -> c == '\n').count();
    }

}
