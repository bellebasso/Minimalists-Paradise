#!/usr/bin/env python3

from pathlib import Path
import re
import shutil

# Change this to your target directory
ROOT_DIR = Path("src")

# File extensions to process
EXTENSIONS = {".css", ".scss", ".sass"}

# Matches "!important" with optional surrounding whitespace
IMPORTANT_PATTERN = re.compile(r"\s*!important\b", re.IGNORECASE)

total_files = 0
total_replacements = 0

for file in ROOT_DIR.rglob("*"):
    if file.suffix.lower() not in EXTENSIONS:
        continue

    content = file.read_text(encoding="utf-8")

    new_content, replacements = IMPORTANT_PATTERN.subn("", content)

    if replacements > 0:
        backup = file.with_suffix(file.suffix + ".bak")
        shutil.copy2(file, backup)

        file.write_text(new_content, encoding="utf-8")

        total_files += 1
        total_replacements += replacements

        print(f"✓ {file} ({replacements} replacements)")

print()
print(f"Modified files: {total_files}")
print(f"Total !important removed: {total_replacements}")
