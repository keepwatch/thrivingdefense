#!/usr/bin/env python3
"""
Remove private content before syncing to the public repo:
  - Files with `draft: true` in frontmatter
  - content/templates/ directory
  - CLAUDE.md
"""
import os
import re
import shutil
import sys

CONTENT_DIR = "content"
PRIVATE_FILES = ["CLAUDE.md"]
PRIVATE_DIRS = [os.path.join(CONTENT_DIR, "templates"), ".claude"]

DRAFT_PATTERN = re.compile(r"^draft:\s*true\s*$", re.MULTILINE)
FRONTMATTER_PATTERN = re.compile(r"^---\s*\n(.*?)\n---", re.DOTALL)

removed = []

# Remove private top-level files
for filepath in PRIVATE_FILES:
    if os.path.exists(filepath):
        os.remove(filepath)
        removed.append(filepath)
        print(f"Removed private file: {filepath}")

# Remove private directories
for dirpath in PRIVATE_DIRS:
    if os.path.exists(dirpath):
        shutil.rmtree(dirpath)
        removed.append(dirpath)
        print(f"Removed private directory: {dirpath}")

# Remove draft content files
for root, dirs, files in os.walk(CONTENT_DIR):
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

print(f"\n{len(removed)} item(s) removed.")
