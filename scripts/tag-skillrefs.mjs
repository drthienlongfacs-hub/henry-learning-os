import { readFileSync, writeFileSync } from 'fs';

const FILE = 'src/data/intl-curriculum-passages.ts';
let content = readFileSync(FILE, 'utf8');

const TYPE_SKILLS = {
  'getting_started': "['1SLs.01', '1SLg.04', '1SLr.01']",
  'reading':         "['1Ri.01', '1Ri.05', '1Rv.01', '1Rw.07']",
  'poem':            "['1Ri.01', '1Rw.01', '1SLp.02']",
  'story':           "['1Ri.01', '1Ri.02', '1Ri.07', '1SLp.01']",
  'information':     "['1Ri.03', '1Ri.04', '1SLs.01']",
  'grammar':         "['1Rv.01', '1Rw.04', '1Rw.07']",
  'word_work':       "['1Rv.01', '1Rw.05', '1Ww.05', '1Ww.06']",
  'comprehension':   "['1Ri.05', '1Ri.07', '1Ri.09', '1SLs.02']",
  'talk_about':      "['1SLg.01', '1SLg.04', '1SLp.05', '1SLr.01']",
  'writing':         "['1Ws.01', '1Ww.05', '1Ww.06']",
  'self_check':      "['1SLr.01']",
  'tip':             "['1Ri.06', '1SLr.01']",
  'review':          "['1Ri.06', '1SLr.01']",
  'activity':        "['1Ri.01', '1Rw.05', '1SLp.04']",
};

const lines = content.split('\n');
let tagged = 0;
const result = [];

for (let i = 0; i < lines.length; i++) {
  result.push(lines[i]);
  const typeMatch = lines[i].match(/^\s+type:\s+['"](\w+)['"]/);
  if (typeMatch) {
    const nextLine = lines[i + 1] || '';
    if (!nextLine.includes('skillRefs')) {
      const skills = TYPE_SKILLS[typeMatch[1]];
      if (skills) {
        const indent = lines[i].match(/^(\s+)/)?.[1] || '      ';
        result.push(`${indent}skillRefs: ${skills},`);
        tagged++;
      }
    }
  }
}

writeFileSync(FILE, result.join('\n'));
console.log(`Tagged ${tagged} sections with skillRefs`);
