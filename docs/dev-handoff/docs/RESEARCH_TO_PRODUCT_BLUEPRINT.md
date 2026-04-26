# Research-to-Product Blueprint: Long Learning OS

## Executive intent

This app is not a normal tutoring app. It is a **longitudinal learning operating system** for one child first, then extensible to other children later. Its north star is not “finish grade-level content”. Its north star is:

> Help a child become a self-directed, bilingual, data-literate, ethical, resilient creator/owner who can learn faster than school pace when ready, slow down when needed, and build real-world agency without psychological overload.

Age is used for safety, UX, and developmental appropriateness. Age is **not** an academic ceiling.

## Evidence pillars converted into product rules

### 1. Tutoring + mastery learning

**Research basis**: Bloom’s “2 Sigma Problem” showed the power of one-to-one tutoring and mastery learning with formative testing, feedback, corrective work, and parallel tests. Product translation: do not copy “AI answers homework”; build an AI tutor that produces thinking, checks mastery, and corrects misconceptions.

**Product requirements**
- Every lesson has: diagnostic -> teach -> guided practice -> independent attempt -> feedback -> corrective loop -> parallel reassessment.
- AI must use hint ladders before solutions.
- A skill is “mastered” only when the child can answer novel variants and explain reasoning.
- The app records `hint_level`, `attempt_count`, `misconception_type`, and `transfer_success`.

### 2. Spacing, retrieval, and durable memory

**Research basis**: Learning-science reviews consistently find distributed practice and practice testing/retrieval among the most useful learning techniques; many common methods such as rereading and highlighting are weaker when used alone.

**Product requirements**
- Every important concept creates review events at expanding intervals.
- Review starts with retrieval before re-exposure: “Try from memory first.”
- App must distinguish recognition, recall, explanation, and transfer.
- “Already studied” is not a success metric. `retention_after_days` and `transfer_index` are.

### 3. Metacognition and self-regulated learning

**Research basis**: EEF guidance emphasizes teaching pupils to plan, monitor, and evaluate their learning rather than merely completing tasks.

**Product requirements**
- Every session ends with a micro-reflection: “What did I learn? Where did I get stuck? What will I try next?”
- App has planning tools but child gradually takes over planning.
- Parent dashboard shows self-regulation signals, not only scores.
- AI coach must teach strategy selection: draw a model, make a table, explain aloud, test a simpler case, etc.

### 4. Adaptive acceleration and curriculum compacting

**Research basis**: Academic acceleration and curriculum compacting are research-backed responses for advanced learners; repeated work on already-mastered material can waste time and reduce motivation.

**Product requirements**
- Never force age-grade repetition if data shows mastery.
- Compact content when the child demonstrates: high accuracy, low hint dependence, fast acquisition, good retention, and transfer.
- Acceleration is domain-specific: advanced math does not imply advanced writing, emotional maturity, or social judgment.
- The app must maintain an **asynchronous profile**.

### 5. Child-safe, human-centered AI

**Research basis**: UNESCO and UNICEF emphasize data privacy, age-appropriate AI interaction, child rights, transparency, and human agency.

**Product requirements**
- Under 13: no unconstrained open-ended AI chat. Use bounded lesson modes and parent-visible logs.
- AI must not create emotional dependency.
- AI must not facilitate cheating or produce work to submit as the child’s own.
- Parent control, audit logs, data minimization, and deletion must be first-class features.

### 6. Transferable skills and future-readiness

**Research basis**: National Academies and WEF emphasize critical thinking, communication, collaboration, learning to learn, resilience, leadership, AI/data literacy, and creative thinking.

**Product requirements**
- The app should not optimize only exam scores.
- Every module should include at least one transfer task: explain, apply, teach, build, debate, decide, or create.
- Longitudinal portfolio is a primary artifact.

## The “do better than existing apps” principle

Do not clone the best apps. Combine their strongest patterns while correcting their weaknesses:

- From Khanmigo: Socratic tutoring without direct answers.
- From Duolingo: habit loops, roleplay, bite-sized practice.
- From Anki/Quizlet: memory scheduling and flashcards.
- From Brilliant: interactive problem solving.
- From Scratch/Code.org: creation-first computing.
- From iCivics: simulation-based civics.
- From Seesaw/portfolio patterns: evidence of growth.

But go beyond them by integrating:
- Vietnamese + English bilingual depth.
- Parent co-learning.
- Adaptive acceleration.
- Owner/capital allocator/leadership track.
- Whole-child metrics.
- Safety-by-design for a single child first.

## Non-negotiable product principles

1. **No age ceiling**: age gates safety, not capability.
2. **No answer vending machine**: AI increases thinking, not dependence.
3. **No vanity data**: track mastery, transfer, retention, agency, not minutes alone.
4. **No overload**: accelerate only if challenge-fit remains healthy.
5. **No moral vacuum**: finance, leadership, AI, persuasion, and power must include ethics.
6. **No school dependency**: school is one input; family learning OS is the core.
7. **No one-size-fits-all gifted label**: use domain-by-domain evidence.
