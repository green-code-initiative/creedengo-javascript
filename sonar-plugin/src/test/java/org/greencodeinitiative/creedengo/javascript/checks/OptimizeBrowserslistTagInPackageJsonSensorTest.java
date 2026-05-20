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

import org.greencodeinitiative.creedengo.javascript.JavaScriptRuleRepository;
import org.greencodeinitiative.creedengo.javascript.TypeScriptRuleRepository;
import org.junit.jupiter.api.Test;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.fs.TextRange;
import org.sonar.api.batch.rule.ActiveRule;
import org.sonar.api.batch.rule.ActiveRules;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.issue.NewIssue;
import org.sonar.api.batch.sensor.issue.NewIssueLocation;
import org.sonar.api.rule.RuleKey;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OptimizeBrowserslistTagInPackageJsonSensorTest {

    private final OptimizeBrowserslistTagInPackageJsonRule rule = new OptimizeBrowserslistTagInPackageJsonRule();

    @Test
    void analyzeSkipsWhenRuleNotActive() {
        ActiveRules activeRules = mock(ActiveRules.class);
        when(activeRules.find(any(RuleKey.class))).thenReturn(null);

        SensorContext context = mock(SensorContext.class);
        when(context.activeRules()).thenReturn(activeRules);

        rule.analyze(context, mock(InputFile.class), "{\"name\": \"app\", \"browserslist\": [\"defaults\"]}");

        verify(context, never()).newIssue();
    }

    @Test
    void analyzeCreatesIssueForNonCompliantPackageJson() {
        String contents = """
                {
                  "name": "app",
                  "browserslist": [
                    "defaults"
                  ]
                }
                """;

        RuleKey ruleKey = RuleKey.of(JavaScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY);
        ActiveRules activeRules = mock(ActiveRules.class);
        when(activeRules.find(ruleKey)).thenReturn(mock(ActiveRule.class));

        TextRange textRange = mock(TextRange.class);
        InputFile inputFile = mock(InputFile.class);
        when(inputFile.selectLine(3)).thenReturn(textRange);

        NewIssueLocation location = mock(NewIssueLocation.class);
        when(location.on(inputFile)).thenReturn(location);
        when(location.at(textRange)).thenReturn(location);
        when(location.message(any())).thenReturn(location);

        NewIssue newIssue = mock(NewIssue.class);
        when(newIssue.forRule(ruleKey)).thenReturn(newIssue);
        when(newIssue.newLocation()).thenReturn(location);
        when(newIssue.at(location)).thenReturn(newIssue);

        SensorContext context = mock(SensorContext.class);
        when(context.activeRules()).thenReturn(activeRules);
        when(context.newIssue()).thenReturn(newIssue);

        rule.analyze(context, inputFile, contents);

        verify(newIssue).save();
    }

    @Test
    void analyzeSkipsCompliantPackageJson() {
        String contents = """
                {
                  "browserslist": {
                    "production": ["last 2 Chrome versions"],
                    "development": ["last 1 Chrome version"]
                  }
                }
                """;

        RuleKey ruleKey = RuleKey.of(JavaScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY);
        ActiveRules activeRules = mock(ActiveRules.class);
        when(activeRules.find(ruleKey)).thenReturn(mock(ActiveRule.class));

        SensorContext context = mock(SensorContext.class);
        when(context.activeRules()).thenReturn(activeRules);

        rule.analyze(context, mock(InputFile.class), contents);

        verify(context, never()).newIssue();
    }

    @Test
    void analyzeFallsBackToTypeScriptRepository() {
        String contents = """
                {
                  "browserslist": ["defaults"]
                }
                """;

        RuleKey jsKey = RuleKey.of(JavaScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY);
        RuleKey tsKey = RuleKey.of(TypeScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY);
        ActiveRules activeRules = mock(ActiveRules.class);
        when(activeRules.find(jsKey)).thenReturn(null);
        when(activeRules.find(tsKey)).thenReturn(mock(ActiveRule.class));

        TextRange textRange = mock(TextRange.class);
        InputFile inputFile = mock(InputFile.class);
        when(inputFile.selectLine(2)).thenReturn(textRange);

        NewIssueLocation location = mock(NewIssueLocation.class);
        when(location.on(inputFile)).thenReturn(location);
        when(location.at(textRange)).thenReturn(location);
        when(location.message(any())).thenReturn(location);

        NewIssue newIssue = mock(NewIssue.class);
        when(newIssue.forRule(tsKey)).thenReturn(newIssue);
        when(newIssue.newLocation()).thenReturn(location);
        when(newIssue.at(location)).thenReturn(newIssue);

        SensorContext context = mock(SensorContext.class);
        when(context.activeRules()).thenReturn(activeRules);
        when(context.newIssue()).thenReturn(newIssue);

        rule.analyze(context, inputFile, contents);

        verify(newIssue).save();
    }

}
