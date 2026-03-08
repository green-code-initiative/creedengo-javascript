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

const rule = require("../../../lib/rules/avoid-keep-awake");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const expectedErrorHook = {
  messageId: "AvoidKeepAwake",
  type: "CallExpression",
};

const expectedErrorFunction = {
  messageId: "AvoidKeepAwake",
  type: "CallExpression",
};

ruleTester.run("avoid-keep-awake", rule, {
  valid: [
    {
      code: `
      import React from 'react';
      import { Text, View } from 'react-native';
      
      export default function ValidExample() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This screen will sleep!</Text>
          </View>
        );
      }
     `,
    },
    {
      code: `
      import React from 'react';
      import { useKeepAwake } from 'other-library';
      import { Button, View } from 'react-native';
      
      export default class ValidExample extends React.Component {
        render() {
          useKeepAwake();
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            </View>
          );
        }
      }      
     `,
    },
  ],
  invalid: [
    {
      code: `
      import { useKeepAwake } from 'expo-keep-awake';
      import React from 'react';
      import { Text, View } from 'react-native';
      
      export default function KeepAwakeExample() {
        useKeepAwake();
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This screen will never sleep!</Text>
          </View>
        );
      }
     `,
      errors: [expectedErrorHook],
    },
    {
      code: `
      import { activateKeepAwake } from 'expo-keep-awake';
      import React from 'react';
      import { Button, View } from 'react-native';

      export default class KeepAwakeExample extends React.Component {
        render() {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button onPress={this._activate} title="Activate" />
            </View>
          );
        }

        _activate = () => {
          activateKeepAwake();
          alert('Activated!');
        };
      }`,
      errors: [expectedErrorFunction],
    },
  ],
});
