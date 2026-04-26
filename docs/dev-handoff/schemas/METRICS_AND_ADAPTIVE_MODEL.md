# Metrics and Adaptive Learning Data Model

## Core philosophy

The system must be **real evidence-based** and **real data-driven**, but data must serve the child, not pressure the child. The app should infer readiness from behavior and evidence, not from age labels or parental ambition.

## Main computed indices

### Challenge Fit Score

Purpose: keep learning in the optimal challenge zone.

Inputs:
- accuracy
- time-on-task relative to item difficulty
- hint level used
- affect/energy check-in
- persistence after error
- retry success
- retention and transfer

Interpretation:
- 0-30: too hard / high overload risk
- 31-55: needs scaffold
- 56-80: good ZPD/stretch zone
- 81-100: too easy / compact or enrich

### Learning Velocity

How quickly the child moves from first exposure to stable independent performance.

Inputs:
- number of exposures to mastery
- number of attempts
- hint decline over time
- retention after review intervals

### Hint Dependency Index

Measures whether the child is becoming independent or relying on AI.

High risk pattern:
- high accuracy but high hint use
- frequent “show me answer” behavior
- inability to solve parallel item independently

### Transfer Index

Measures whether knowledge applies beyond practiced items.

Tasks:
- near transfer: similar problem, changed numbers
- medium transfer: same concept, different story/context
- far transfer: real-life/project/debate/design task

### Retention Half-Life

Estimates how long a memory remains retrievable without review.

Use cases:
- schedule reviews
- detect fragile learning
- prevent over-review of mastered items

### Asynchronous Development Profile

The child’s map by domain:
- Math reasoning
- Vietnamese reading/writing
- English listening/speaking/reading/writing
- Science/data/AI
- Coding/creation
- SEL/executive function
- Finance/capital reasoning
- Leadership/oracy
- Physical/health routines

Each domain can have a different level, velocity, and support need.

## Event schema extensions

### LearningAttempt
- `id`
- `child_id`
- `skill_id`
- `item_id`
- `difficulty_estimate`
- `response`
- `is_correct`
- `time_seconds`
- `hint_levels_used`
- `misconception_type`
- `confidence_self_rating`
- `energy_self_rating`
- `ai_support_mode`
- `created_at`

### MasteryState
- `child_id`
- `skill_id`
- `current_level`
- `mastery_probability`
- `last_independent_success_at`
- `last_transfer_success_at`
- `retention_half_life_days`
- `next_review_at`
- `challenge_fit_score`
- `compactable_boolean`
- `stretch_ready_boolean`

### PortfolioArtifact
- `child_id`
- `artifact_type`
- `domain_tags`
- `skill_tags`
- `rubric_scores`
- `revision_count`
- `reflection_text`
- `parent_feedback`
- `export_ready_boolean`

### ParentObservation
- `child_id`
- `domain`
- `observation_type`
- `note`
- `energy_context`
- `stress_context`
- `created_at`

### SafetyEvent
- `child_id`
- `severity`
- `category`
- `trigger_text_summary`
- `action_taken`
- `parent_notified_boolean`
- `created_at`

## Decision rules

### Compact curriculum when
- accuracy >= 90% on multiple variants
- hint dependency low
- transfer index adequate
- retention stable
- child reports boredom or low challenge

### Stretch when
- skill is compactable
- child shows curiosity or fast learning velocity
- parent approves if large jump
- emotional/energy signals are stable

### Consolidate when
- accuracy inconsistent
- hints high
- child cannot explain
- retention drops
- frustration increases

### Stop or slow when
- repeated overload signs
- shame/avoidance language appears
- parent observes fatigue or resentment
- learning becomes performance pressure rather than curiosity

## Anti-vanity metrics

Do not optimize for:
- time spent alone
- streak alone
- number of lessons completed alone
- score without transfer
- parent satisfaction without child wellbeing

Prefer:
- independent retry success
- depth of explanation
- durable recall
- project artifacts
- self-regulation
- ethical reasoning
- parent-child learning quality
