# Antigravity Mission Prompt

You are an autonomous development agent working inside Google Antigravity. Build a private MVP of Long Learning OS for one family and one child.

Use the documents in this repo as product source of truth. Start by reading:

1. README.md
2. docs/PRD.md
3. docs/FEATURE_SPEC.md
4. policies/AI_SAFETY_POLICY.md
5. architecture/ARCHITECTURE.md
6. schemas/DATA_MODEL.md
7. issues/MVP_ISSUES.md

## Mission

Create a working MVP web app that lets a parent create a child profile, assign or generate a daily learning session, let the child complete a guided AI tutoring session, record mistakes, schedule review, and show a parent dashboard.

## Required development style

1. Plan first. Produce a task list artifact before coding.
2. Implement in small increments.
3. Verify each feature with tests or manual browser checks.
4. Create artifacts after major steps: architecture plan, UI screenshots, test results, safety check results.
5. Do not overbuild advanced modules before the core loop works.

## Preferred stack

- Next.js + TypeScript.
- Tailwind + shadcn/ui.
- Supabase-compatible data access abstraction, but allow local mock storage for MVP.
- AI provider abstraction with mock provider first.
- Playwright or equivalent for E2E.

## MVP features to build

1. Landing page: parent-oriented, explains purpose.
2. Parent onboarding: create child profile.
3. Child dashboard: today plan.
4. Lesson session:
   - subject
   - objective
   - retrieval question
   - guided practice
   - hint ladder
   - teach-back/reflection
5. AI tutor panel:
   - mock AI responses for first version
   - role metadata: tutor/classmate/opponent/coach/examiner
   - support level metadata
6. Mistake notebook:
   - save errors
   - classify type
   - create review item
7. Spaced review list.
8. Parent dashboard:
   - highlight
   - concern
   - suggested action
   - mastery summary
   - mistake patterns
9. Safety settings:
   - under-13 mode on by default
   - no free chat
   - parent visibility
10. Weekly review page.

## Critical AI safety behavior

- Never build a generic open chatbot for the child.
- AI interactions must be inside structured learning roles.
- Direct answer is not allowed before child attempt.
- For writing tasks, AI gives feedback and outline but not final submission.

## Initial implementation recommendation

Build with local JSON/mock DB first, then leave clear TODOs for Supabase/Firebase integration.

## Acceptance tests

- Parent can create child profile.
- Child can start a Math session.
- Child attempts answer before hint is available.
- Hint level is recorded.
- Mistake is saved and appears in notebook.
- Review is scheduled.
- Parent dashboard shows summary.
- Under-13 setting blocks free chat.

## Final output expected

- Working app.
- README with run instructions.
- Test results.
- Screenshots/artifacts.
- List of limitations and next steps.

## Additional mission update - adaptive acceleration

The app must support a child who is far ahead of age expectations in one domain. Do not build a rigid age-grade app. Implement the adaptive acceleration spec in `docs/ADAPTIVE_ACCELERATION_SPEC.md`.

Priority additions:

1. Create domain-specific skill levels independent of age.
2. Implement Challenge Fit Score and acceleration_status.
3. Allow curriculum compacting when mastery is proven.
4. Detect boredom/underchallenge and frustration/overchallenge.
5. Generate parent recommendations with evidence and risk notes.
6. Keep age as safety/UX/content-appropriateness guardrail, not academic ceiling.

Use neutral language. Do not call the child genius/slow. Let data drive progression.

Additional mission requirement:
Read `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md` before implementing roadmap items beyond the core MVP. The app must include a long-term six-capability track for agency, ownership, capital allocation, leadership, institutional thinking, and ethical pressure tolerance. Do not implement this as a wealth/status game. Implement it as age-appropriate, evidence-driven capability development with parent oversight.

## Resource Full-Stack Layer

Before implementing module integrations, read `RESOURCE_FULLSTACK_UPGRADE_INDEX.md`, `resources/RESOURCE_BENCHMARK_FULLSTACK.md`, `resources/INTEGRATION_CATALOG.json`, and `architecture/RESOURCE_INTEGRATION_ARCHITECTURE.md`. Use official APIs/OER/open-source resources only through adapters with license, attribution, privacy, and safety gates.

