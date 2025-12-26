const fs = require('fs');
const content = fs.readFileSync('temp_gatsby_node.js', 'utf8');
const toReplace = `  var externals = [{
    name: "react",
    global: "React",
    assetDir: "umd",
    assetName: "react.production.min.js"
  }, {
    name: "react-dom",
    global: "ReactDOM",
    assetDir: "umd",
    assetName: "react-dom.production.min.js"
  }, {`;

const replacement = `  var externals = [{`;

if (content.indexOf(toReplace) === -1) {
    console.error("Could not find text to replace!");
    process.exit(1);
}

const newContent = content.replace(toReplace, replacement);
fs.writeFileSync('node_modules/gatsby-plugin-decap-cms/gatsby-node.js', newContent);
console.log('Patched successfully');
