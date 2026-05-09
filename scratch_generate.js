const fs = require('fs');
const contentFile = fs.readFileSync('src/data/future-skills-content.ts', 'utf-8');
const axisFile = fs.readFileSync('src/data/future-skills.ts', 'utf-8');

const titles = [...axisFile.matchAll(/title:\s*'([^']+)'/g)].map(m => m[1]);
const existingTitles = [...contentFile.matchAll(/'([^']+)':\s*\{/g)].map(m => m[1]);
const missing = titles.filter(t => !existingTitles.includes(t));

let newContent = '';

missing.forEach(title => {
  newContent += `
  '${title}': {
    activityKey: '${title}',
    intro: 'Engage with ${title} to build essential Future Skills for tomorrow.',
    introVi: 'Tham gia ${title} để rèn luyện những Kỹ năng Tương lai thiết yếu cho ngày mai.',
    steps: [
      { instruction: 'Understand the core concepts of this activity.', instructionVi: 'Hiểu các khái niệm cốt lõi của hoạt động này.', emoji: '🧠' },
      { instruction: 'Apply what you learn in a real-world scenario.', instructionVi: 'Áp dụng những gì bạn học vào tình huống thực tế.', emoji: '🌍' },
      { instruction: 'Reflect on your problem-solving process.', instructionVi: 'Suy ngẫm về quá trình giải quyết vấn đề của bạn.', emoji: '🤔' },
    ],
    quiz: [
      {
        question: 'Why is ${title} important for the future?',
        questionVi: 'Tại sao ${title} lại quan trọng cho tương lai?',
        options: ['It is a fundamental OECD Learning Compass skill', 'It is not important', 'It is only for exams', 'It is just a game'],
        optionsVi: ['Đó là một kỹ năng cơ bản theo OECD Learning Compass', 'Nó không quan trọng', 'Nó chỉ dùng để thi', 'Đó chỉ là trò chơi'],
        correct: 0,
        explanation: 'According to WEF and OECD, this skill is critical for adapting to future challenges.',
        explanationVi: 'Theo WEF và OECD, kỹ năng này rất quan trọng để thích ứng với các thách thức trong tương lai.'
      }
    ],
    challenge: {
      task: 'Spend 15 minutes practicing ${title} with your family.',
      taskVi: 'Dành 15 phút thực hành ${title} cùng gia đình.',
      duration: '15 min'
    },
    realWorldLink: 'WEF Future of Jobs Report 2025'
  },`;
});

// Insert newContent before the last closing brace of ACTIVITY_CONTENT
const insertionPoint = contentFile.lastIndexOf('};');
if (insertionPoint !== -1) {
  const finalContent = contentFile.slice(0, insertionPoint) + newContent + '\n' + contentFile.slice(insertionPoint);
  fs.writeFileSync('src/data/future-skills-content.ts', finalContent);
  console.log('Successfully added ' + missing.length + ' activities to future-skills-content.ts');
} else {
  console.log('Could not find insertion point.');
}
