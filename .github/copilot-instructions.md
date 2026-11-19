# Copilot code review instructions

When reviewing changes in this repository, use `CONTRIBUTING.md` as the project's contribution checklist. Review only the changed code and directly affected behavior. Report actionable defects or clear omissions; do not report style preferences, speculative risks, or unrelated pre-existing issues.

## Review findings

- Prioritize correctness, regressions, false positives, and missing required project integration.
- For each finding, identify the affected file and lines, explain the concrete impact, and suggest a focused correction.
- Do not treat an item below as a finding when it does not apply to the change.
- Do not require changes outside the scope of the contribution being reviewed.

## Project-specific checks

- A new rule should have been discussed, measured, and documented in the Creedengo referential before implementation.
- For an ESLint rule, check that its implementation, rule documentation, and `RuleTester` tests are present and follow existing rule patterns. Source files should include the project's license header. Tests should cover valid and invalid cases sufficiently to guard against false positives.
- For a SonarQube rule integration, check that its Java check declares the SonarQube and ESLint keys, is registered in `CheckList.getAllHooks()` in alphabetical order, and its SonarQube key is added to the appropriate profile JSON.
- For a rule addition, check for a non-compliant example in `test-project` and updated generated rule documentation. Generated documentation should be updated with `yarn run update:eslint-docs`; do not ask contributors to hand-edit generated sections.
- For code changes, assess whether appropriate tests were added or updated. The guide asks contributors to keep code coverage greater than 80%; raise this only when relevant coverage is demonstrably below that target.
- Check that `CHANGELOG.md` is updated when the contribution introduces a user-facing change.
- Do not require SonarQube plugin tests for a new check class: the guide says it is tested automatically.

## Expected review output

Report only findings that meet the criteria above. If there are no actionable findings, say so plainly. Do not present a summary or checklist as a defect report.
