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

const rule = require("../../../lib/rules/prefer-collections-with-pagination");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const expectedArrayError = {
  messageId: "PreferReturnCollectionsWithPagination",
  type: "TSArrayType",
};
const expectedReferenceError = {
  messageId: "PreferReturnCollectionsWithPagination",
  type: "TSTypeReference",
};

ruleTester.run("prefer-collections-with-pagination", rule, {
  valid: [
    `
    @Controller()
    public class Test {
        @Get()
        public find(): Page {}
    }
    `,
    `
    @Controller()
    public class Test {
        @Get()
        public find(): Promise<Pagination> {}
    }
    `,
    `
    @Controller()
    public class Test {
        @Get()
        public find() {}
    }
    `,
    `
    @Controller()
    public class Test {
        @Get(':id')
        public findOne(): Promise<string> {}
    }
    `,
    `
    @Controller()
    public class Test {
        @Get()
        public find(): Promise<{items: string[], currentPage: number, totalPages: number}> {}
    }
    `,
  ],
  invalid: [
    {
      code: `
    @Controller()
    public class Test {
        @Get()
        public find(): Promise<string[]> {}
    }
    `,
      errors: [expectedReferenceError],
    },
    {
      code: `
    @Controller()
    public class Test {
        @Get()
        public find(): Promise<ClassicList> {}
    }
    `,
      errors: [expectedReferenceError],
    },
    {
      code: `
    @Controller()
    public class Test {
        @Get()
        public find(): string[] {}
    }
    `,
      errors: [expectedArrayError],
    },
    {
      code: `
    @Controller()
    public class Test {
        @Get()
        public find(): Promise<{items: string[]}> {}
    }
    `,
      errors: [expectedReferenceError],
    },
  ],
});
