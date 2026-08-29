const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove inventory block
const invStart = code.indexOf("{activeTab === 'inventory' && (");
if (invStart !== -1) {
  let depth = 0;
  let i = code.indexOf("(", invStart);
  let invEnd = -1;
  for (; i < code.length; i++) {
    if (code[i] === '(') depth++;
    if (code[i] === ')') depth--;
    if (depth === 0) {
      invEnd = i;
      break;
    }
  }
  if (invEnd !== -1) {
    code = code.substring(0, invStart) + code.substring(invEnd + 1);
  }
}

// Remove community block
const comStart = code.indexOf("{activeTab === 'community' && (");
if (comStart !== -1) {
  let depth = 0;
  let i = code.indexOf("(", comStart);
  let comEnd = -1;
  for (; i < code.length; i++) {
    if (code[i] === '(') depth++;
    if (code[i] === ')') depth--;
    if (depth === 0) {
      comEnd = i;
      break;
    }
  }
  if (comEnd !== -1) {
    code = code.substring(0, comStart) + code.substring(comEnd + 1);
  }
}

fs.writeFileSync('src/App.tsx', code);
