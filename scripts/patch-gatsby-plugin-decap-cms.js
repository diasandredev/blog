const fs = require('fs');
const path = require('path');

const fileToPatch = path.join(__dirname, '..', 'node_modules', 'gatsby-plugin-decap-cms', 'gatsby-browser.js');

if (!fs.existsSync(fileToPatch)) {
    console.error(`File not found: ${fileToPatch}`);
    process.exit(0); // Don't fail the build if package not present (e.g. dev vs prod)
}

let content = fs.readFileSync(fileToPatch, 'utf8');

const dynamicRequirePattern = /return _interopRequireWildcard\(require\(s\)\);/g;
const fixedRequire = 'return _interopRequireWildcard(require("netlify-identity-widget"));';

if (content.includes('require(s)')) {
    // Replace the specific dynamic require
    const newContent = content.replace(dynamicRequirePattern, fixedRequire);

    if (newContent !== content) {
        fs.writeFileSync(fileToPatch, newContent, 'utf8');
        console.log('Successfully patched gatsby-plugin-decap-cms/gatsby-browser.js to fix Critical Dependency warning.');
    } else {
        console.log('Pattern not matched, skipping patch.');
    }
} else {
    console.log('File already patched or pattern not found.');
}
