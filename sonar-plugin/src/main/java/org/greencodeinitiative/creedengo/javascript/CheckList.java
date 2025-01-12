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

import org.greencodeinitiative.creedengo.javascript.checks.*;
import org.sonar.plugins.javascript.api.JavaScriptCheck;
import org.sonar.plugins.javascript.api.JavaScriptRule;
import org.sonar.plugins.javascript.api.TypeScriptRule;

import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CheckList {

    private CheckList() {
    }

    public static List<Class<? extends JavaScriptCheck>> getAllChecks() {
        return Arrays.asList(
                AvoidBrightnessOverride.class,
                AvoidCSSAnimations.class,
                AvoidHighAccuracyGeolocation.class,
                LimitDbQueryResult.class,
                NoEmptyImageSrcAttribute.class,
                NoImportAllFromLibrary.class,
                NoMultipleAccessDomElement.class,
                NoMultipleStyleChanges.class,
                NoTorch.class,
                PreferCollectionsWithPagination.class,
                PreferShorthandCSSNotations.class,
                ProvidePrintCSS.class
        );
    }

    public static List<Class<? extends JavaScriptCheck>> getTypeScriptChecks() {
        return filterChecksByAnnotation(TypeScriptRule.class);
    }

    public static List<Class<? extends JavaScriptCheck>> getJavaScriptChecks() {
        return filterChecksByAnnotation(JavaScriptRule.class);
    }

    private static List<Class<? extends JavaScriptCheck>> filterChecksByAnnotation(Class<? extends Annotation> annotation) {
        return getAllChecks().stream().filter(check -> check.isAnnotationPresent(annotation)).collect(Collectors.toList());
    }

}
