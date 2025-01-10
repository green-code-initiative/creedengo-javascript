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
import org.sonar.api.SonarRuntime;
import org.sonar.api.server.rule.RulesDefinition;
import org.sonar.api.utils.Version;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TypeScriptRulesDefinitionTest {

    @Test
    void createRepository() {
        SonarRuntime sonarRuntime = mock(SonarRuntime.class);
        when(sonarRuntime.getApiVersion()).thenReturn(Version.create(0, 0));

        RulesDefinition.Context context = new RulesDefinition.Context();
        new TypeScriptRulesDefinition(sonarRuntime).define(context);
        assertThat(context.repositories()).hasSize(1);

        RulesDefinition.Repository repository = context.repositories().get(0);
        assertThat(repository.isExternal()).isFalse();
        assertThat(repository.language()).isEqualTo("ts");
        assertThat(repository.key()).isEqualTo("creedengo-typescript");
    }

}
