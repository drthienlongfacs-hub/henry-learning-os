# Feature Specification

## 1. Personal Learning Map

### Goal
Create a living map of the child's development from 6 to 18.

### Features

- Age and grade configuration.
- Track local Vietnamese pathway and optional global pathways.
- Competency states: Not started, Learning, Practicing, Mastered, Needs Review, Advanced.
- Domains: Vietnamese, Math, English, Science, Coding/AI, Reading, Writing, Life Skills, Emotional Skills, Physical Habits, Projects.

### User stories

- As a parent, I want to know what my child should learn this year.
- As a child, I want to see progress without feeling compared to others.

## 2. AI Tutor

### Modes

- Socratic Tutor: asks questions first.
- Explain 3 Ways: simple, visual, academic.
- Hint Ladder: tiny hint, medium hint, worked example, similar practice.
- Mistake Analyzer: classifies mistake.
- Mastery Checker: tests without hints.

### Rules

- Never provide full answer first.
- Always ask the child to attempt.
- Always record hint level.
- For writing, provide feedback, not a ready-to-submit essay.

## 3. AI Classmate

### Features

- Peer discussion.
- Teach-your-friend mode.
- Reading buddy.
- Language conversation buddy.
- Collaborative project brainstorming.

### Sample behavior

The AI may intentionally make a plausible mistake and ask the child to check it.

## 4. AI Opponent

### Features

- Debate Arena.
- Devil's Advocate.
- Math Duel.
- Writing Challenge.
- Ethics Simulator.

### Rubric

- Claim clarity.
- Evidence.
- Logic.
- Counterargument.
- Tone.
- Reflection.

## 5. AI Coach

### Features

- Daily plan.
- Energy-aware adjustment.
- Focus timer.
- Reflection journal.
- Weekly review.
- Habit builder.

## 6. Spaced Repetition and Memory Engine

### Features

- Auto flashcard suggestions.
- Child/parent review of generated cards.
- Retrieval-first flow.
- Spaced schedule.
- Interleaving.
- Retention dashboard.

## 7. Vietnamese Reading and Writing

### Features

- Reading ladder by age.
- Read-aloud and speech-to-text.
- Story retelling.
- Vocabulary notebook.
- Writing studio.
- Rubric-based feedback.

## 8. English Learning

### Features

- Phonics and listening.
- Roleplay.
- Explain-my-mistake.
- CEFR level tracker.
- Speaking feedback.
- Academic English path for ages 12+.

## 9. Math and Logic

### Features

- Concrete-pictorial-abstract path.
- Step-by-step reasoning.
- Error notebook.
- Problem variation generator.
- Applied math track.
- Optional advanced/olympiad track.

## 10. Science and Maker Lab

### Features

- Home experiments.
- Hypothesis-prediction-observation-explanation flow.
- Photo evidence.
- Charting.
- Safety checklist.

## 11. Coding and AI Literacy

### Path

- Age 6-8: ScratchJr-like sequencing.
- Age 8-11: Scratch-like block coding.
- Age 11-13: Python basics.
- Age 13-15: web, data, prompt literacy.
- Age 15-18: AI app building, data science, cybersecurity basics.

## 12. Life Skills

### Features

- Emotion check-in.
- Conflict simulator.
- Chores tracker.
- Money literacy.
- Health routine.
- Values journal.

## 13. Parent Co-Learning

### Features

- Parent dashboard.
- Daily 10-minute mission.
- Weekly family meeting.
- Parent prompt library.
- Family project mode.
- Family media plan.

## 14. Portfolio Vault

### Features

- Store writing, projects, code, science reports, videos, reading logs.
- Reflection attached to each item.
- Milestone view by age.
- Exportable PDF/HTML portfolio later.

## 15. Adaptive Acceleration and Dynamic Level Engine

### Goal
Prevent the app from locking the child into age-grade assumptions. The system should discover real ability, detect advanced readiness, and adjust difficulty so the child is neither bored nor overwhelmed.

### Features

- Domain-specific ability levels independent of chronological age.
- Dynamic Challenge Fit Score.
- Learning Velocity metric.
- Hint Dependency Index.
- Transfer Index.
- Retention Half-Life per skill.
- Underchallenge detection.
- Overchallenge/frustration detection.
- Curriculum compacting for already-mastered skills.
- Stretch Ladder: foundation -> fluency -> explanation -> transfer -> creation -> teaching/opposition.
- Parent-visible asynchronous profile.
- Child-safe acceleration language.

### Rules

- Age controls safety and UX, not academic ceiling.
- Do not repeat mastered content unnecessarily.
- Do not accelerate globally just because one domain is advanced.
- Always require evidence: accuracy, retention, transfer, explanation, low hint use, healthy engagement.
- Use enrichment/project depth when grade acceleration is not appropriate.

### Acceptance criteria

- A child can unlock above-age math/science/coding content if readiness is demonstrated.
- A child who is advanced in math but age-typical in writing can progress differently in each domain.
- The AI can say: "This looks mastered; I will skip the easy repeats and offer a challenge version."
- Parent dashboard can show underchallenge and overchallenge risks.

See `docs/ADAPTIVE_ACCELERATION_SPEC.md`.

## 16. Owner / Capital Allocator / Rule-Shaper Track

### Goal
Build long-term agency so the child can eventually understand ownership, capital allocation, leadership, institutions, incentives, and ethical responsibility.

### Six capability modules

1. Deep Bilingual Studio: Vietnamese depth + English global access.
2. Data & Probability Lab: uncertainty, charts, expected value, base rates, decision quality.
3. History/Law/Policy/Geopolitics Map: rules, institutions, power, public goods, tradeoffs.
4. Finance/Accounting/Assets Lab: saving, spending, assets, liabilities, cash flow, compounding, unit economics.
5. Pitch/Negotiation/Leadership Studio: ethical persuasion, listening, leading small groups, handling rejection.
6. Ethics Under Pressure Simulator: truth, responsibility, conflicts of interest, anti-cheating, anti-manipulation.

### Rules

- Do not frame the goal as status, domination, or getting rich at all costs.
- Teach ownership as stewardship and responsibility.
- Teach persuasion as ethical communication, not manipulation.
- Stretch only when evidence shows readiness.
- Always keep development balanced: advanced capital concepts cannot replace emotional maturity, ethics, health, and family connection.

### Acceptance criteria

- Parent can enable/disable the track.
- The child can complete age-appropriate money, decision, persuasion, and ethics missions.
- Parent dashboard shows six capability metrics without labeling the child.
- Advanced tasks require evidence: accuracy, retention, transfer, explanation, low hint dependency, and healthy engagement.

See `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md`.
