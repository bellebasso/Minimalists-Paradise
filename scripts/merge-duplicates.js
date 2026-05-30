const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const combineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');

const ROOT = path.join(__dirname, '..');
const IGNORE = new Set([
  'node_modules',
  '.git',
  '.obsidian',
  'reports',
  'dist',
]);

async function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith('.css')) continue;

    await processCssFile(fullPath);
  }
}

async function processCssFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');

  const result = await postcss([
    combineDuplicatedSelectors({
      removeDuplicatedProperties: false,
    }),
  ]).process(original, {
    from: filePath,
    to: filePath,
  });

  const output = result.css;

  if (output !== original) {
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Updated ${path.relative(ROOT, filePath)}`);
  }
}

async function main() {
  await walk(ROOT);
  console.log('Duplicate selector merge complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
