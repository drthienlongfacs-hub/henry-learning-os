# AGENTS.md

This repo is for building Long Learning OS, a private learning app for one child and family.

## Source of truth

Read before coding:

1. README.md
2. docs/PRD.md
3. policies/AI_SAFETY_POLICY.md
4. architecture/ARCHITECTURE.md
5. schemas/DATA_MODEL.md
6. issues/MVP_ISSUES.md

## Development rules

- Keep MVP focused on the core learning loop.
- Build mock AI provider first.
- Never create unrestricted child chatbot.
- Under-13 mode is default.
- AI responses must record role and support level.
- Direct answer before attempt is not allowed.
- Prefer small, testable functions.
- Add tests for safety and learning engine.

## Code style

- TypeScript strict mode.
- Components should be simple and accessible.
- Use clear naming.
- Keep business logic outside UI components where possible.

## Safety

Any feature involving AI, chat, user-generated content, external links, audio/video, or child data must be checked against policies/AI_SAFETY_POLICY.md.

## Adaptive acceleration requirement

Do not implement age as a hard learning ceiling. Age may control UX, safety, privacy, and content appropriateness only. Learning progression must be domain-specific and evidence-based.

Before adding any lesson recommendation logic, implement or stub:

- Challenge Fit Score
- Learning Velocity
- Hint Dependency Index
- Transfer Index
- Retention Half-Life
- AccelerationRecommendation
- Curriculum compacting

AI behavior must avoid patronizing language such as "you are too young for this". Use adaptive language: "This is a stretch idea; let's try a smaller example first." See `docs/ADAPTIVE_ACCELERATION_SPEC.md`.

Additional mission requirement:
Read `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md` before implementing roadmap items beyond the core MVP. The app must include a long-term six-capability track for agency, ownership, capital allocation, leadership, institutional thinking, and ethical pressure tolerance. Do not implement this as a wealth/status game. Implement it as age-appropriate, evidence-driven capability development with parent oversight.

## Deep research rules for coding agents

- Read `docs/RESEARCH_TO_PRODUCT_BLUEPRINT.md` before modifying learning logic.
- Do not implement features that only display content; implement evidence loops: diagnostic, attempt, feedback, correction, reassessment, memory schedule, parent summary.
- Use `docs/KEYWORD_TAXONOMY.md` for naming schemas, tags, tests, and content categories.
- Use `schemas/METRICS_AND_ADAPTIVE_MODEL.md` for adaptive progression logic.
- Use `architecture/AI_AGENT_BEHAVIOR_SPEC.md` for AI tutor/classmate/opponent/coach behavior.
- Any new child-facing AI feature must update `policies/AI_SAFETY_POLICY.md` if safety assumptions change.
- Age is a safety and UX input, not an academic ceiling.
- Prefer domain-specific readiness, reversible acceleration, and curriculum compacting over fixed grade pacing.

## Resource Full-Stack Layer

Before implementing module integrations, read `RESOURCE_FULLSTACK_UPGRADE_INDEX.md`, `resources/RESOURCE_BENCHMARK_FULLSTACK.md`, `resources/INTEGRATION_CATALOG.json`, and `architecture/RESOURCE_INTEGRATION_ARCHITECTURE.md`. Use official APIs/OER/open-source resources only through adapters with license, attribution, privacy, and safety gates.

