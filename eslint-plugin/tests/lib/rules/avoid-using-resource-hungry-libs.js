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

const rule = require("../../../lib/rules/avoid-using-resource-hungry-libs");
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
});

const momentError = {
  messageId: "noDeprecatedLib",
  data: {
    name: "moment",
    reason: "deprecated and heavy to load",
    alternatives: "date-fns, dayjs",
  },
  type: "Literal",
};

const iconsaxError = {
  messageId: "noDeprecatedLib",
  data: {
    name: "iconsax",
    reason: "does not support tree-shaking and adds large bundle size",
    alternatives: "@mui/icons-material, lucide-react",
  },
  type: "Literal",
};

ruleTester.run("no-deprecated-libs", rule, {
  valid: [
    // imports of non-deprecated libraries
    `import dayjs from "dayjs";`,
    `const { format } = require("date-fns");`,
    `const moment = require("luxon");`,
    `import HomeIcon from "@mui/icons-material/Home";`,
    `import { ReactComponent as Icon } from "some-svg";`,
    `import("dayjs").then(d => console.log(d));`,
    // dynamic import of non-deprecated
    `import("lucide-react").then(l => console.log(l));`,
  ],
  invalid: [
    // -- moment cases --
    { code: `import moment from "moment";`, errors: [momentError] },
    { code: `import { duration } from "moment";`, errors: [momentError] },
    { code: `import "moment";`, errors: [momentError] },
    { code: `const moment = require("moment");`, errors: [momentError] },
    { code: `require("moment");`, errors: [momentError] },
    {
      code: `import("moment").then(m => console.log(m));`,
      errors: [momentError],
    },

    // -- iconsax cases --
    { code: `import iconsax from "iconsax";`, errors: [iconsaxError] },
    { code: `import { IconHome } from "iconsax";`, errors: [iconsaxError] },
    { code: `import "iconsax";`, errors: [iconsaxError] },
    { code: `const iconsax = require("iconsax");`, errors: [iconsaxError] },
    { code: `require("iconsax");`, errors: [iconsaxError] },
    {
      code: `import("iconsax").then(i => console.log(i));`,
      errors: [iconsaxError],
    },
  ],
});
