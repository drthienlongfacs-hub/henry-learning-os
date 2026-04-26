# Adaptive Acceleration Specification

## 1. Why this exists

The app must never assume that a six-year-old can only think like an average six-year-old. Chronological age is a safety and UX constraint, not an academic ceiling. The system should discover the child's real capability, including advanced reasoning, unusual curiosity, fast abstraction, deep memory, creativity, and asynchronous development.

Core principle: **meet the child at the edge of capability, not at the label of age.**

The app should support acceleration when evidence shows readiness, while preventing two failure modes:

1. Too easy -> boredom, disengagement, learned underachievement.
2. Too hard -> frustration, anxiety, avoidance.

The correct target is a dynamic learning zone: challenging enough to stretch, supported enough to succeed.

## 2. Design doctrine

### 2.1 Age is a guardrail, not the curriculum

Use age for:

- child safety and privacy rules;
- interface complexity;
- emotional tone;
- session length defaults;
- parent approval thresholds;
- content appropriateness.

Do not use age as a hard academic cap. A child may be age 6 in reading level, age 8 in math reasoning, age 10 in astronomy interest, age 5 in fine motor writing, and age 7 in emotional regulation. The app must model this profile as normal, not anomalous.

### 2.2 Ability-based progression

Each domain uses a separate progression engine:

- Vietnamese reading
- Vietnamese writing
- Math reasoning
- English listening/speaking
- English reading/writing
- Science reasoning
- Coding/AI literacy
- Life skills
- Emotional/social development
- Physical habits
- Projects and creativity

A child can accelerate in one domain without being pushed globally in all domains.

### 2.3 Acceleration is earned by evidence

The app may unlock higher-level material only when the evidence supports it:

- high independent accuracy;
- low hint dependency;
- strong retention after delay;
- ability to explain;
- ability to transfer to novel problems;
- healthy emotional response to challenge;
- parent observation consistent with app data.

## 3. Evidence-informed learning model

### 3.1 Zone of Proximal Development model

The system should approximate the child's zone of proximal development (ZPD): what the child can do with targeted scaffolding but not yet fully independently. NWEA describes ZPD as the difference between what a student can do independently and what they can do with targeted assistance. The app should place most instructional work in this zone, with some easier retrieval and some harder exploration.

Operational target:

- 15-25% easy retrieval to maintain fluency and confidence.
- 55-70% ZPD work with scaffolding.
- 10-20% stretch/exploration work above current mastery.
- 0-5% challenge spikes for gifted/advanced exploration, only if the child responds well.

### 3.2 Productive difficulty

The app should target a success rate that feels effortful but not punishing.

Suggested adaptive targets:

- Independent practice: 75-90% success.
- Guided practice: 60-85% success with hints.
- Stretch tasks: 40-70% success, but with emotional safety and quick recovery.
- Mastery check: 85-95% success, no hints.

If success is above 95% for two sessions, increase level or reduce repetition.
If success is below 60% with high frustration, reduce step size or add scaffolding.

### 3.3 Spacing and retrieval

The app should use spaced retrieval, but not endless repetition. Reviews should be adapted to evidence:

- If recall is fast and confident, extend interval.
- If recall is correct but slow, keep moderate interval.
- If recall is wrong or hint-dependent, shorten interval and add explanation.
- If repeated mastery is stable, retire or convert to occasional maintenance.

Spaced repetition should support transfer, not rote learning only. Include varied examples and novel contexts.

### 3.4 Metacognition and self-regulation

The app should teach the child to plan, monitor, and evaluate learning. This is a skill, not a trait. The app should ask simple reflection questions:

- What was easy?
- What was hard?
- What strategy worked?
- What will you try next time?

As the child grows, reflections become more sophisticated.

### 3.5 Giftedness and advanced readiness

The app must support advanced learners without forcing them into adult-like expectations. Academic acceleration can be appropriate when supported by data, but social-emotional development, motivation, and family context must be considered.

Acceleration types supported:

- compacting: skip already-mastered practice;
- subject acceleration: move ahead in one domain;
- enrichment: go deeper/wider without moving grade labels;
- telescoping: complete a sequence faster;
- mentorship/project acceleration: advanced project with support;
- early exposure: age-appropriate introduction to advanced ideas.

## 4. Dynamic Level Engine

### 4.1 Core concept

Every skill has a `LearningLevel`, independent of age and grade.

A level has:

- prerequisite skills;
- concept description;
- examples;
- common misconceptions;
- assessment tasks;
- transfer tasks;
- review schedule;
- content safety rating;
- cognitive demand rating;
- emotional demand rating;
- parent approval requirement.

### 4.2 Skill state

Each child-skill pair has:

- `exposure_count`
- `independent_accuracy`
- `guided_accuracy`
- `hint_dependency`
- `response_latency`
- `explanation_quality`
- `retention_score`
- `transfer_score`
- `frustration_signal`
- `boredom_signal`
- `parent_observation_score`
- `current_level`
- `recommended_next_level`
- `acceleration_status`

### 4.3 Acceleration status

Possible values:

- `foundation_needed`
- `on_track`
- `ready_for_stretch`
- `ready_for_acceleration`
- `accelerating`
- `needs_consolidation`
- `overchallenged`
- `underchallenged`
- `asynchronous_profile_detected`

## 5. Level advancement algorithm

### 5.1 Promotion rules

A skill may advance when all are true:

- independent accuracy >= 85% on recent mastery check;
- hint dependency <= 20%;
- retention score >= 80% after at least one delayed review;
- explanation quality >= target for age/interface mode;
- transfer score >= 70%;
- frustration signal is low or moderate and recoverable.

A skill may accelerate faster when:

- independent accuracy >= 95% across two sessions;
- hint dependency <= 10%;
- child self-reports boredom or parent observes boredom;
- transfer score >= 85%;
- child can teach back clearly;
- no safety/emotional concerns.

### 5.2 Slowdown rules

The system should slow down, scaffold, or consolidate when:

- accuracy < 60% even with support;
- hint dependency > 60%;
- repeated negative affect/frustration;
- child avoids the domain;
- parent reports stress;
- retention collapses after delay;
- child can solve patterns but cannot explain.

### 5.3 Boredom detection

Signals:

- very fast correct answers;
- repeated skipping;
- low engagement despite high accuracy;
- child says it is too easy;
- parent observes daydreaming or resistance to repetitive tasks;
- no mistakes across multiple sessions.

Action:

- reduce repetition;
- compact curriculum;
- offer a harder variant;
- offer an enrichment project;
- ask child to create a problem for AI/parent.

### 5.4 Frustration detection

Signals:

- repeated wrong answers;
- long pauses;
- negative language;
- abandoning task;
- repeated request for full answer;
- parent observation;
- voice or interaction cues if consented and implemented safely.

Action:

- split problem into smaller steps;
- switch to concrete/visual mode;
- reduce session length;
- use easier retrieval for confidence;
- ask parent to co-learn;
- avoid labeling the child as weak.

## 6. Curriculum compacting

When a child demonstrates mastery, the app should skip unnecessary repetitions.

Compacting workflow:

1. Pre-assess a cluster.
2. Identify mastered skills.
3. Skip or minimize direct instruction for mastered skills.
4. Keep only delayed review checks.
5. Replace saved time with:
   - harder problem solving;
   - enrichment;
   - project;
   - reading;
   - creative output;
   - physical/offline task.

This is critical to avoid making advanced children spend months on content they already understand.

## 7. Stretch Ladder

For each concept, provide six layers:

1. Foundation: can recognize and perform simple task.
2. Fluency: can perform accurately and efficiently.
3. Explanation: can explain why it works.
4. Transfer: can apply to a new situation.
5. Creation: can create a new problem/example/project.
6. Teaching/Opposition: can teach someone else or defeat a plausible wrong argument.

A six-year-old who reaches Layer 5 or 6 in a topic should be allowed to explore above-grade concepts, but with age-appropriate interface and emotional framing.

## 8. AI behavior changes

### 8.1 Never patronize by age

Bad:
> You are only six, so this is too hard for you.

Good:
> This is a bigger idea. Let's test it with a small example first. If it feels good, we can go deeper.

### 8.2 Use adaptive challenge language

- "This looks too easy for you. Want a challenge version?"
- "You solved that fast and explained it clearly. I will skip the easy repeats."
- "This is a stretch problem. Getting stuck is expected."
- "Your brain is building a new path. Let's make the step smaller."

### 8.3 Offer optional depth

At the end of a lesson:

- Quick finish
- Practice more
- Challenge me
- Show me a real-world use
- Let me teach this to AI
- Build a mini-project

## 9. Parent dashboard changes

The parent dashboard should show:

- domains where child is ahead;
- domains where child is asynchronous;
- underchallenge risk;
- overchallenge risk;
- recommended acceleration/enrichment;
- suggested offline support;
- warning if parent expectations are becoming too high.

Example parent insight:

> Math reasoning appears 18-24 months ahead of grade expectation, but writing stamina is age-typical. Recommendation: accelerate math through problem solving and projects; do not increase handwriting load proportionally.

## 10. Data-driven personalization metrics

### 10.1 Challenge Fit Score

A 0-100 score estimating whether the current task is too easy, just-right, or too hard.

Inputs:

- recent accuracy;
- hint use;
- response time;
- retention;
- transfer;
- affect/engagement;
- child choice;
- parent observation.

Bands:

- 0-35: too hard or poorly scaffolded.
- 36-55: hard stretch; use carefully.
- 56-80: optimal ZPD.
- 81-100: too easy or mastered; compact/accelerate.

### 10.2 Learning Velocity

How fast the child moves from first exposure to independent transfer.

Used to:

- detect advanced readiness;
- shorten repetitive drills;
- choose next depth layer;
- forecast review intervals.

### 10.3 Hint Dependency Index

Percent and depth of hints used to solve problems.

High accuracy + high hints != mastery.

### 10.4 Transfer Index

Ability to solve novel variants. This protects against rote pattern learning.

### 10.5 Retention Half-Life

Estimated interval before forgetting begins for each skill. Used to schedule review adaptively.

## 11. Anti-labeling policy

The app must not label the child as "gifted", "genius", "slow", or "weak" in the child UI.

Use neutral language:

- current level;
- ready for stretch;
- needs consolidation;
- strong interest;
- fast progress;
- needs a smaller step.

Parent UI may show advanced readiness indicators but should include caution:

- acceleration should be domain-specific;
- emotional health matters;
- avoid pressure and identity fixation.

## 12. Acceptance criteria

A developer implementation satisfies this spec if:

1. The child can advance above nominal age/grade in a domain.
2. The app can compact mastered material.
3. The app detects underchallenge and overchallenge.
4. The AI uses adaptive challenge language.
5. Parent dashboard shows domain-specific advancement without labeling the child.
6. Review intervals adapt to retention and difficulty.
7. The system supports asynchronous profiles across domains.
8. There are safety rules preventing adult content or emotionally excessive pressure.

