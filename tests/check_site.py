#!/usr/bin/env python3
"""
CampusCareer static site checks (runs in CI before the Docker build).

Checks:
  1. All 5 required pages exist.
  2. Every page has <!DOCTYPE html>, a <title> and <html lang="...">.
  3. Every local link/script/stylesheet (href="..." / src="...") points to a file that exists.

Exit code 0 = all passed, 1 = something failed.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REQUIRED_PAGES = ["index.html", "opportunities.html", "dashboard.html", "resources.html", "about.html"]
LINK_RE = re.compile(r'(?:href|src)="([^"]+)"')

errors = []

# 1. Required pages exist
for page in REQUIRED_PAGES:
    if not (ROOT / page).is_file():
        errors.append(f"Missing required page: {page}")

# 2 + 3. Structure and local links
for page in sorted(ROOT.glob("*.html")):
    html = page.read_text(encoding="utf-8")
    lower = html.lower()

    if not lower.lstrip().startswith("<!doctype html>"):
        errors.append(f"{page.name}: missing <!DOCTYPE html>")
    if "<title>" not in lower:
        errors.append(f"{page.name}: missing <title>")
    if not re.search(r"<html[^>]*\blang=", lower):
        errors.append(f"{page.name}: <html> tag has no lang attribute")

    for link in LINK_RE.findall(html):
        if link.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:", "data:")):
            continue
        target = link.split("#")[0].split("?")[0]
        if target and not (ROOT / target).exists():
            errors.append(f"{page.name}: broken local link -> {link}")

if errors:
    print("FAILED:")
    for e in errors:
        print("  -", e)
    sys.exit(1)

print(f"OK: {len(list(ROOT.glob('*.html')))} pages checked, all structure and local links valid.")
