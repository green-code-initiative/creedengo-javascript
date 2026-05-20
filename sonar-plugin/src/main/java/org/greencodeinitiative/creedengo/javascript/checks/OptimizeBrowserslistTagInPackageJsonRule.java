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

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.greencodeinitiative.creedengo.javascript.JavaScriptRuleRepository;
import org.greencodeinitiative.creedengo.javascript.TypeScriptRuleRepository;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.issue.NewIssue;
import org.sonar.api.rule.RuleKey;
import org.sonar.check.Rule;

@Rule(key = OptimizeBrowserslistTagInPackageJsonRule.KEY)
public final class OptimizeBrowserslistTagInPackageJsonRule implements PackageJsonCheck {

    public static final String KEY = "GCI2536";

    public static final String ISSUE_MESSAGE = "Move the browserslist configuration to a \"production\" target.";

    private static final Pattern BROWSERSLIST_PATTERN = Pattern.compile(
            "\"browserslist\"\\s*:\\s*(\\{.*?\\}|\\[.*?\\]|\".*?\")", Pattern.DOTALL);

    @Override
    public void analyze(SensorContext context, InputFile inputFile, String contents) {
        RuleKey jsRuleKey = RuleKey.of(JavaScriptRuleRepository.KEY, KEY);
        RuleKey tsRuleKey = RuleKey.of(TypeScriptRuleRepository.KEY, KEY);

        RuleKey activeRuleKey = null;
        if (context.activeRules().find(jsRuleKey) != null) {
            activeRuleKey = jsRuleKey;
        } else if (context.activeRules().find(tsRuleKey) != null) {
            activeRuleKey = tsRuleKey;
        }

        if (activeRuleKey == null || !isNonCompliant(contents)) {
            return;
        }

        int line = browserslistLineNumber(contents);
        NewIssue issue = context.newIssue().forRule(activeRuleKey);
        issue.at(
                issue.newLocation()
                        .on(inputFile)
                        .at(inputFile.selectLine(line))
                        .message(ISSUE_MESSAGE)
        ).save();
    }

    public static boolean isNonCompliant(String packageJsonContents) {
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

    public static int browserslistLineNumber(String packageJsonContents) {
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
