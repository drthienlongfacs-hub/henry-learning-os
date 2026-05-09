const fs = require('fs');
const contentFile = fs.readFileSync('src/data/future-skills-content.ts', 'utf-8');
const axisFile = fs.readFileSync('src/data/future-skills.ts', 'utf-8');

// Use regex to find all activity titles in future-skills.ts
const titles = [...axisFile.matchAll(/title:\s*'([^']+)'/g)].map(m => m[1]);

// Use regex to find all titles in future-skills-content.ts
const existingTitles = [...contentFile.matchAll(/'([^']+)':\s*\{/g)].map(m => m[1]);

const missing = titles.filter(t => !existingTitles.includes(t));
console.log('Missing count:', missing.length);
console.log('Missing:', missing);
