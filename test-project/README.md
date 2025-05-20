A sample project to test SonarQube and ESLint plugins of **creedengo-javascript**.

👉 See [creedengo-javascript README](../README.md) to have more information.

## Purpose of this project

This project allows to test the rules edited by the ecoCode project for the JavaScript language.\
The files in this repository contain both compliant and non-compliant code.

### 1. Setup local environment

First, follow [this complete guide](https://github.com/green-code-initiative/creedengo-common/blob/main/doc/HOWTO.md#installing-local-environment-local-sonarqube) to install your local SonarQube development environment. \
Then, check that _creedengo_ rules are enabled in the quality profile that will be used during the analysis.

You will also need some JavaScript tools installed on your computer:

- A supported version of Node.js
- Yarn (install it globally with `npm install -g yarn`)

### 2. Send Sonar metrics to local SonarQube

Use the following Shell script which will do the job for you:

```sh
./tool_send_to_sonar.sh MY_SONAR_TOKEN
```

Or you can manually run these commands:

- Install dependencies: `yarn install`
- Start Sonar Scanner: `yarn sonar -Dsonar.host.url=http://127.0.0.1:9000 -Dsonar.token=MY_SONAR_TOKEN`

### 3. Check errors

On your SonarQube instance, check if each JavaScript file contains the rule error defined for this class (you can search for tag `eco-design` rule on a special file).
