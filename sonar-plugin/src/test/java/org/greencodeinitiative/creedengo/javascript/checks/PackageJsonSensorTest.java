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
import java.util.List;

import org.greencodeinitiative.creedengo.javascript.JavaScriptRuleRepository;
import org.greencodeinitiative.creedengo.javascript.TypeScriptRuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.sonar.api.batch.fs.FilePredicate;
import org.sonar.api.batch.fs.FilePredicates;
import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.rule.ActiveRules;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class PackageJsonSensorTest {

    private SensorContext context;
    private FilePredicate predicate;
    private FileSystem fs;
    private PackageJsonSensor sensor;

    @BeforeEach
    void setUp() {
        sensor = new PackageJsonSensor();

        predicate = mock(FilePredicate.class);
        FilePredicates predicates = mock(FilePredicates.class);
        when(predicates.matchesPathPattern("**/package.json")).thenReturn(predicate);

        fs = mock(FileSystem.class);
        when(fs.predicates()).thenReturn(predicates);

        ActiveRules activeRules = mock(ActiveRules.class);
        when(activeRules.find(any())).thenReturn(null);

        context = mock(SensorContext.class);
        when(context.fileSystem()).thenReturn(fs);
        when(context.activeRules()).thenReturn(activeRules);
    }

    @Test
    void describe() {
        SensorDescriptor descriptor = mock(SensorDescriptor.class);
        when(descriptor.name(anyString())).thenReturn(descriptor);

        sensor.describe(descriptor);

        verify(descriptor).name("Creedengo - package.json checks");
        verify(descriptor).createIssuesForRuleRepository(JavaScriptRuleRepository.KEY, TypeScriptRuleRepository.KEY);
    }

    @Test
    void executeCallsChecksForEachPackageJson() throws IOException {
        InputFile inputFile = mock(InputFile.class);
        when(inputFile.contents()).thenReturn("{\"name\": \"app\"}");
        when(fs.inputFiles(predicate)).thenReturn(List.of(inputFile));

        sensor.execute(context);

        verify(inputFile).contents();
    }

    @Test
    void executeSkipsUnreadableFile() throws IOException {
        InputFile inputFile = mock(InputFile.class);
        when(inputFile.contents()).thenThrow(new IOException("disk error"));
        when(fs.inputFiles(predicate)).thenReturn(List.of(inputFile));

        sensor.execute(context);

        verify(inputFile).contents();
    }

    @Test
    void executeDoesNothingWhenNoPackageJson() throws IOException {
        InputFile inputFile = mock(InputFile.class);
        when(fs.inputFiles(predicate)).thenReturn(List.of());

        sensor.execute(context);

        verify(inputFile, never()).contents();
    }

}
