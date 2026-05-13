const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Replace this with your actual theme URL
const REVIEW_URL =
  'https://community.obsidian.md/account/themes/minimalists-paradise';

const OUTPUT_PATH = path.join(__dirname, '..', 'reports', 'community-review.md');

async function main() {
  console.log(`Fetching review from: ${REVIEW_URL}`);

  const response = await axios.get(REVIEW_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const lines = [];

  lines.push('# Obsidian Community Review');
  lines.push('');
  lines.push(`Source: ${REVIEW_URL}`);
  lines.push('');

  // Temporary first version:
  // save the page title to confirm scraping works.
  const pageTitle = $('title').text().trim();

  lines.push(`Page title: ${pageTitle}`);
  lines.push('');
  lines.push('Scraper is working successfully.');

  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'));

  console.log(`Report written to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
