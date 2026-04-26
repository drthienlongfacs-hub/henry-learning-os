# PRD - Long Learning OS

## 1. Product vision

Long Learning OS is a family-first learning operating system for one child from age 6 to 18. It helps the child become an autonomous lifelong learner, while parents co-learn as mentors. AI is used as tutor, classmate, opponent, coach, examiner, librarian, project mentor, parent assistant, and safety guardian.

Core principle: AI must make the child think more, not think less.

## 2. Primary user

- Child: boy born in 2020, starts Grade 1 in 2026 in TP.HCM.
- Parents: want to reduce dependency on tutors, schools, and peer pressure.
- Context: Vietnamese family, likely wants both Vietnamese academic foundation and global/English-ready future.

## 3. Success outcomes

The app is successful if, after regular use, the child:

1. Reads and writes well in Vietnamese.
2. Builds strong math and reasoning foundation.
3. Develops usable English, not just test English.
4. Learns how to learn: plan, practice, retrieve, reflect, correct errors.
5. Uses AI ethically and actively, not passively.
6. Builds a 12-year portfolio of projects, writing, reading, coding, science, and life skills.
7. Has parents involved without turning home into another school.

## 4. Non-goals

- Not a social media app.
- Not a grade-chasing app.
- Not a generic chatbot for children.
- Not a replacement for parents, teachers, doctors, psychologists, or real-world relationships.
- Not a platform that monetizes child data.

## 5. Product pillars

### Pillar 1 - Mastery learning
Each skill has a mastery state, not just completion. A child advances only when they can recall, apply, and explain.

### Pillar 2 - Evidence-based learning
Use retrieval practice, spaced repetition, feedback, metacognition, self-regulated learning, and deliberate practice.

### Pillar 3 - Multi-role AI
AI switches roles based on learning objective:

- Tutor: teaches through questions.
- Classmate: learns with the child.
- Opponent: challenges thinking.
- Coach: plans and motivates.
- Examiner: tests without hint.
- Librarian: recommends resources.
- Project mentor: guides projects.
- Parent assistant: helps parents support.
- Safety guardian: detects risk.

### Pillar 4 - Parent co-learning
Parents receive simple daily missions and weekly review summaries.

### Pillar 5 - Whole-child development
Track academic, cognitive, emotional, social, physical, ethical, creative, and practical life skills.

## 6. MVP scope

### Must-have

1. Child profile and age-based competency map.
2. Daily learning plan.
3. AI Socratic tutor for Math, Vietnamese reading/writing, and English.
4. Hint ladder.
5. Mistake notebook.
6. Spaced repetition scheduler.
7. Reading journal.
8. Parent dashboard.
9. Weekly family review.
10. Safety policy and audit logs.

### Should-have

1. Voice input/output for young child.
2. Teach-back mode.
3. Writing coach.
4. English roleplay.
5. Portfolio vault.
6. Project builder.

### Later

1. Coding pathway.
2. Debate arena.
3. Science home lab.
4. Career simulator.
5. University/pathway planner.

## 7. Key user journeys

### Journey A - Child daily self-study
1. Child opens app.
2. App asks mood/energy quick check.
3. App offers 20-30 minute plan.
4. Retrieval practice starts before new learning.
5. AI tutor teaches via hints.
6. Child solves independent challenge.
7. Child teaches back.
8. App schedules review.
9. Parent receives short summary.

### Journey B - Parent learns with child
1. Parent opens dashboard.
2. Sees one important insight and one mission.
3. Parent spends 10 minutes asking a guided question.
4. Child explains what they learned.
5. Parent marks observation.

### Journey C - Mistake recovery
1. Child makes error.
2. AI classifies error.
3. Error becomes a notebook item.
4. App generates similar and reversed problems.
5. Error reappears in spaced review.
6. Mastery updates only after transfer.

### Journey D - Project week
1. Child chooses project.
2. AI project mentor creates plan.
3. Parent approves materials and safety.
4. Child does project and uploads evidence.
5. App asks reflection.
6. Portfolio item is created.

## 8. Metrics

### Learning metrics

- Mastery score per skill.
- Retention score after 1 day, 1 week, 1 month.
- Transfer score on new problem type.
- Explanation score.
- Error recurrence rate.
- Hint dependency level.

### Behavior metrics

- Self-start rate.
- Reflection completion.
- Reading minutes/pages/books.
- Project completion.
- Parent co-learning sessions.

### Safety metrics

- Number of blocked unsafe interactions.
- AI answer compliance score.
- Child privacy events.
- Excessive screen-time warnings.

## 9. UX principles

- Child UI: simple, warm, visual, low clutter.
- Parent UI: insight-first, no data overload.
- No public leaderboard.
- Rewards are mastery, projects, and growth, not addictive streaks.
- AI must be transparent about uncertainty and support level.

## 10. Acceptance criteria for MVP

A parent can create a child profile, assign a 20-minute learning plan, observe the child complete Math/Reading/English sessions with AI hint ladder, see mistakes saved automatically, see scheduled reviews, and receive weekly recommendations.

## 11. Adaptive acceleration principle

The app must not assume a child can only learn at the average level for their chronological age. Age is used for safety, UX, privacy, emotional tone, and content appropriateness; it is not a hard academic ceiling.

The app must support domain-specific acceleration when data shows readiness. A six-year-old may be age-typical in handwriting, advanced in math reasoning, highly curious in astronomy, and still emotionally six. The system must support this asynchronous profile.

### Required product behavior

- Detect underchallenge and reduce unnecessary repetition.
- Detect overchallenge and add scaffolding.
- Compact mastered content.
- Allow above-grade progression in specific domains.
- Offer enrichment and project-based depth instead of only faster grade progression.
- Track learning velocity, hint dependency, retention, transfer, and explanation quality.
- Never label the child as genius/slow/weak in the child UI.
- Give parents nuanced insights: advanced in what, typical in what, needing support in what.

See `docs/ADAPTIVE_ACCELERATION_SPEC.md`.

## 12. Owner / Capital Allocator / Rule-Shaper Track

School pathway matters, but it is not the decisive layer if the family wants the child to have a higher probability of becoming an owner, capital allocator, leader, founder, policy thinker, or rule-shaper. The app must include a long-term capability track built around six capabilities:

1. Deep bilingual ability: Vietnamese to understand Vietnam, English to access the world.
2. Math, probability, statistics, and data: foundation for investing, AI, business, and risk.
3. History, law, policy, and geopolitics: foundation for institutions, power, regulation, and rule-making.
4. Finance, accounting, assets, and capital allocation: foundation for investors and owners.
5. Sales, persuasion, negotiation, and leadership: foundation for founders and public leaders.
6. Ethics, self-governance, and pressure tolerance: so money, power, or status do not damage character.

This track must be age-appropriate and evidence-driven. It should not force advanced adult abstractions onto a young child. Instead, it should introduce mental models through stories, games, family routines, simulations, projects, and reflection.

Product guardrail: frame this as agency, responsibility, stewardship, and value creation; never as status, domination, manipulation, or getting rich at all costs.

See `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md`.
