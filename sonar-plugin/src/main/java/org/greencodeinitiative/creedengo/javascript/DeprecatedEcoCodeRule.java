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

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.List;

import org.sonar.api.server.rule.RulesDefinition.NewRepository;
import org.sonar.check.Rule;

/**
 * Used to handle old ecoCode rule keys.
 */
public class DeprecatedEcoCodeRule {

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ ElementType.TYPE })
    public @interface Key {
        String value();
    }

    public static void addOnRepository(NewRepository repository, String oldRepositoryKey, List<Class<?>> checks) {
        checks.forEach(check -> {
            if (check.isAnnotationPresent(Key.class)) {
                Rule rule = check.getAnnotation(Rule.class);
                Key ecoCodeRuleKey = check.getAnnotation(Key.class);
                repository.rule(rule.key()).addDeprecatedRuleKey(oldRepositoryKey, ecoCodeRuleKey.value());
            }
        });
    }

}
