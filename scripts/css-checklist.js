const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const OUTPUT_PATH = path.join(REPORTS_DIR, 'css-cleanup-checklist.md');

const IGNORE = new Set([
  'node_modules',
  '.git',
  '.obsidian',
  'reports',
]);

const results = {
  important: [],
  has: [],
  duplicateSelectors: [],
};

// Tracks selectors we've already seen to detect duplicates.
const seenSelectors = new Map();

/**
 * Recursively walk all CSS files in the repository.
 */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith('.css')) continue;

    scanCssFile(fullPath);
  }
}

/**
 * Scan a single CSS file.
 */
function scanCssFile(fullPath) {
  const relativePath = path.relative(ROOT, fullPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // 1. Scan line-based issues.
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    if (trimmed.includes('!important')) {
      results.important.push({
        file: relativePath,
        line: lineNumber,
        text: trimmed,
      });
    }

    if (trimmed.includes(':has(')) {
      results.has.push({
        file: relativePath,
        line: lineNumber,
        text: trimmed,
      });
    }
  });

  // 2. Detect duplicate selectors using a simple regex.
  //
  // This matches blocks like:
  // .my-selector,
  // .other-selector {
  //
  // It is not a full CSS parser, but works well for most theme stylesheets.
  const blockRegex = /([^{}]+)\{/g;
  let match;

  while ((match = blockRegex.exec(content)) !== null) {
    const selectorText = match[1].trim();

    // Estimate the line number by counting newlines before the match.
    const lineNumber =
      content.slice(0, match.index).split('\n').length;

    // Normalize whitespace so equivalent selectors compare reliably.
    const normalized = selectorText.replace(/\s+/g, ' ').trim();

    // Ignore likely at-rules.
    if (
      normalized.startsWith('@') ||
      normalized.length === 0
    ) {
      continue;
    }

    if (seenSelectors.has(normalized)) {
      const first = seenSelectors.get(normalized);

      results.duplicateSelectors.push({
        selector: normalized,
        firstFile: first.file,
        firstLine: first.line,
        file: relativePath,
        line: lineNumber,
      });
    } else {
      seenSelectors.set(normalized, {
        file: relativePath,
        line: lineNumber,
      });
    }
  }
}

/**
 * Group issues by file for cleaner Markdown output.
 */
function groupByFile(items) {
  const grouped = new Map();

  for (const item of items) {
    if (!grouped.has(item.file)) {
      grouped.set(item.file, []);
    }

    grouped.get(item.file).push(item);
  }

  return grouped;
}

/**
 * Render grouped line-based issues.
 */
function renderLineBasedSection(lines, title, items) {
  lines.push(`## ${title}`);
  lines.push('');
  lines.push(`Total occurrences: **${items.length}**`);
  lines.push('');

  if (items.length === 0) {
    lines.push('No occurrences found.');
    lines.push('');
    return;
  }

  const grouped = groupByFile(items);

  for (const [file, fileItems] of grouped) {
    lines.push(`### ${file}`);
    lines.push('');

    for (const item of fileItems) {
      lines.push(
        `- [ ] Line ${item.line} — \`${item.text.replace(/`/g, '\\`')}\``
      );
    }

    lines.push('');
  }
}

/**
 * Render duplicate selector section.
 */
function renderDuplicateSelectors(lines) {
  lines.push('## Duplicate Selectors');
  lines.push('');
  lines.push(
    `Total duplicate occurrences: **${results.duplicateSelectors.length}**`
  );
  lines.push('');

  if (results.duplicateSelectors.length === 0) {
    lines.push('No duplicate selectors found.');
    lines.push('');
    return;
  }

  for (const item of results.duplicateSelectors) {
    lines.push(
      `- [ ] \`${item.selector.replace(/`/g, '\\`')}\``
    );
    lines.push(
      `  - First defined in \`${item.firstFile}:${item.firstLine}\``
    );
    lines.push(
      `  - Duplicate found in \`${item.file}:${item.line}\``
    );
    lines.push('');
  }
}

/**
 * Build the final Markdown report.
 */
function generateMarkdown() {
  const lines = [];

  lines.push('# CSS Cleanup Checklist');
  lines.push('');
  lines.push(
    'Automatically generated checklist for common issues flagged by the Obsidian Community review.'
  );
  lines.push('');

  const total =
    results.important.length +
    results.has.length +
    results.duplicateSelectors.length;

  lines.push(`Total issues found: **${total}**`);
  lines.push('');

  renderLineBasedSection(
    lines,
    'Avoid !important',
    results.important
  );

  renderLineBasedSection(
    lines,
    'Avoid :has',
    results.has
  );

  renderDuplicateSelectors(lines);

  return lines.join('\n');
}

/**
 * Main entry point.
 */
function main() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  walk(ROOT);

  const markdown = generateMarkdown();

  fs.writeFileSync(OUTPUT_PATH, markdown, 'utf8');

  console.log('CSS cleanup checklist generated successfully.');
  console.log(`Output: ${OUTPUT_PATH}`);
  console.log(
    `!important: ${results.important.length}, :has: ${results.has.length}, duplicate selectors: ${results.duplicateSelectors.length}`
  );
}

main();
