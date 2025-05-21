## Hello! We are pleased to see you here 👋

Please read
common [CONTRIBUTING.md](https://github.com/green-code-initiative/creedengo-common/blob/main/doc/CONTRIBUTING.md)
in `creedengo-common` repository first.\
Also check the [starter pack](https://github.com/green-code-initiative/creedengo-common/blob/main/doc/starter-pack.md) to
have the basic information before starting.

## Structure

The JavaScript plugin is divided into 3 modules:

- `eslint-plugin` contains the ESLint plugin part
- `sonar-plugin` contains the SonarQube plugin implementation
- `test-project` contains a project to test the rules on SonarQube

The ESLint plugin **can be standalone** and is packed inside SonarQube plugin during the build phase.

## Requirements

### For the SonarQube plugin

- Java JDK 11+
- Maven 3.8 or later

SonarQube provides a documentation to
learn [plugin basics](https://docs.sonarqube.org/latest/extension-guide/developing-a-plugin/plugin-basics/).

### For the ESLint plugin

- Node.js 18.x or newer
- Yarn ([installation guide](https://yarnpkg.com/getting-started/install))
- ESLint plugin maintenance skills
- ESLint custom rule creation skills

The ESLint documentation is very detailed and provides a useful starting point.\
Check more here: https://eslint.org/docs/latest/extend/custom-rules

It is possible to write and test the rules directly in this project which provides unit tests.\
But it can be useful to prepare a test project to check the correct execution of the rules.

## Installation

1. Clone the Git repository
1. Inside **eslint-plugin** directory, run `yarn install` 
1. Inside **sonar-plugin** directory, synchronize dependencies using Maven with `mvn clean install -DskipTests`
1. Inside root directory, initialize docker with `docker compose up --build -d`
1. You are good to go! 🚀

## Create a rule

### Before starting

Before even starting to implement the rule, it must have been discussed, mesured and documented in the Creedengo
referential. Please follow
the [dedicated documentation](https://github.com/green-code-initiative/creedengo-rules-specifications/blob/main/README.md#creedengo-rules-specification-repository)
to find out how to proceed.

### In the ESLint plugin

The file structure inside **eslint-plugin** package provides an ESLint-compliant project.\
So, the rule creation follows the recommended standards.

> It may be useful to take a look at rules already written to use the same structure and conventions.\
> Also please provide license header inside files with source code (there is an example inside file `lib/rule-list.js`).

Example set of files to add a rule called **"my-awesome-rule"**:

- `lib/rules/my-awesome-rule.js`: main file with the rule metadata and algorithm
- `docs/rules/my-awesome-rule.md`: documentation file written in [Markdown](https://www.markdownguide.org/cheat-sheet/)
  to explain the rule
- `tests/lib/rules/my-awesome-rule.js`: testing file written
  using [ESLint RuleTester](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester)

The project itself uses ESLint to helps linting rule algorithms.

### In the SonarQube plugin

Now that the rule has been implemented in the Creedengo referential and its implementation written in the ESLint plugin,
all that remains is to reference it in the SonarQube plugin. Here are the simple steps:

1. Create a Java class in `src/main/java/fr/greencodeinitiative/creedengo/javascript/checks/` with
   the declaration of the SonarQube key and the ESLint key (check other classes to have an example)
2. Reference created in method `getAllChecks()` of Java class `CheckList` (please use alphabetical order)
3. Add the SonarQube key of the rule in the appropriate profile Json file.

### Test the rule

Rule tests also follow the ESLint standards and
use [ESLint RuleTester](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester).\
They are executed with the [mocha](https://mochajs.org/) test framework.

Please add as many valid and invalid uses cases as necessary for a each rule.\
This will allow a large code coverage and avoid false positives.

Run the following script to start all test suites: `yarn run test`.\
To display tests coverage, use `yarn run test:cov`.

> ℹ You don't need to add a test in the Sonar plugin, the class will be tested automatically.

### Add an integration test

It is also necessary to add an example of non-compliant code to the test project in the
repository. This allows to check that the plgin works correctly with a real
SonarQube instance. A README is present in `test-project` directory to help running a local analysis.

### Generate rule documentation

A tool called [eslint-doc-generator](https://github.com/bmish/eslint-doc-generator) is used in the project to update
documentation of rules.\
It allows to update rule doc file and main README based on metadata of rules.

Two npm scripts are available:

- `yarn run update:eslint-docs` to update Markdown files with data of rules
- `yarn run lint:eslint-docs` to verify auto-updated data of rules in Markdown files

All the generated code is between commented lines with "auto-generated" in the text.\
**Please run update script** after a rule creation.

## What else?

You should be ready to open a PR on GitHub with all your code!

Check one last time that you have respected the following points:

- [ ] My rule implementation covers the use case without false-positive
- [ ] My code is explicit or well documented
- [ ] I have provided unit tests
- [ ] I have added a non-compliant example code inside the test project
- [ ] The coverage of my code is greather than 80%
- [ ] I have modified the CHANGELOG with my change

This is the end of this guide, thank you for reading this far and contributing to the project 🙏.
