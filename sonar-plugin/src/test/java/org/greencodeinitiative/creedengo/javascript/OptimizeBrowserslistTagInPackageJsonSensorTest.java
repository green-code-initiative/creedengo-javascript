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

import org.junit.jupiter.api.Test;
import org.mockito.Answers;
import org.sonar.api.batch.fs.FilePredicate;
import org.sonar.api.batch.fs.FilePredicates;
import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.fs.TextRange;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.issue.NewIssue;
import org.sonar.api.batch.sensor.issue.NewIssueLocation;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class OptimizeBrowserslistTagInPackageJsonSensorTest {

    @Test
    void reportIssueForNonCompliantPackageJson() throws Exception {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": [
                    "defaults"
                  ]
                }
                """;

        FileSystem fileSystem = mock(FileSystem.class);
        FilePredicates predicates = mock(FilePredicates.class);
        FilePredicate predicate = mock(FilePredicate.class);
        InputFile inputFile = mock(InputFile.class);
        SensorContext context = mock(SensorContext.class);
        NewIssue issue = mock(NewIssue.class, Answers.RETURNS_SELF);
        NewIssueLocation location = mock(NewIssueLocation.class, Answers.RETURNS_SELF);
        TextRange textRange = mock(TextRange.class);

        when(fileSystem.predicates()).thenReturn(predicates);
        when(predicates.hasRelativePath("package.json")).thenReturn(predicate);
        when(fileSystem.inputFile(predicate)).thenReturn(inputFile);
        when(inputFile.isEmpty()).thenReturn(false);
        when(inputFile.contents()).thenReturn(packageJson);
        when(inputFile.selectLine(3)).thenReturn(textRange);
        when(context.newIssue()).thenReturn(issue);
        when(issue.newLocation()).thenReturn(location);

        new OptimizeBrowserslistTagInPackageJsonSensor(fileSystem).execute(context);

        verify(context).newIssue();
        verify(issue).forRule(eq(org.sonar.api.rule.RuleKey.of(JavaScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY)));
        verify(location).on(inputFile);
        verify(location).at(textRange);
        verify(location).message(OptimizeBrowserslistTagInPackageJsonRule.ISSUE_MESSAGE);
        verify(issue).save();
    }

    @Test
    void doNotReportIssueWhenPackageJsonIsCompliant() throws Exception {
        String packageJson = """
                {
                  "name": "app",
                  "browserslist": {
                    "production": [
                      "last 2 Chrome versions"
                    ]
                  }
                }
                """;

        FileSystem fileSystem = mock(FileSystem.class);
        FilePredicates predicates = mock(FilePredicates.class);
        FilePredicate predicate = mock(FilePredicate.class);
        InputFile inputFile = mock(InputFile.class);
        SensorContext context = mock(SensorContext.class);

        when(fileSystem.predicates()).thenReturn(predicates);
        when(predicates.hasRelativePath("package.json")).thenReturn(predicate);
        when(fileSystem.inputFile(predicate)).thenReturn(inputFile);
        when(inputFile.isEmpty()).thenReturn(false);
        when(inputFile.contents()).thenReturn(packageJson);

        assertThatCode(() -> new OptimizeBrowserslistTagInPackageJsonSensor(fileSystem).execute(context)).doesNotThrowAnyException();

        verify(context, never()).newIssue();
    }

    @Test
    void doNotReportIssueWhenPackageJsonNotFound() {
        FileSystem fileSystem = mock(FileSystem.class);
        FilePredicates predicates = mock(FilePredicates.class);
        FilePredicate predicate = mock(FilePredicate.class);
        SensorContext context = mock(SensorContext.class);

        when(fileSystem.predicates()).thenReturn(predicates);
        when(predicates.hasRelativePath("package.json")).thenReturn(predicate);
        when(fileSystem.inputFile(predicate)).thenReturn(null);

        assertThatCode(() -> new OptimizeBrowserslistTagInPackageJsonSensor(fileSystem).execute(context)).doesNotThrowAnyException();

        verify(context, never()).newIssue();
    }

    @Test
    void doNotReportIssueWhenPackageJsonIsEmpty() {
        FileSystem fileSystem = mock(FileSystem.class);
        FilePredicates predicates = mock(FilePredicates.class);
        FilePredicate predicate = mock(FilePredicate.class);
        InputFile inputFile = mock(InputFile.class);
        SensorContext context = mock(SensorContext.class);

        when(fileSystem.predicates()).thenReturn(predicates);
        when(predicates.hasRelativePath("package.json")).thenReturn(predicate);
        when(fileSystem.inputFile(predicate)).thenReturn(inputFile);
        when(inputFile.isEmpty()).thenReturn(true);

        assertThatCode(() -> new OptimizeBrowserslistTagInPackageJsonSensor(fileSystem).execute(context)).doesNotThrowAnyException();

        verify(context, never()).newIssue();
    }

}