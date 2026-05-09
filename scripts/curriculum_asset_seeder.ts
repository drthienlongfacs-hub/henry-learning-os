import * as fs from 'fs';
import * as path from 'path';

/**
 * Curriculum Asset Seeder
 * Audits curriculum passages for missing visual assets and maps authentic images to unit sections.
 */

const PASSAGES_FILE = path.join(__dirname, '../src/data/intl-curriculum-passages.ts');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images/english');

function main() {
  console.log('🔍 Starting Curriculum Asset Audit...');

  if (!fs.existsSync(PASSAGES_FILE)) {
    console.error('❌ Could not find intl-curriculum-passages.ts');
    process.exit(1);
  }

  const content = fs.readFileSync(PASSAGES_FILE, 'utf-8');
  
  // Basic regex to find sections missing imageUrl but mentioning "picture" or "look at"
  // This is a heuristic audit to find gaps.
  const sectionRegex = /\{[\s\S]*?sectionTitle:[\s\S]*?\}/g;
  const sections = content.match(sectionRegex) || [];
  
  let missingCount = 0;
  let auditedCount = 0;

  console.log(`Found ${sections.length} authentic sections. Auditing for visual fidelity...`);

  sections.forEach(sec => {
    auditedCount++;
    const hasImage = sec.includes('imageUrl:');
    const mentionsPicture = sec.toLowerCase().includes('look at the picture') || sec.toLowerCase().includes('nhìn bức tranh');
    
    if (mentionsPicture && !hasImage) {
      // Extract section title or ID for reporting
      const titleMatch = sec.match(/sectionTitle:\s*'([^']+)'/);
      const title = titleMatch ? titleMatch[1] : 'Unknown Section';
      console.log(`⚠️ Missing Visual Asset: ${title}`);
      missingCount++;
    }
  });

  console.log('--------------------------------------------------');
  console.log(`📊 Audit Complete: Checked ${auditedCount} sections.`);
  if (missingCount === 0) {
    console.log('✅ 100% Visual Pedagogical Fidelity achieved!');
  } else {
    console.log(`❌ Found ${missingCount} sections missing required visual assets.`);
    console.log('Please generate or source the exact textbook pictures for these sections.');
  }
}

main();
