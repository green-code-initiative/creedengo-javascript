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

const rule = require("../../../lib/rules/prefer-on-push-component-change-detection");
const { RuleTester } = require("eslint");
const { describe, it } = require("node:test");
const typeScriptParser = require("@typescript-eslint/parser");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typeScriptParser,
    ecmaVersion: 2021,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const preferOnPushError = {
  messageId: "preferOnPushComponentChangeDetection",
};

const tests = {
  valid: [
    // Component with OnPush change detection strategy
    `import { Component, ChangeDetectionStrategy } from '@angular/core';
    
    @Component({
      selector: 'app-test',
      template: '<div>Test</div>',
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class TestComponent {}`,

    // Component with OnPush and other properties
    `import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
    
    @Component({
      selector: 'app-test',
      template: '<div>Test</div>',
      styleUrls: ['./test.component.css'],
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class TestComponent {
      @Input() data: string;
    }`,

    // Non-Angular class (should not report error)
    `class RegularClass {}`,

    // Decorator with different name (should not report error)
    `@OtherDecorator()
    export class TestComponent {}`,
  ],
  invalid: [
    // Component without changeDetection property
    {
      code: `import { Component } from '@angular/core';
      
      @Component({
        selector: 'app-test',
        template: '<div>Test</div>'
      })
      export class TestComponent {}`,
      errors: [preferOnPushError],
    },

    // Component with empty decorator
    {
      code: `import { Component } from '@angular/core';
      
      @Component()
      export class TestComponent {}`,
      errors: [preferOnPushError],
    },

    // Component with changeDetection set to undefined
    {
      code: `import { Component } from '@angular/core';
      
      @Component({
        selector: 'app-test',
        template: '<div>Test</div>',
        changeDetection: undefined
      })
      export class TestComponent {}`,
      errors: [preferOnPushError],
    },

    // Component with changeDetection set to Default
    {
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
      
      @Component({
        selector: 'app-test',
        template: '<div>Test</div>',
        changeDetection: ChangeDetectionStrategy.Default
      })
      export class TestComponent {}`,
      errors: [preferOnPushError],
    },

    // Component with wrong property on ChangeDetectionStrategy
    {
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
      
      @Component({
        selector: 'app-test',
        template: '<div>Test</div>',
        changeDetection: ChangeDetectionStrategy.CheckOnce
      })
      export class TestComponent {}`,
      errors: [preferOnPushError],
    },
  ],
};

describe("prefer-on-push-component-change-detection", () => {
  it("should enforce OnPush change detection strategy", () => {
    ruleTester.run("prefer-on-push-component-change-detection", rule, tests);
  });
});
