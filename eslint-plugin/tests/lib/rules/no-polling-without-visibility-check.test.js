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

const rule = require("../../../lib/rules/no-polling-without-visibility-check");
const { RuleTester } = require("eslint");
const { describe, it } = require("node:test");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

const expectedError = {
  messageId: "AvoidPollingWithoutVisibilityCheck",
};

const tests = {
  valid: [
    // setInterval with visibilitychange listener
    `
    let intervalId;

    function startPolling() {
      intervalId = setInterval(() => fetchData(), 5000);
    }

    function stopPolling() {
      clearInterval(intervalId);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        startPolling();
      } else {
        stopPolling();
      }
    });

    startPolling();
    `,

    // Recursive setTimeout with visibilitychange listener
    `
    let timeoutId;

    function poll() {
      fetchData();
      timeoutId = setTimeout(poll, 5000);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        poll();
      } else {
        clearTimeout(timeoutId);
      }
    });

    poll();
    `,

    // setTimeout that is NOT recursive — should not be flagged
    `
    setTimeout(() => doSomethingOnce(), 1000);
    `,

    // No polling at all
    `
    function fetchOnce() {
      fetch('/api/data').then(r => r.json()).then(console.log);
    }
    fetchOnce();
    `,
  ],

  invalid: [
    // setInterval without visibilitychange listener
    {
      code: `
      setInterval(() => fetchData(), 5000);
      `,
      errors: [expectedError],
    },

    // Recursive setTimeout without visibilitychange listener
    {
      code: `
      function poll() {
        fetchData();
        setTimeout(poll, 5000);
      }
      poll();
      `,
      errors: [expectedError],
    },

    // Multiple setInterval calls — each should be reported
    {
      code: `
      setInterval(() => syncData(), 3000);
      setInterval(() => refreshUI(), 10000);
      `,
      errors: [expectedError, expectedError],
    },
  ],
};

describe("no-polling-without-visibility-check", () => {
  it("no-polling-without-visibility-check", () => {
    ruleTester.run("no-polling-without-visibility-check", rule, tests);
  });
});
