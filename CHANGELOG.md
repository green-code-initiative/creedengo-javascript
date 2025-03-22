# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   [#40](https://github.com/green-code-initiative/creedengo-javascript/pull/40) Add rule `@creedengo/avoid-autoplay` (GCI36)
-   [#45](https://github.com/green-code-initiative/creedengo-javascript/pull/45) Add rule `@creedengo/avoid-keep-awake` (GCI505)
-   [#46](https://github.com/green-code-initiative/creedengo-javascript/pull/46) Add rule `@creedengo/prefer-lighter-formats-for-image-files` (GCI31)
-   [#68](https://github.com/green-code-initiative/creedengo-javascript/pull/68) Add support for SonarQube up to 25.3

### Fixed

-   [#69](https://github.com/green-code-initiative/creedengo-javascript/pull/69) Only support string literals (GCI11)
-   [#70](https://github.com/green-code-initiative/creedengo-javascript/pull/70) Only support SQL queries within standard methods (GCI24)
-   [#71](https://github.com/green-code-initiative/creedengo-javascript/pull/71) Avoid triggering an exception (GCI12)

## [2.0.0] - 2025-01-22

### Added

-   [#39](https://github.com/green-code-initiative/creedengo-javascript/issues/39) Add rule `@creedengo/avoid-brightness-override` (GCI522)
-   [#41](https://github.com/green-code-initiative/creedengo-javascript/pull/41) Add rule `@creedengo/no-torch` (GCI530)
-   [#58](https://github.com/green-code-initiative/creedengo-javascript/pull/58) Add support for SonarQube up to 25.1

### Changed

-   [#56](https://github.com/green-code-initiative/creedengo-javascript/issues/56) **BREAKING:** Rename plugin to creedengo-javascript
-   [#44](https://github.com/green-code-initiative/creedengo-javascript/pull/44) Implement the rule GCI523 for React Native
-   [#52](https://github.com/green-code-initiative/creedengo-javascript/pull/52) Remove trailing dots in Sonar rules descriptions
-   [#62](https://github.com/green-code-initiative/creedengo-javascript/pull/62) Fix style attribute checks in GCI26 and GCI29
-   Update Docker Compose configuration file to V2

### Deleted

-   [#44](https://github.com/green-code-initiative/creedengo-javascript/pull/44) Merge the rule EC8 with GCI523

## [1.5.0] - 2024-03-13

### Added

-   Add support for SonarQube up to 10.4
-   [#30](https://github.com/green-code-initiative/ecoCode-javascript/issues/30) EC24: define the WHERE clause as a limiting keyword
-   [#32](https://github.com/green-code-initiative/ecoCode-javascript/pull/32) Add support for SonarQube 10.4 "DownloadOnlyWhenRequired" feature
-   [ecoCode#185](https://github.com/green-code-initiative/ecoCode/issues/185) Add build number to manifest

### Changed

-   [#30](https://github.com/green-code-initiative/ecoCode-javascript/issues/30) Improve documentation and clean code taxonomy of all rules

### Fixed

-   [#30](https://github.com/green-code-initiative/ecoCode-javascript/issues/30) Fix typo in EC12 rule

## [1.4.0] - 2023-10-30

### Added

-   [#14](https://github.com/green-code-initiative/ecoCode-javascript/pull/14) Create SonarQube plugin
-   [#21](https://github.com/green-code-initiative/ecoCode-javascript/pull/21) Add rule `@ecocode/avoid-css-animations` (EC29)
-   [#18](https://github.com/green-code-initiative/ecoCode-javascript/pull/18) Add rule `@ecocode/limit-db-query-results` (EC24)
-   [#19](https://github.com/green-code-initiative/ecoCode-javascript/pull/19) Add rule `@ecocode/no-empty-image-src-attribute` (EC25)
-   [#20](https://github.com/green-code-initiative/ecoCode-javascript/pull/20) Add rule `@ecocode/prefer-shorthand-css-notations` (EC26)
-   [#22](https://github.com/green-code-initiative/ecoCode-javascript/pull/22) Add rule `@ecocode/provide-print-css` (EC30)
-   [#25](https://github.com/green-code-initiative/ecoCode-javascript/pull/25) Add license headers
-   [ecoCode#207](https://github.com/green-code-initiative/ecoCode/issues/207) Add release tag analyzis on SonarCloud

### Changed

-   [#12](https://github.com/green-code-initiative/ecoCode-javascript/issues/12) Pack ESLint plugin into SonarQube plugin
-   [#16](https://github.com/green-code-initiative/ecoCode-javascript/pull/16) Use centralized rules specifications
-   Update release process through GitHub Actions
-   Backport all existing rules into SonarQube plugin

## [0.2.0] - 2023-05-29

### Added

-   Add support for TypeScript rules with **typescript-eslint**
-   Add rule `@ecocode/avoid-high-accuracy-geolocation`
-   Add rule `@ecocode/no-import-all-from-library`
-   Add rule `@ecocode/no-multiple-style-changes`
-   Add rule `@ecocode/prefer-collections-with-pagination`

## [0.1.0] - 2023-03-24

### Added

-   First alpha version of the ESLint plugin 🚀
-   Add rule `@ecocode/no-multiple-access-dom-element`
-   Create tooling script to generate SonarQube rules
-   Setup mocha and nyc for tests and coverage
-   Setup basic coding style tools
-   Write complete contributing guide

[Unreleased]: https://github.com/green-code-initiative/creedengo-javascript/compare/2.0.0...HEAD

[2.0.0]: https://github.com/green-code-initiative/creedengo-javascript/compare/1.5.0...2.0.0

[1.5.0]: https://github.com/green-code-initiative/ecoCode-javascript/compare/1.4.0...1.5.0

[1.4.0]: https://github.com/green-code-initiative/ecoCode-javascript/compare/eslint-plugin/0.2.0...1.4.0

[0.2.0]: https://github.com/green-code-initiative/ecoCode-linter/compare/eslint-plugin/0.1.0...eslint-plugin/0.2.0

[0.1.0]: https://github.com/green-code-initiative/ecoCode-linter/compare/6d305511db82bf8faa4833528641535e605dbacf...eslint-plugin/0.1.0
