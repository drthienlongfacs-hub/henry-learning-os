# MVP Issues

## Issue 1 - App skeleton

Create a Next.js + TypeScript + Tailwind app skeleton.

Acceptance:
- App runs locally.
- Main routes exist.
- Basic layout and navigation exist.
- README has run instructions.

## Issue 2 - Data model and mock store

Implement TypeScript types for:
- ChildProfile
- ParentProfile
- Competency
- MasteryState
- Lesson
- Attempt
- Mistake
- ReviewSchedule
- Reflection
- PortfolioItem
- AIInteractionLog
- SafetyEvent

Acceptance:
- Types compile.
- Mock store has seed data for one child born 2020.

## Issue 3 - Parent onboarding

Build parent onboarding flow to create child profile.

Fields:
- nickname
- birth year
- grade
- pathway
- interests
- safety level

Acceptance:
- Profile saved to mock store.
- Redirect to parent dashboard.

## Issue 4 - Child dashboard

Build child dashboard with today's learning plan.

Acceptance:
- Shows 2-3 recommended activities.
- Has start session button.
- Age-appropriate UI.

## Issue 5 - Lesson session core loop

Implement session flow:
1. Check-in
2. Retrieval question
3. New concept
4. Practice
5. Hint ladder
6. Independent challenge
7. Teach-back/reflection

Acceptance:
- Child must attempt before seeing medium/full hints.
- Session completion creates Attempt and Reflection.

## Issue 6 - Mock AI tutor provider

Build AI provider abstraction and mock provider.

Roles:
- tutor
- classmate
- opponent
- coach
- examiner
- parent_assistant

Acceptance:
- AI responses are deterministic mock responses.
- Support level is tagged.
- Under-13 free chat is blocked.

## Issue 7 - Mistake notebook

When an answer is incorrect, save a Mistake.

Error types:
- concept
- procedure
- calculation
- reading
- vocabulary
- attention
- strategy
- unknown

Acceptance:
- Mistakes appear in notebook.
- Each mistake has correction plan.

## Issue 8 - Spaced review scheduler

Implement review intervals:
- same day
- 1 day
- 3 days
- 7 days
- 21 days
- 60 days

Acceptance:
- Mistakes and flashcards create review items.
- Review queue shows due items.

## Issue 9 - Parent dashboard

Dashboard should show:
- highlight
- concern
- suggested action
- mastery summary
- mistake pattern
- parent mission

Acceptance:
- Data updates after child session.

## Issue 10 - Reading journal

Build reading journal:
- book title
- pages/minutes
- child summary
- new words
- parent note

Acceptance:
- Entry can be created and viewed.

## Issue 11 - Weekly family review

Build weekly review page with guided questions.

Acceptance:
- Shows learning summary.
- Allows parent and child reflections.
- Creates weekly review record.

## Issue 12 - Safety settings and audit

Build safety settings:
- under-13 mode
- no free chat
- parent-visible AI metadata
- external link approval
- max daily learning screen time

Acceptance:
- Free chat blocked for under-13.
- AIInteractionLog is created with role and support level.

## Issue 13 - Tests

Add tests for:
- mastery state update
- review scheduler
- hint access rules
- under-13 AI chat restriction
- mistake classification default behavior

Acceptance:
- Tests pass.

## Issue 14 - E2E happy path

Test:
Parent onboarding -> child dashboard -> lesson session -> wrong answer -> hint -> mistake saved -> review scheduled -> dashboard updated.

Acceptance:
- E2E passes or documented manual verification exists.

## Issue 15 - Documentation

Update README:
- how to run
- architecture
- known limitations
- next steps
- safety notes

Acceptance:
- New developer can run app locally.

## Issue 16 - Adaptive Acceleration Engine

Build the first version of domain-specific adaptive progression.

### Tasks

- Add LearningLevel and SkillState schema.
- Compute Challenge Fit Score from accuracy, hint use, latency, retention, transfer, and engagement.
- Add acceleration_status enum.
- Add recommendation types: compact, enrich, accelerate, consolidate, scaffold.
- Ensure age is not used as a hard academic ceiling.
- Add tests for a child who is advanced in math but typical in writing.

### Acceptance criteria

- If a child scores >95% with low hints and high transfer, the system recommends compact/enrich/accelerate.
- If a child scores <60% with high hints, the system recommends scaffold/consolidate.
- Recommendation includes evidence summary and risk notes.

## Issue 17 - Curriculum Compacting

Reduce needless repetition when mastery is demonstrated.

### Tasks

- Add cluster pre-assessment.
- Mark mastered skills.
- Skip direct instruction for mastered skills.
- Keep delayed review checks.
- Replace saved time with enrichment/project/challenge.

### Acceptance criteria

- Mastered skills do not keep appearing as daily drills.
- Spaced review still checks long-term retention.
- Parent can see why content was skipped.

## Issue 18 - Asynchronous Profile Dashboard

Show parents domain-specific advancement without labeling the child.

### Tasks

- Add asynchronous profile snapshot view.
- Show strengths, typical areas, support areas.
- Show underchallenge and overchallenge risks.
- Use neutral language only.

### Acceptance criteria

- Parent sees "Math reasoning appears ahead; writing stamina is age-typical" rather than "gifted" or "weak".
- Child UI never displays labels such as genius/slow.

## Issue 19 - Owner Capability Track

Build the first version of the six-capability owner/capital/leadership track.

### Tasks

- Add AgencyCapabilityState schema.
- Add parent setting to enable this track.
- Add six capability cards: bilingual, data/probability, systems/policy, finance/assets, persuasion/leadership, ethics/pressure.
- Add 3 sample missions per capability for ages 6-8.
- Add parent-facing explanations that this track is about agency and responsibility, not status or greed.

### Acceptance criteria

- Parent can view the six-capability dashboard.
- Child gets age-appropriate missions only.
- UI never uses status-oriented labels such as rich, powerful, elite, winner, or genius.
- Metrics require evidence, not parent ambition.

## Issue 20 - Decision Lab and Capital Allocation Simulator

Build lightweight decision and money simulation features.

### Tasks

- Add DecisionJournalEntry model.
- Add CapitalAllocationSimulation model.
- Build simple scenarios: spend/save/give, project budget, family mini-business.
- Add before/after reflection.
- Add parent co-learning prompt after each simulation.

### Acceptance criteria

- Child records a decision with options, predicted outcomes, and reflection.
- Simulation distinguishes assets, expenses, cash flow, risk, and responsibility in age-appropriate language.
- Parent dashboard summarizes lessons without gamifying money or status.

## Issue 21 - Pitch, Negotiation, Leadership, and Ethics Under Pressure

Build early versions of ethical persuasion and pressure-resistance practice.

### Tasks

- Add PitchPractice model.
- Add EthicsScenarioAttempt model.
- Build roleplay prompts for asking, listening, pitching, negotiating, and repairing mistakes.
- Add rubric for clarity, evidence, empathy, integrity, and call-to-action.
- Add safety rule: persuasion must not become manipulation.

### Acceptance criteria

- Child can practice a pitch or negotiation with AI.
- AI evaluates both effectiveness and integrity.
- Ethics scenarios escalate to parent review when needed.
