#!/usr/bin/env bash
#
# Verifies that the creedengo plugin integration is working correctly
# in a running Docker SonarQube instance.
#

set -euo pipefail

SONAR_URL="http://localhost:9000"
SONAR_AUTH="admin:admin"

echo "Verifying plugin is installed..."
curl -sf -u "${SONAR_AUTH}" "${SONAR_URL}/api/plugins/installed" > /tmp/plugins.json
jq -e '.plugins[] | select(.key == "creedengojavascript")' /tmp/plugins.json > /dev/null

echo "Verifying rules are loaded..."
curl -sf -u "${SONAR_AUTH}" "${SONAR_URL}/api/rules/search?repositories=creedengo-javascript,creedengo-typescript&ps=1" > /tmp/rules.json
[ "$(jq '.total' /tmp/rules.json)" -gt 0 ]

echo "SonarQube plugin and rules check passed."
