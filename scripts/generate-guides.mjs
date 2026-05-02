#!/usr/bin/env node
/**
 * Audit script: count sentences vs guides per passage
 * This helps identify coverage gaps in sentenceGuides data
 */
import fs from 'fs';

const src = fs.readFileSync('src/data/textbook-library.ts', 'utf8');

// Extract all passage blocks
const passageRegex = /{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*text:\s*'([^']+)'/g;
const guideCountRegex = /sentenceGuides:\s*\[([\s\S]*?)\]/g;

let match;
const results = [];

// Simple approach: find each passage id+title+text
const lines = src.split('\n');
let currentPassage = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect passage start
    const idMatch = line.match(/id:\s*'([^']+)'/);
    const titleMatch = lines[i+1]?.match(/title:\s*'([^']+)'/);
    
    if (idMatch && titleMatch && lines[i+2]?.includes('text:')) {
        // Extract text - handle multi-line
        let textLine = lines[i+2];
        const textMatch = textLine.match(/text:\s*['"](.*)['"]/);
        if (textMatch) {
            const text = textMatch[1];
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            currentPassage = {
                id: idMatch[1],
                title: titleMatch[1],
                sentenceCount: sentences.length,
                sentences: sentences.map(s => s.trim()),
                guideCount: 0
            };
        }
    }
    
    // Count guides
    if (currentPassage && line.includes('guide(')) {
        currentPassage.guideCount++;
    }
    
    // End of passage sentenceGuides array
    if (currentPassage && line.match(/^\s*\],?\s*$/) && lines[i-1]?.includes('guide(')) {
        // Finalize
    }
    
    // When we hit comprehensionChecks, finalize current passage
    if (currentPassage && line.includes('comprehensionChecks:')) {
        results.push({...currentPassage});
        currentPassage = null;
    }
}

console.log('\n=== SENTENCE GUIDE COVERAGE AUDIT ===\n');
console.log('Passage'.padEnd(40) + 'Sentences'.padEnd(12) + 'Guides'.padEnd(10) + 'Coverage');
console.log('-'.repeat(72));

let totalSentences = 0;
let totalGuides = 0;

for (const r of results) {
    const coverage = r.sentenceCount > 0 ? Math.round(r.guideCount / r.sentenceCount * 100) : 0;
    const status = coverage >= 80 ? '✅' : coverage >= 40 ? '⚠️' : '❌';
    console.log(
        r.title.slice(0, 38).padEnd(40) +
        String(r.sentenceCount).padEnd(12) +
        String(r.guideCount).padEnd(10) +
        `${coverage}% ${status}`
    );
    totalSentences += r.sentenceCount;
    totalGuides += r.guideCount;
}

console.log('-'.repeat(72));
console.log(`TOTAL: ${totalSentences} sentences, ${totalGuides} guides, ${Math.round(totalGuides/totalSentences*100)}% coverage\n`);

// Output missing sentences per passage
console.log('\n=== MISSING GUIDES (sentences without EN/VI pair) ===\n');
for (const r of results) {
    if (r.guideCount < r.sentenceCount) {
        console.log(`📖 ${r.title} — missing ${r.sentenceCount - r.guideCount} guides:`);
        // Show all sentences for reference
        r.sentences.forEach((s, i) => {
            console.log(`   ${i+1}. ${s}`);
        });
        console.log('');
    }
}
