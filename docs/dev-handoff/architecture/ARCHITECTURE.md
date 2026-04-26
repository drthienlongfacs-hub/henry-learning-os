# Technical Architecture

## Recommended MVP stack

- Web app: Next.js, TypeScript, Tailwind, shadcn/ui.
- Mobile later: React Native or Expo.
- Auth and database: Supabase or Firebase.
- Storage: Supabase Storage/Firebase Storage for portfolio files.
- AI: provider-agnostic adapter with safety middleware.
- Analytics: first-party learning event log only.
- Testing: Playwright for E2E, Vitest/Jest for unit tests.

## High-level components

1. Child App
   - Daily plan
   - Lesson session
   - AI tutor UI
   - Reading journal
   - Review cards
   - Portfolio

2. Parent App
   - Dashboard
   - Daily mission
   - Weekly review
   - Safety settings
   - Child profile

3. AI Orchestration Layer
   - Role router: tutor, classmate, opponent, coach, examiner, librarian, project mentor, parent assistant, safety guardian.
   - Prompt templates per age group.
   - Safety classifier.
   - Hint ladder controller.
   - AI interaction logging.

4. Learning Engine
   - Competency graph.
   - Mastery state machine.
   - Spaced repetition scheduler.
   - Mistake classifier.
   - Recommendation engine.

5. Content Engine
   - Lessons.
   - Exercises.
   - Rubrics.
   - Reading lists.
   - Projects.
   - Parent missions.

6. Data Layer
   - User profiles.
   - Attempts.
   - Mistakes.
   - Reviews.
   - Reflections.
   - Portfolio items.
   - Safety events.

## AI request flow

1. UI sends child id, session context, age band, subject, question, and requested role.
2. Safety middleware checks age, allowed mode, sensitive content, and parent restrictions.
3. Role router selects system policy and prompt template.
4. AI response is generated.
5. Response is post-checked for answer-giving, unsafe content, and age appropriateness.
6. Interaction log records: role, support level, subject, risk flags, not full private text unless necessary.
7. Learning engine updates hint dependency and mastery state.

## Mastery state machine

- Not started
- Exposed
- Practicing
- Assisted success
- Independent success
- Retained after delay
- Transfer success
- Mastered
- Needs review

## Security and privacy

- Separate parent and child roles.
- Minimal child data.
- No advertising identifiers.
- Export and delete data.
- All AI features have audit metadata.
- Under-13 AI chat locked to learning sessions.
- Parent approval for external links and publishing portfolio.

## Future architecture

- Local-first cache for offline learning.
- Vector search over child's learning history, with strict privacy.
- Multi-modal tutoring for handwriting/photos.
- On-device models for low-risk classification and flashcards.
- Interoperability with school reports and exam syllabi.

## Adaptive Acceleration Layer

Add a dedicated adaptive engine between learning records and content recommendation.

### Components

1. **Skill Evidence Aggregator**
   - Reads attempts, hint usage, latency, explanations, retention checks, transfer tasks, parent observations.

2. **Challenge Fit Engine**
   - Computes whether current work is too easy, optimal, stretch, or too hard.

3. **Dynamic Level Engine**
   - Selects the next activity based on domain-specific level, not just age/grade.

4. **Curriculum Compactor**
   - Skips or reduces mastered content and replaces it with enrichment, project, or challenge work.

5. **Acceleration Guardrail Service**
   - Prevents unsafe or emotionally excessive acceleration.
   - Requires parent approval for large jumps, sensitive content, or high-demand projects.

6. **Asynchronous Profile Reporter**
   - Generates nuanced parent insights without labeling the child.

### Recommendation loop

attempts + reflections + parent observations -> skill evidence -> challenge fit -> next activity -> AI behavior policy -> review schedule -> parent insight.

## Owner / Capital / Leadership capability services

Add these services after the core learning engine works:

- OwnerCapabilityService: manages six long-term capability states.
- DecisionLabService: records decisions, predictions, outcomes, and reflections.
- CapitalSimulationService: runs age-appropriate money/resource allocation simulations.
- PersuasionLeadershipService: runs pitch, negotiation, and leadership roleplays with integrity rubric.
- EthicsPressureService: runs pressure scenarios and parent review flows.

These services must reuse the same adaptive engine: stretch only when evidence shows readiness, and regress to scaffolding when frustration or shallow understanding appears.
