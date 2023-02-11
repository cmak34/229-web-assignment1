const fs = require('fs');
const path = require('path');

// include the package.json version and last update time in footer.ejs
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath));
const lastUpdated = new Date(fs.statSync(pkgPath).mtime).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).toString();

module.exports = {
  siteName: "HUGO MAK Personal Site",
  version: pkg.version,
  lastUpdated: lastUpdated
}