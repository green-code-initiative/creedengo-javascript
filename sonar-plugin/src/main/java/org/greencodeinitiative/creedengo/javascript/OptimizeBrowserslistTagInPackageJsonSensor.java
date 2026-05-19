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

import java.io.IOException;

import org.sonar.api.batch.fs.FilePredicate;
import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;
import org.sonar.api.batch.sensor.issue.NewIssue;
import org.sonar.api.batch.sensor.issue.NewIssueLocation;
import org.sonar.api.rule.RuleKey;
import org.sonar.api.scanner.sensor.ProjectSensor;

public class OptimizeBrowserslistTagInPackageJsonSensor implements ProjectSensor {

    private static final RuleKey RULE_KEY = RuleKey.of(JavaScriptRuleRepository.KEY, OptimizeBrowserslistTagInPackageJsonRule.KEY);

    private final FileSystem fileSystem;

    public OptimizeBrowserslistTagInPackageJsonSensor(FileSystem fileSystem) {
        this.fileSystem = fileSystem;
    }

    @Override
    public void describe(SensorDescriptor descriptor) {
        descriptor
                .name("Optimize browserslist tag in package.json")
                .createIssuesForRuleRepository(JavaScriptRuleRepository.KEY);
    }

    @Override
    public void execute(SensorContext context) {
        InputFile packageJson = findPackageJson();
        if (packageJson == null || packageJson.isEmpty()) {
            return;
        }

        try {
            String contents = packageJson.contents();
            if (!OptimizeBrowserslistTagInPackageJsonRule.isNonCompliant(contents)) {
                return;
            }

            NewIssue issue = context.newIssue().forRule(RULE_KEY);
            NewIssueLocation location = issue.newLocation()
                    .on(packageJson)
                    .at(packageJson.selectLine(OptimizeBrowserslistTagInPackageJsonRule.browserslistLineNumber(contents)))
                    .message(OptimizeBrowserslistTagInPackageJsonRule.ISSUE_MESSAGE);

            issue.at(location).save();
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to read package.json", exception);
        }
    }

    private InputFile findPackageJson() {
        FilePredicate packageJsonPredicate = fileSystem.predicates().hasRelativePath("package.json");
        return fileSystem.inputFile(packageJsonPredicate);
    }

}