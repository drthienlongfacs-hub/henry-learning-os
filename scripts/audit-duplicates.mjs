// Audit script: Find duplicate content across grades in ALL subjects
// Run: node scripts/audit-duplicates.mjs

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Parse science-generator.ts to extract question banks
const sciFile = readFileSync(join(root, 'src/lib/content/science-generator.ts'), 'utf8');

// Extract all question arrays and their grades
const questionBanks = [];
const bankRegex = /const\s+(\w+)\s*=\s*\[([\s\S]*?)\];/g;
let match;
while ((match = bankRegex.exec(sciFile)) !== null) {
  const name = match[1];
  if (name.endsWith('_QS') || name === 'NATURE_QS' || name === 'BODY_HEALTH_QS' ||
      name === 'WEATHER_EARTH_QS' || name === 'MATTER_ENERGY_QS' || name === 'ECO_QS' ||
      name === 'FAMILY_COMMUNITY_QS' || name === 'TRAFFIC_SAFETY_QS' || name === 'SAFETY_HOME_QS' ||
      name === 'SOUND_LIGHT_QS' || name === 'FOOD_CHAIN_QS' || name === 'VE_SINH_QS' ||
      name === 'NUOC_KHONGKHI_QS' || name === 'SINH_SAN_QS' || name === 'NHIET_CHAT_QS' ||
      name === 'THOI_TIET_MUA' || name === 'CAY_COI' || name === 'DIEN_CO_BAN' ||
      name === 'DINH_DUONG' || name === 'NAM_CHAM' || name === 'BIEN_DOI_KH') {
    // Extract questions
    const content = match[2];
    const questions = [];
    const qRegex = /q:\s*'([^']+)'/g;
    let qm;
    while ((qm = qRegex.exec(content)) !== null) {
      questions.push(qm[1]);
    }
    questionBanks.push({ name, questions });
  }
}

// Extract SCIENCE_TOPICS registry
const topicRegex = /export const SCIENCE_TOPICS[\s\S]*?\[([\s\S]*?)\];/;
const topicMatch = sciFile.match(topicRegex);

// Extract topic entries
const topics = [];
const entryRegex = /\{\s*key:\s*'([^']+)',\s*name:\s*'([^']+)',\s*gradeLevel:\s*(?:SCIENCE_TOPIC_GRADE\.(\w+)|(\d+))/g;
let em;
while ((em = entryRegex.exec(sciFile)) !== null) {
  const key = em[1];
  const name = em[2];
  const gradeRef = em[3];
  const gradeNum = em[4];
  
  // Resolve grade
  let grade;
  if (gradeNum) {
    grade = parseInt(gradeNum);
  } else if (gradeRef) {
    const gradeMap = { body_health: 1, nature: 2, weather_earth: 3, matter_energy: 4, ecosystem: 5 };
    grade = gradeMap[gradeRef] || 0;
  }
  topics.push({ key, name, grade });
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║  HENRY LEARNING OS — DUPLICATE CONTENT AUDIT (SCIENCE)     ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('=== SCIENCE TOPICS REGISTRY ===');
console.log(`Total topics: ${topics.length}\n`);

// Group by grade
const byGrade = {};
for (const t of topics) {
  (byGrade[t.grade] ??= []).push(t);
}

for (const [grade, gradeTopics] of Object.entries(byGrade).sort((a,b) => +a - +b)) {
  console.log(`--- Lớp ${grade} (${gradeTopics.length} chủ đề) ---`);
  for (const t of gradeTopics) {
    console.log(`  [${t.key}] ${t.name}`);
  }
}

// KEY BUG: Show what each grade ACTUALLY sees with the <= filter
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  BUG: FILTER `gradeLevel <= grade` CAUSES ACCUMULATION     ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

for (let g = 1; g <= 5; g++) {
  const visible = topics.filter(t => t.grade <= g);
  const ownGrade = topics.filter(t => t.grade === g);
  const inherited = visible.length - ownGrade.length;
  console.log(`Lớp ${g}: thấy ${visible.length} chủ đề (${ownGrade.length} riêng + ${inherited} kế thừa từ lớp dưới)`);
  if (inherited > 0) {
    const inheritedTopics = visible.filter(t => t.grade < g);
    for (const t of inheritedTopics) {
      console.log(`  ⚠️  TRÙNG: [G${t.grade}] ${t.key}: "${t.name}" — KHÔNG phải nội dung lớp ${g}`);
    }
  }
}

// Cross-check: Find duplicate QUESTIONS across different banks
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  CROSS-BANK DUPLICATE QUESTIONS                            ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const allQuestions = new Map(); // question -> [bank names]
for (const bank of questionBanks) {
  for (const q of bank.questions) {
    const norm = q.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!allQuestions.has(norm)) allQuestions.set(norm, []);
    allQuestions.get(norm).push(bank.name);
  }
}

let dupeCount = 0;
for (const [q, banks] of allQuestions) {
  if (banks.length > 1) {
    dupeCount++;
    console.log(`  ❌ "${q}"`);
    console.log(`     Xuất hiện trong: ${banks.join(', ')}`);
  }
}
if (dupeCount === 0) {
  console.log('  ✅ Không có câu hỏi trùng giữa các bank');
} else {
  console.log(`\n  Tổng: ${dupeCount} câu hỏi bị trùng giữa các bank`);
}

// Check similar content across banks
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  SIMILAR/OVERLAPPING CONTENT ACROSS GRADES                 ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Known overlaps based on content analysis
const overlaps = [
  { a: 'BODY_HEALTH_QS', b: 'VE_SINH_QS', desc: 'Đánh răng 2 lần/ngày xuất hiện trong cả 2 bank (body_health G1 + ve_sinh G1)' },
  { a: 'NATURE_QS', b: 'CAY_COI', desc: 'Cây cần nước/ánh sáng — gần giống giữa nature G2 và cay_coi G2' },
  { a: 'NATURE_QS', b: 'CAY_COI', desc: 'Rễ hấp thụ nước — gần giống giữa nature G2 và cay_coi G2' },
  { a: 'WEATHER_EARTH_QS', b: 'NUOC_KHONGKHI_QS', desc: 'Nước 3 thể — gần giống giữa weather_earth G3 và nuoc_khong_khi G3' },
  { a: 'WEATHER_EARTH_QS', b: 'THOI_TIET_MUA', desc: 'Nhiệt kế đo nhiệt độ — gần giống giữa weather_earth G3 và thoi_tiet_mua G2' },
  { a: 'MATTER_ENERGY_QS', b: 'SOUND_LIGHT_QS', desc: 'Ánh sáng đường thẳng — CÂU HỎI GIỐNG NHAU giữa matter_energy G4 và sound_light G4' },
  { a: 'MATTER_ENERGY_QS', b: 'SOUND_LIGHT_QS', desc: 'Âm thanh qua rắn/lỏng/khí — CÂU HỎI GIỐNG NHAU giữa weather_earth G3 và sound_light G4' },
  { a: 'MATTER_ENERGY_QS', b: 'DIEN_CO_BAN', desc: 'Vật dẫn điện kim loại — CÂU HỎI GIỐNG NHAU giữa matter_energy G4 và dien_co_ban G5' },
  { a: 'MATTER_ENERGY_QS', b: 'NHIET_CHAT_QS', desc: 'Len cách nhiệt — NỘI DUNG TRÙNG giữa matter_energy G4 và nhiet_chat G4' },
  { a: 'ECO_QS', b: 'NUOC_KHONGKHI_QS', desc: 'Ô nhiễm không khí — NỘI DUNG TRÙNG giữa ecosystem G5 và nuoc_khong_khi G3' },
  { a: 'ECO_QS', b: 'BIEN_DOI_KH', desc: 'Ô nhiễm/CO2 — NỘI DUNG TRÙNG giữa ecosystem G5 và bien_doi_kh G5' },
];

for (const o of overlaps) {
  console.log(`  ⚠️  ${o.desc}`);
}

// Final summary
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  ROOT CAUSE ANALYSIS                                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('RCA-1: SYSTEMIC FILTER BUG — `gradeLevel <= grade` in page.tsx line 531');
console.log('  → Lớp 5 thấy TẤT CẢ 20 chủ đề (5 của lớp 5 + 15 kế thừa)');
console.log('  → Lớp 1 thấy 5 chủ đề → OK');
console.log('  → FIX: Đổi thành `gradeLevel === grade` cho science\n');

console.log('RCA-2: DUPLICATE QUESTIONS giữa các bank cùng lớp');
console.log('  → MATTER_ENERGY_QS vs SOUND_LIGHT_QS: 2 câu giống hệt');
console.log('  → MATTER_ENERGY_QS vs DIEN_CO_BAN: 1 câu giống hệt');
console.log('  → MATTER_ENERGY_QS vs NHIET_CHAT_QS: nội dung trùng');
console.log('  → FIX: Deduplicate câu hỏi, mỗi câu chỉ thuộc 1 bank\n');

console.log('RCA-3: SIMILAR CONTENT across grades không match giáo trình gốc');
console.log('  → Cây cần gì để sống xuất hiện ở nature G2 VÀ cay_coi G2');
console.log('  → Nước 3 thể xuất hiện ở weather_earth G3 VÀ nuoc_khong_khi G3');
console.log('  → FIX: Merge hoặc tách rõ theo giáo trình CTGDPT 2018\n');

console.log('RCA-4: SAME BUG áp dụng cho ethics, art, computing, hisgeo, vietnamese');
console.log('  → Tất cả dùng `t.gradeLevel <= grade` trừ math');
console.log('  → Math dùng `=== grade` (ĐÚNG)');
console.log('  → FIX: Thống nhất filter cho TẤT CẢ môn\n');

// Now check other subjects
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║  AUDIT CÁC MÔN KHÁC                                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const pageFile = readFileSync(join(root, 'src/app/child/learn/page.tsx'), 'utf8');
const filterLines = pageFile.split('\n').filter(l => l.includes('gradeLevel') && (l.includes('<= grade') || l.includes('=== grade')));
console.log('Filter logic in page.tsx:');
for (const l of filterLines) {
  const trimmed = l.trim();
  if (trimmed.includes('gradeLevel')) {
    const isCorrect = trimmed.includes('=== grade');
    const isBug = trimmed.includes('<= grade');
    if (isCorrect) console.log(`  ✅ ${trimmed}`);
    if (isBug) console.log(`  ❌ ${trimmed}`);
  }
}

// Check each generator for topic counts per grade
for (const genFile of ['ethics-generator.ts', 'art-generator.ts', 'computing-generator.ts', 'history-geo-generator.ts', 'vietnamese-generator.ts']) {
  const content = readFileSync(join(root, 'src/lib/content', genFile), 'utf8');
  const topicEntries = [];
  const re = /key:\s*'([^']+)',\s*name:\s*'([^']+)',\s*gradeLevel:\s*(\d+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    topicEntries.push({ key: m[1], name: m[2], grade: parseInt(m[3]) });
  }
  
  if (topicEntries.length > 0) {
    console.log(`\n--- ${genFile} (${topicEntries.length} topics) ---`);
    const gradeGroups = {};
    for (const t of topicEntries) {
      (gradeGroups[t.grade] ??= []).push(t);
    }
    for (const [g, ts] of Object.entries(gradeGroups).sort((a,b) => +a - +b)) {
      console.log(`  Lớp ${g}: ${ts.length} chủ đề`);
    }
    
    // Show accumulation for grade 5
    const visibleG5 = topicEntries.filter(t => t.grade <= 5);
    const ownG5 = topicEntries.filter(t => t.grade === 5);
    if (visibleG5.length > ownG5.length) {
      console.log(`  ⚠️  Lớp 5 thấy ${visibleG5.length} chủ đề thay vì ${ownG5.length} (dư ${visibleG5.length - ownG5.length})`);
    }
  }
}

console.log('\n✅ Audit hoàn tất.');
