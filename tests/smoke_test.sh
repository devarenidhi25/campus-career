#!/usr/bin/env bash
# Smoke test for the running CampusCareer container.
# Usage: bash tests/smoke_test.sh [base_url]   (default: http://localhost:8080)
set -u

BASE_URL="${1:-http://localhost:8080}"
FAILED=0

check_page () {
  local path="$1"
  local code
  code=$(curl -s -o /tmp/page.html -w "%{http_code}" "$BASE_URL/$path")
  if [ "$code" = "200" ] && grep -qi "CampusCareer" /tmp/page.html; then
    echo "PASS  /$path  ($code)"
  else
    echo "FAIL  /$path  (HTTP $code)"
    FAILED=1
  fi
}

check_not_exposed () {
  local path="$1"
  local marker="$2"
  if curl -s "$BASE_URL/$path" | grep -q "$marker"; then
    echo "FAIL  /$path is publicly served (should not be in the image)"
    FAILED=1
  else
    echo "PASS  /$path not exposed"
  fi
}

echo "Smoke testing $BASE_URL"

# Every page loads and contains the site name
for page in "" index.html opportunities.html dashboard.html resources.html about.html; do
  check_page "$page"
done

# Static assets are served
for asset in css/style.css js/main.js; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$asset")
  if [ "$code" = "200" ]; then echo "PASS  /$asset  ($code)"; else echo "FAIL  /$asset  (HTTP $code)"; FAILED=1; fi
done

# Infrastructure files must NOT be inside the website
check_not_exposed "terraform/main.tf" 'provider "aws"'
check_not_exposed "ansible/deploy.yml" "ansible.builtin"
check_not_exposed "Dockerfile" "FROM nginx"

if [ "$FAILED" -ne 0 ]; then
  echo "Smoke test FAILED"
  exit 1
fi
echo "All smoke tests passed"
