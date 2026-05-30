const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const OUTPUT_FILE = path.join(__dirname, '..', 'theme.css');

function bundle(entryFile) {
  const content = fs.readFileSync(entryFile, 'utf8');
  
  // Simple regex to find @import statements
  // This matches @import "./path/to/file.css";
  const importRegex = /@import\s+["'](.+?)["'];/g;
  
  let bundledContent = content.replace(importRegex, (match, importPath) => {
    const fullPath = path.resolve(path.dirname(entryFile), importPath);
    if (fs.existsSync(fullPath)) {
      console.log(`Inlining ${importPath}`);
      return `/* START IMPORT: ${importPath} */\n` + bundle(fullPath) + `\n/* END IMPORT: ${importPath} */`;
    } else {
      console.warn(`Warning: Could not find import ${importPath}`);
      return match;
    }
  });
  
  return bundledContent;
}

console.log('Bundling theme...');
const result = bundle(path.join(SRC_DIR, 'index.css'));
fs.writeFileSync(OUTPUT_FILE, result, 'utf8');
console.log('Bundle complete: theme.css');
