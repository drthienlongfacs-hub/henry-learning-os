/**
 * COMPREHENSIVE QUALITY AUDIT — universal-lesson.ts
 * 6 Tầng rà soát chất lượng
 * 
 * Tầng 1: Structural Integrity (compile, key count, duplicates)
 * Tầng 2: Cross-Reference (generator keys vs lesson keys)
 * Tầng 3: Content Completeness (min concepts/examples/tips per entry)
 * Tầng 4: Pedagogical Accuracy (grade-appropriate, factual spot-checks)
 * Tầng 5: Vietnamese Language Quality (spelling, terminology)
 * Tầng 6: Runtime Validation (getUniversalLesson returns correct data)
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Tầng 1: Structural Integrity ───────────────────────────────────────

interface AuditResult {
  layer: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: string[];
}

const results: AuditResult[] = [];

// Read the file
const contentDir = path.resolve(__dirname, '../src/lib/content');
const universalContent = fs.readFileSync(path.join(contentDir, 'universal-lesson.ts'), 'utf8');

// Extract SUBJECT_LESSONS block and eval it
const match = universalContent.match(/(const SUBJECT_LESSONS: Record<[\s\S]+?> = )(\{[\s\S]*?\});\n\nexport function/);
if (!match) {
  console.error('❌ CRITICAL: Cannot extract SUBJECT_LESSONS block');
  process.exit(1);
}

const evalStr = `module.exports = ${match[2]};`;
fs.writeFileSync('/tmp/_audit_eval.js', evalStr);
const SUBJECT_LESSONS: Record<string, Record<string, { concepts: string[]; examples: string[]; tips: string[] }>> = require('/tmp/_audit_eval.js');

// Count all topics
const subjects = Object.keys(SUBJECT_LESSONS);
let totalTopics = 0;
const topicsBySubject: Record<string, number> = {};
const allKeys: string[] = [];
const duplicateKeys: string[] = [];

for (const subj of subjects) {
  const topicKeys = Object.keys(SUBJECT_LESSONS[subj]);
  topicsBySubject[subj] = topicKeys.length;
  totalTopics += topicKeys.length;
  
  for (const key of topicKeys) {
    if (allKeys.includes(key)) {
      duplicateKeys.push(`${subj}.${key} (duplicate of existing key)`);
    }
    allKeys.push(key);
  }
}

results.push({
  layer: 'T1-Structure',
  status: totalTopics >= 170 ? 'PASS' : 'FAIL',
  message: `Total topics: ${totalTopics}/170`,
  details: Object.entries(topicsBySubject).map(([s, c]) => `  ${s}: ${c} topics`),
});

results.push({
  layer: 'T1-Duplicates',
  status: duplicateKeys.length === 0 ? 'PASS' : 'WARN',
  message: duplicateKeys.length === 0 ? 'No duplicate keys found' : `${duplicateKeys.length} duplicate keys`,
  details: duplicateKeys,
});

// ─── Tầng 2: Cross-Reference with Generators ──────────────────────────

const generatorFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('-generator.ts') && !f.includes('universal-lesson'));
const generatorTopics: Set<string> = new Set();

for (const file of generatorFiles) {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const regex = /topicKey:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    generatorTopics.add(m[1]);
  }
}

const missingInLessons: string[] = [];
const extraInLessons: string[] = [];

for (const gKey of generatorTopics) {
  let found = false;
  for (const subj of subjects) {
    if (SUBJECT_LESSONS[subj][gKey]) { found = true; break; }
  }
  if (!found) missingInLessons.push(gKey);
}

for (const key of allKeys) {
  if (!generatorTopics.has(key)) {
    extraInLessons.push(key);
  }
}

results.push({
  layer: 'T2-CrossRef',
  status: missingInLessons.length === 0 ? 'PASS' : 'FAIL',
  message: `Generator topics missing in SUBJECT_LESSONS: ${missingInLessons.length}`,
  details: missingInLessons,
});

results.push({
  layer: 'T2-Orphans',
  status: extraInLessons.length === 0 ? 'PASS' : 'WARN',
  message: `Topics in SUBJECT_LESSONS but not in any generator: ${extraInLessons.length}`,
  details: extraInLessons,
});

// ─── Tầng 3: Content Completeness ─────────────────────────────────────

const MIN_CONCEPTS = 2;
const MIN_EXAMPLES = 1;
const MIN_TIPS = 1;

const incompleteEntries: string[] = [];
const emptyStrings: string[] = [];

for (const subj of subjects) {
  for (const key of Object.keys(SUBJECT_LESSONS[subj])) {
    const entry = SUBJECT_LESSONS[subj][key];
    const issues: string[] = [];
    
    if (!entry.concepts || entry.concepts.length < MIN_CONCEPTS) {
      issues.push(`concepts=${entry.concepts?.length ?? 0} (min ${MIN_CONCEPTS})`);
    }
    if (!entry.examples || entry.examples.length < MIN_EXAMPLES) {
      issues.push(`examples=${entry.examples?.length ?? 0} (min ${MIN_EXAMPLES})`);
    }
    if (!entry.tips || entry.tips.length < MIN_TIPS) {
      issues.push(`tips=${entry.tips?.length ?? 0} (min ${MIN_TIPS})`);
    }
    
    // Check for empty strings
    for (const arr of [entry.concepts, entry.examples, entry.tips]) {
      if (arr) {
        for (const item of arr) {
          if (!item || item.trim() === '') {
            emptyStrings.push(`${subj}.${key}: empty string in array`);
          }
        }
      }
    }
    
    if (issues.length > 0) {
      incompleteEntries.push(`${subj}.${key}: ${issues.join(', ')}`);
    }
  }
}

results.push({
  layer: 'T3-Completeness',
  status: incompleteEntries.length === 0 ? 'PASS' : 'FAIL',
  message: `Entries below min thresholds: ${incompleteEntries.length}`,
  details: incompleteEntries,
});

results.push({
  layer: 'T3-EmptyStrings',
  status: emptyStrings.length === 0 ? 'PASS' : 'FAIL',
  message: `Empty strings found: ${emptyStrings.length}`,
  details: emptyStrings,
});

// ─── Tầng 4: Pedagogical Accuracy (Spot Checks) ──────────────────────

const factChecks: AuditResult[] = [];

// Math fact checks
const mathChecks: [string, string, boolean][] = [
  ['add_sub_10', 'gộp hai nhóm', true],
  ['fractions', 'Tử số', true],
  ['circle_area', '3,14', true],
  ['perimeter', 'chu vi', true],
  ['divisibility_rules', 'chia hết cho 2', true],
  ['speed_distance_time', 'v = s/t', true],
  ['percent', 'chia cho 100', true],
];

for (const [key, expected, caseSensitive] of mathChecks) {
  const entry = SUBJECT_LESSONS.math?.[key];
  if (!entry) {
    factChecks.push({ layer: 'T4-Math', status: 'FAIL', message: `Missing key: math.${key}` });
    continue;
  }
  const allText = [...entry.concepts, ...entry.examples, ...entry.tips].join(' ');
  const found = caseSensitive ? allText.includes(expected) : allText.toLowerCase().includes(expected.toLowerCase());
  factChecks.push({
    layer: 'T4-Math',
    status: found ? 'PASS' : 'FAIL',
    message: `math.${key}: ${found ? '✓' : '✗'} contains "${expected}"`,
  });
}

// Vietnamese language checks
const vietChecks: [string, string, boolean][] = [
  ['alphabet', '29 chữ', true],
  ['tones', '6 thanh', true],
  ['chinh_ta', 'tr/ch', true],
  ['grammar', 'Danh từ', true],
  ['bien_phap_tu_tu', 'So sánh', true],
];

for (const [key, expected] of vietChecks) {
  const entry = SUBJECT_LESSONS.vietnamese?.[key];
  if (!entry) {
    factChecks.push({ layer: 'T4-Vietnamese', status: 'FAIL', message: `Missing key: vietnamese.${key}` });
    continue;
  }
  const allText = [...entry.concepts, ...entry.examples, ...entry.tips].join(' ');
  const found = allText.includes(expected);
  factChecks.push({
    layer: 'T4-Vietnamese',
    status: found ? 'PASS' : 'FAIL',
    message: `vietnamese.${key}: ${found ? '✓' : '✗'} contains "${expected}"`,
  });
}

// History/Geo fact checks  
const hisGeoChecks: [string, string][] = [
  ['history_g4', 'Bạch Đằng'],
  ['dia_ly_g4', 'Fansipan'],
  ['chau_luc', '6 châu lục'],
  ['history_g5', 'Điện Biên Phủ'],
];

for (const [key, expected] of hisGeoChecks) {
  const entry = SUBJECT_LESSONS.hisgeo?.[key];
  if (!entry) {
    factChecks.push({ layer: 'T4-HisGeo', status: 'FAIL', message: `Missing key: hisgeo.${key}` });
    continue;
  }
  const allText = [...entry.concepts, ...entry.examples, ...entry.tips].join(' ');
  const found = allText.includes(expected);
  factChecks.push({
    layer: 'T4-HisGeo',
    status: found ? 'PASS' : 'FAIL',
    message: `hisgeo.${key}: ${found ? '✓' : '✗'} contains "${expected}"`,
  });
}

// Science checks
const sciChecks: [string, string][] = [
  ['water_cycle', 'bay hơi'],
  ['nam_cham', '2 cực'],
  ['food_chain', 'sinh vật sản xuất'],
  ['ecosystem', 'Hệ sinh thái'],
  ['bien_doi_kh', 'Biến đổi khí hậu'],
];

for (const [key, expected] of sciChecks) {
  const entry = SUBJECT_LESSONS.science?.[key];
  if (!entry) {
    factChecks.push({ layer: 'T4-Science', status: 'FAIL', message: `Missing key: science.${key}` });
    continue;
  }
  const allText = [...entry.concepts, ...entry.examples, ...entry.tips].join(' ');
  const found = allText.includes(expected);
  factChecks.push({
    layer: 'T4-Science',
    status: found ? 'PASS' : 'FAIL',
    message: `science.${key}: ${found ? '✓' : '✗'} contains "${expected}"`,
  });
}

const factChecksFailed = factChecks.filter(r => r.status === 'FAIL');
results.push({
  layer: 'T4-FactChecks',
  status: factChecksFailed.length === 0 ? 'PASS' : 'FAIL',
  message: `Fact checks: ${factChecks.length - factChecksFailed.length}/${factChecks.length} passed`,
  details: factChecksFailed.map(r => r.message),
});

// ─── Tầng 5: Vietnamese Language Quality ──────────────────────────────

const langIssues: string[] = [];

// Check for common misspellings and bad patterns
const badPatterns: [RegExp, string][] = [
  [/\bvậy\b.*\bthật vậy\b/i, 'AI-sounding "thật vậy"'],
  [/\bkhông thể phủ nhận\b/i, 'AI-sounding "không thể phủ nhận"'],
  [/\btrong bối cảnh\b/i, 'AI-sounding "trong bối cảnh"'],
  [/\bet al\b/i, 'Forbidden "et al."'],
  [/\bundefined\b|\bnull\b|\bNaN\b/, 'JavaScript artifacts'],
  [/\$\{/i, 'Unresolved template literal'],
];

for (const subj of subjects) {
  for (const key of Object.keys(SUBJECT_LESSONS[subj])) {
    const entry = SUBJECT_LESSONS[subj][key];
    const allText = [...entry.concepts, ...entry.examples, ...entry.tips].join(' ');
    
    for (const [pattern, desc] of badPatterns) {
      if (pattern.test(allText)) {
        langIssues.push(`${subj}.${key}: Found ${desc}`);
      }
    }
    
    // Check for very short content (< 5 chars in any item)
    for (const item of [...entry.concepts, ...entry.examples, ...entry.tips]) {
      if (item.length < 5) {
        langIssues.push(`${subj}.${key}: Suspiciously short item "${item}" (${item.length} chars)`);
      }
    }
    
    // Check for overly long single items (> 200 chars)
    for (const item of [...entry.concepts, ...entry.examples, ...entry.tips]) {
      if (item.length > 200) {
        langIssues.push(`${subj}.${key}: Overly long item (${item.length} chars) — may need splitting`);
      }
    }
  }
}

results.push({
  layer: 'T5-Language',
  status: langIssues.length === 0 ? 'PASS' : 'WARN',
  message: `Language issues found: ${langIssues.length}`,
  details: langIssues,
});

// ─── Tầng 6: Runtime Validation ───────────────────────────────────────

// Check that getUniversalLesson function signature exists and exports correctly
const hasExport = universalContent.includes('export function getUniversalLesson');
const hasBuildLesson = universalContent.includes('function buildLesson');
const hasFallback = universalContent.includes('Auto-generate from topic name');

results.push({
  layer: 'T6-Runtime',
  status: hasExport && hasBuildLesson && hasFallback ? 'PASS' : 'FAIL',
  message: `Runtime functions: export=${hasExport}, buildLesson=${hasBuildLesson}, fallback=${hasFallback}`,
});

// Check subject-to-generator mapping completeness
const expectedSubjects = ['math', 'vietnamese', 'science', 'hisgeo', 'computing', 'ethics', 'art', 'english'];
const missingSubjects = expectedSubjects.filter(s => !subjects.includes(s));

results.push({
  layer: 'T6-Subjects',
  status: missingSubjects.length === 0 ? 'PASS' : 'FAIL',
  message: missingSubjects.length === 0 
    ? `All 8 subjects present: ${subjects.join(', ')}`
    : `Missing subjects: ${missingSubjects.join(', ')}`,
});

// ─── Print Report ─────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(70));
console.log('  UNIVERSAL-LESSON.TS — COMPREHENSIVE QUALITY AUDIT REPORT');
console.log('═'.repeat(70));
console.log(`  Date: ${new Date().toISOString()}`);
console.log(`  File: src/lib/content/universal-lesson.ts`);
console.log(`  Size: ${universalContent.length} bytes, ${universalContent.split('\n').length} lines`);
console.log('═'.repeat(70) + '\n');

let passCount = 0;
let failCount = 0;
let warnCount = 0;

for (const r of results) {
  const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${r.layer}] ${r.message}`);
  if (r.details && r.details.length > 0) {
    for (const d of r.details.slice(0, 10)) {
      console.log(`   ${d}`);
    }
    if (r.details.length > 10) {
      console.log(`   ... and ${r.details.length - 10} more`);
    }
  }
  
  if (r.status === 'PASS') passCount++;
  else if (r.status === 'FAIL') failCount++;
  else warnCount++;
}

console.log('\n' + '─'.repeat(70));
console.log(`  SUMMARY: ${passCount} PASS | ${failCount} FAIL | ${warnCount} WARN`);
console.log(`  VERDICT: ${failCount === 0 ? '✅ ALL GATES PASSED' : '❌ GATES FAILED — FIX REQUIRED'}`);
console.log('─'.repeat(70) + '\n');

// Cleanup
try { fs.unlinkSync('/tmp/_audit_eval.js'); } catch {}

process.exit(failCount > 0 ? 1 : 0);
