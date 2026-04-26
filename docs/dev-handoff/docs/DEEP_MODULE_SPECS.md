# Deep Module Specifications

This file decomposes Long Learning OS into product modules. Each module includes: purpose, evidence base, benchmark patterns, feature requirements, data/metrics, AI behaviors, and implementation keywords.

## Module 1 — Dynamic Ability & Acceleration Engine

### Purpose
Detect what the child can actually do, not what age says he should do. Accelerate when ready, consolidate when fragile, enrich when bored, and scaffold when overloaded.

### Evidence/benchmark base
- Zone of proximal development and scaffolding: optimal learning occurs in a zone where the learner can succeed with support.
- Academic acceleration and curriculum compacting: advanced learners benefit when already-mastered material is skipped or replaced with deeper work.
- Adaptive apps benchmark: Khan Academy mastery, Prodigy adaptive practice, Brilliant interactive challenge.

### Features
- Domain-specific diagnostic baselines.
- `Challenge Fit Score` computed from accuracy, response time, hint use, affect, retention, and transfer.
- Automatic compacting: if mastery is high, skip repetitive drills and unlock stretch tasks.
- Asynchronous profile: e.g., math 2 years ahead, English speaking age-level, handwriting age-level.
- “Stretch but safe” mode with parent visibility.
- Regression detection: if retention drops, reinsert review.

### Metrics
`challenge_fit_score`, `learning_velocity`, `hint_dependency_index`, `retention_half_life`, `transfer_index`, `boredom_risk`, `overload_risk`, `domain_level_estimate`.

### AI behavior
- Never say “you are gifted/genius” as identity.
- Say: “This skill looks ready for stretch” or “This skill needs consolidation.”
- Acceleration decisions must be data-backed and reversible.

## Module 2 — Socratic AI Tutor

### Purpose
Approximate the best properties of one-to-one tutoring while preventing answer-dependence.

### Benchmark
Khanmigo publicly emphasizes guiding learners to think critically and solve problems without giving direct answers.

### Features
- Hint ladder: nudge -> concept reminder -> example -> partial step -> worked example -> parallel problem.
- Misconception classifier.
- Teach-back requirement.
- Multi-modal explanations: story, visual, formal, analogy, real-world use.
- Parent summary: “What helped him learn?” not just “what score?”

### Metrics
`first_attempt_accuracy`, `hint_level_max`, `misconception_type`, `explanation_quality`, `parallel_test_success`, `independent_retry_success`.

## Module 3 — Memory & Retrieval Engine

### Purpose
Turn learning into durable memory and flexible recall.

### Benchmark
Anki/Quizlet style flashcards, but with understanding checks and transfer tasks.

### Features
- Auto-generated flashcards requiring child approval.
- Review scheduling by forgetting risk.
- Retrieval-first review.
- Mixed practice/interleaving.
- “Explain without looking” and “create your own example”.

### Metrics
`recall_success`, `recognition_success`, `explanation_success`, `review_interval`, `forgetting_risk`, `item_quality_score`.

## Module 4 — Bilingual Literacy Studio

### Purpose
Build Vietnamese depth and English global operating ability.

### Features
- Reading ladder with Vietnamese and English texts.
- Domain vocabulary decks.
- Oral explanation recording and rubric feedback.
- Translation-as-thinking tasks.
- CEFR-aligned English progression.
- Vietnamese academic writing progression: sentence -> paragraph -> argument -> report -> essay.

### Metrics
`reading_comprehension`, `retell_accuracy`, `inference_score`, `argument_structure`, `vocabulary_depth`, `cefr_estimate`, `bilingual_transfer_score`.

## Module 5 — Math, Probability & Data Lab

### Purpose
Build the reasoning substrate for AI, investing, science, business, and strategy.

### Features
- Visual math manipulatives.
- “Find the mistake” tasks.
- Data collection from family life.
- Probability simulator.
- Expected value games.
- Graph interpretation and misleading chart detection.
- AI/data ethics mini-cases.

### Metrics
`reasoning_steps_valid`, `estimation_error`, `probability_intuition`, `data_question_quality`, `graph_literacy`, `expected_value_reasoning`, `model_bias_detection`.

## Module 6 — Civic, History, Law & Geopolitics Lab

### Purpose
Teach the child to understand systems, institutions, rules, incentives, history, and power without ideological indoctrination.

### Features
- Inquiry arcs: question -> sources -> evidence -> claim -> action.
- Map room for geography/resource/supply chain analysis.
- Law/rule simulator from family rules to constitutions.
- Civic online reasoning: lateral reading, source credibility, claim checking.
- Policy tradeoff simulator.

### Metrics
`source_credibility_score`, `historical_causality`, `stakeholder_map_quality`, `tradeoff_reasoning`, `geography_reasoning`, `evidence_claim_alignment`.

## Module 7 — Finance, Accounting & Capital Allocation Lab

### Purpose
Build resource thinking: time, money, attention, assets, relationships, and reputation.

### Features
- Allowance ledger.
- Needs/wants/goals.
- Simple accounting games.
- Business simulation.
- Capital allocation simulator.
- Risk, scams, leverage, bubbles, fraud caselets.
- Giving/stewardship prompts.

### Metrics
`cashflow_accuracy`, `needs_wants_classification`, `asset_liability_understanding`, `compound_growth_intuition`, `risk_assessment`, `allocation_rationale`, `ethics_in_finance_score`.

## Module 8 — Founder, Sales, Negotiation & Leadership Studio

### Purpose
Develop the capacity to create value with and through people.

### Features
- Pitch lab.
- Customer discovery scripts.
- Negotiation role-plays.
- Team project roles.
- Feedback practice.
- Conflict repair scripts.
- Ethical persuasion flags.

### Metrics
`clarity`, `audience_fit`, `evidence_use`, `listening_score`, `interest_mapping`, `conflict_resolution`, `ethical_persuasion`, `leadership_debrief_quality`.

## Module 9 — Coding, AI Literacy & Digital Creation

### Purpose
Make the child a builder, not only a consumer.

### Benchmark
Scratch/ScratchJr for creative coding; Code.org for K–12 CS/AI; Brilliant for data/AI interactive learning.

### Features
- ScratchJr/Scratch-inspired creative blocks.
- Python notebook later.
- AI concept cards: data, model, training, hallucination, bias, privacy.
- Build real tools: quiz app, reading tracker, allowance tracker.
- Safe sandbox: no public publishing by default.

### Metrics
`algorithmic_thinking`, `debugging_strategy`, `project_completion`, `iteration_count`, `AI_concept_mastery`, `privacy_decision_score`.

## Module 10 — SEL, Executive Function & Ethics Under Pressure

### Purpose
Build internal governance so accelerated ability does not outpace maturity.

### Benchmark/research
CASEL 5, Harvard executive function guide, OECD agency/responsibility, child-centered AI principles.

### Features
- Emotion check-in.
- Executive function games.
- Failure/recovery reflection.
- Ethics scenario simulator.
- Digital integrity lab.
- Responsibility ladder.

### Metrics
`emotion_labeling`, `planning_followthrough`, `delay_of_gratification`, `reflection_depth`, `ethical_reasoning`, `recovery_after_failure`, `responsibility_quality`.

## Module 11 — Parent Co-Learning OS

### Purpose
Convert parents from homework police into mentors, coaches, and co-learners.

### Features
- 10-minute parent mission.
- Weekly review agenda.
- Parent scripts: ask, listen, scaffold, praise effort/strategy, not identity.
- Family media plan.
- Parent evidence feed: what works and why.
- “Do not overhelp” warnings.

### Metrics
`parent_child_learning_minutes`, `question_quality`, `child_explains_to_parent`, `parent_overhelp_risk`, `family_project_completion`, `weekly_review_consistency`.

## Module 12 — Portfolio & Longitudinal Growth Record

### Purpose
Create a 12-year evidence archive of growth, not only grades.

### Features
- Artifact storage: writing, voice, video, projects, code, experiments.
- Reflection attached to artifact.
- Skill tags and evidence links.
- Growth timeline.
- Exportable portfolio for scholarship, school, mentorship.

### Metrics
`artifact_count_by_domain`, `artifact_quality_rubric`, `revision_depth`, `cross_domain_project_count`, `reflection_depth`, `mentor_feedback_score`.
