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

const rule = require("../../../lib/rules/avoid-high-accuracy-geolocation");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});
const expectedErrorOnProperty = {
  messageId: "AvoidUsingAccurateGeolocation",
  type: "Property",
};
const expectedErrorOnMemberExpression = {
  messageId: "AvoidUsingAccurateGeolocation",
  type: "MemberExpression",
};

ruleTester.run("avoid-high-accuracy-geolocation", rule, {
  valid: [
    `
    var opts = {enableHighAccuracy: false, timeout: 5000, maximumAge: 0};

    function success(pos) {
      console.log(pos.coords);
    }

    function error(err) {
      console.warn(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, opts);
    `,
    `
    function success(pos) {
      console.log(pos.coords);
    }

    navigator.geolocation.getCurrentPosition(success);
    `,
    `
    navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: false});
    `,

    `
    import axios from 'axios';
    `,
    `
    import * as Location from 'expo-location';
    
    Location.requestPermissionsAsync();
    `,
  ],

  invalid: [
    {
      code: `
        var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};

        function success(pos) {
          console.log(pos.coords);
        }

        function error(err) {
          console.warn(err);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
     `,
      errors: [expectedErrorOnProperty],
    },
    {
      code: `
      navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});
     `,
      errors: [expectedErrorOnProperty],
    },
    {
      code: `
      import * as Location from 'expo-location';
      
      Location.enableNetworkProviderAsync();
     `,
      errors: [expectedErrorOnMemberExpression],
    },
  ],
});
