#!/usr/bin/env sh

# "sonar.token" variable : private TOKEN generated in your local SonarQube during installation
# (input paramater of this script)

# building phase
yarn install

# sending to Sonar phase
yarn sonar -Dsonar.host.url=http://127.0.0.1:9000 -Dsonar.token=$1
