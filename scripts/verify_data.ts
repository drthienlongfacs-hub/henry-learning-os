import { HARVESTED_SCIENCE_TRIVIA, HARVESTED_MATH_PROBLEMS } from '../data/seed-expanded';

console.log('Verifying generated data...');

let errors = 0;

if (!Array.isArray(HARVESTED_SCIENCE_TRIVIA) || HARVESTED_SCIENCE_TRIVIA.length === 0) {
    console.error('Validation failed: Science schema is invalid or empty');
    errors++;
} else {
    console.log(`✅ Validated ${HARVESTED_SCIENCE_TRIVIA.length} science trivia items`);
}

if (!Array.isArray(HARVESTED_MATH_PROBLEMS) || HARVESTED_MATH_PROBLEMS.length === 0) {
    console.error('Validation failed: Math schema is invalid or empty');
    errors++;
} else {
    console.log(`✅ Validated ${HARVESTED_MATH_PROBLEMS.length} math problems`);
}

if (errors > 0) {
    console.error('Data sanity checks failed!');
    process.exit(1);
}

console.log('All data sanity checks passed! Ready to be utilized in Henry Learning OS.');
