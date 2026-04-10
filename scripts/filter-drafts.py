#!/usr/bin/env python3
"""
Remove files with `draft: true` in frontmatter from the content directory.
Run this before syncing to the public repo so drafts are never published there.
"""
import os
import re
import sys

CONTENT_DIR = "content"
SKIP_DIRS = {"templates"}

DRAFT_PATTERN = re.compile(r"^draft:\s*true\s*$", re.MULTILINE)
FRONTMATTER_PATTERN = re.compile(r"^---\s*\n(.*?)\n---", re.DOTALL)

removed = []

for root, dirs, files in os.walk(CONTENT_DIR):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for filename in files:
        if not filename.endswith(".md"):
            continue
        filepath = os.path.join(root, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()
        except (OSError, UnicodeDecodeError) as e:
            print(f"Warning: could not read {filepath}: {e}", file=sys.stderr)
            continue

        match = FRONTMATTER_PATTERN.match(text)
        if match and DRAFT_PATTERN.search(match.group(1)):
            os.remove(filepath)
            removed.append(filepath)
            print(f"Removed draft: {filepath}")

print(f"\n{len(removed)} draft file(s) removed.")
