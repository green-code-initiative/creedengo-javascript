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

import java.io.IOException;

import org.greencodeinitiative.creedengo.javascript.CheckList;
import org.greencodeinitiative.creedengo.javascript.JavaScriptRuleRepository;
import org.greencodeinitiative.creedengo.javascript.TypeScriptRuleRepository;
import org.sonar.api.batch.fs.FilePredicate;
import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.sensor.Sensor;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;

public class PackageJsonSensor implements Sensor {

    @Override
    public void describe(SensorDescriptor descriptor) {
        descriptor
                .name("Creedengo - package.json checks")
                .createIssuesForRuleRepository(JavaScriptRuleRepository.KEY, TypeScriptRuleRepository.KEY);
    }

    @Override
    public void execute(SensorContext context) {
        FileSystem fs = context.fileSystem();
        FilePredicate predicate = fs.predicates().matchesPathPattern("**/package.json");
        for (InputFile inputFile : fs.inputFiles(predicate)) {
            try {
                String contents = inputFile.contents();
                for (PackageJsonCheck check : CheckList.getPackageJsonChecks()) {
                    check.analyze(context, inputFile, contents);
                }
            } catch (IOException e) {
                // skip unreadable file
            }
        }
    }

}
