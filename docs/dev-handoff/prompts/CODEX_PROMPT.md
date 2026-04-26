# Codex Prompt

You are Codex working in a repository that contains product specifications for Long Learning OS, a private child learning app for one family.

Read these files before coding:

- README.md
- docs/PRD.md
- docs/FEATURE_SPEC.md
- policies/AI_SAFETY_POLICY.md
- architecture/ARCHITECTURE.md
- schemas/DATA_MODEL.md
- issues/MVP_ISSUES.md

## Goal

Build the MVP of a family-first learning app for a boy born in 2020. The app helps the child self-study from age 6 onward with structured AI tutoring, mistake tracking, spaced review, reading journal, and parent co-learning dashboard.

## Constraints

- Use TypeScript.
- Prefer Next.js + Tailwind.
- Keep code simple and readable.
- Implement mock data and mock AI provider first.
- Do not integrate paid AI APIs until core UX works.
- Do not build free-form child chatbot.
- Child AI must be structured by role and safety policy.

## First task

Create the app skeleton:

1. Next.js app structure.
2. Pages/routes:
   - /
   - /parent/onboarding
   - /parent/dashboard
   - /child/dashboard
   - /child/session/[id]
   - /child/mistakes
   - /child/reviews
   - /parent/weekly-review
   - /parent/safety
3. Components:
   - ChildProfileCard
   - DailyPlanCard
   - LessonSession
   - AITutorPanel
   - HintLadder
   - MistakeNotebook
   - ReviewQueue
   - ParentInsightCard
   - WeeklyReview
4. Data models from schemas/DATA_MODEL.md.
5. Mock data seed for a 6-year-old Grade 1 child.

## Then implement issues in order

Follow issues/MVP_ISSUES.md from Issue 1 onward. Make one coherent commit or patch per issue if possible.

## Quality bar

- Add unit tests for learning engine functions.
- Add simple E2E test for parent onboarding -> child session -> mistake saved -> dashboard update.
- Keep accessibility in mind.
- Use age-appropriate UI text.
- Add comments explaining safety decisions.

## Definition of done

A parent can create a profile, the child can complete one structured lesson, mistakes and hints are recorded, reviews are scheduled, and the parent dashboard gives one actionable next step.

## Adaptive acceleration instruction

In addition to the MVP, implement or stub the adaptive acceleration layer described in `docs/ADAPTIVE_ACCELERATION_SPEC.md`.

Key rule: chronological age must not cap academic progression. Age controls safety and UX only. The recommendation engine should be evidence-based and domain-specific, using accuracy, hint dependency, retention, transfer, explanation quality, boredom signals, frustration signals, and parent observations.

Start with issues 16-18 after the base profile/attempt models are created.

Additional mission requirement:
Read `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md` before implementing roadmap items beyond the core MVP. The app must include a long-term six-capability track for agency, ownership, capital allocation, leadership, institutional thinking, and ethical pressure tolerance. Do not implement this as a wealth/status game. Implement it as age-appropriate, evidence-driven capability development with parent oversight.

## Resource Full-Stack Layer

Before implementing module integrations, read `RESOURCE_FULLSTACK_UPGRADE_INDEX.md`, `resources/RESOURCE_BENCHMARK_FULLSTACK.md`, `resources/INTEGRATION_CATALOG.json`, and `architecture/RESOURCE_INTEGRATION_ARCHITECTURE.md`. Use official APIs/OER/open-source resources only through adapters with license, attribution, privacy, and safety gates.

