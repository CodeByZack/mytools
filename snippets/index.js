/**
 * 注入通用的 snippets
 */

const { writeFileSync } = require('fs');
const path = require('path');
const disableSnippets = require('./disable.json');
const jrSnippets = require('./jr.json');
const trSnippets = require('./tr.json');

const javascriptreact = {
  ...disableSnippets,
  ...jrSnippets,
};

const typescriptreact = {
  ...disableSnippets,
  ...trSnippets,
};

writeFileSync(
  path.join(__dirname, './javascriptreact.json'),
  JSON.stringify(javascriptreact, null, 4),
);
writeFileSync(
  path.join(__dirname, './typescriptreact.json'),
  JSON.stringify(typescriptreact, null, 4),
);
