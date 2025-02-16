/*
 * creedengo JavaScript plugin - Provides rules to reduce the environmental footprint of your JavaScript programs
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

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/avoid-brightness-override");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});
const expectedError = {
  messageId: "ShouldAvoidOverrideBrightness",
  type: "MemberExpression",
};

ruleTester.run("avoid-brightness-override", rule, {
  valid: [
    `
        import * as lodash from 'lodash';
        lodash.isEmpty('');
    `,
    `
    import { ScreenBrightness } from '@capacitor-community/screen-brightness';

    // Get the current brightness:
    const {brightness: currentBrightness} = ScreenBrightness.getBrightness();
    `,
    `
    import DeviceBrightness from 'react-native-device-brightness';

    DeviceBrightness.getBrightnessLevel()
    .then(function (luminous) {
        // Get current brightness level
        // 0 ~ 1
        console.log(luminous);
    });
    `,
    `
        import * as Brightness from 'expo-brightness';

        Brightness.requestPermissionsAsync();
    `,
    `
        import ScreenBrightness from 'react-native-screen-brightness';

        ScreenBrightness.getBrightness().then(brightness => {
        console.log('brightness', brightness);
        });
    `,
  ],

  invalid: [
    {
      code: `
            import { ScreenBrightness } from '@capacitor-community/screen-brightness';

            // Set the brightness:
            const brightness = 0.5;
            ScreenBrightness.setBrightness({ brightness });
        `,
      errors: [expectedError],
    },
    {
      code: `
            import DeviceBrightness from 'react-native-device-brightness';

            DeviceBrightness.setBrightnessLevel(0.5);
        `,
      errors: [expectedError],
    },
    {
      code: `
            import ScreenBrightness from 'react-native-screen-brightness';

            ScreenBrightness.setBrightness(0.5);
        `,
      errors: [expectedError],
    },
    {
      code: `
                import React, { useEffect } from 'react';
                import { StyleSheet, View, Text } from 'react-native';
                import * as Brightness from 'expo-brightness';

                export default function App() {
                useEffect(() => {
                    (async () => {
                    const { status } = await Brightness.requestPermissionsAsync();
                    if (status === 'granted') {
                        Brightness.setSystemBrightnessAsync(1);
                    }
                    })();
                }, []);

                return (
                    <View style={styles.container}>
                    <Text>Brightness Module Example</Text>
                    </View>
                );
                }
        `,
      errors: [expectedError],
    },
  ],
});
