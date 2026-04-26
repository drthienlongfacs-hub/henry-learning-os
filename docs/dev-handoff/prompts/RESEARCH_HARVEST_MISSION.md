# Research-Harvest Mission Prompt for Antigravity / Codex

You are building Long Learning OS for a real child. Do not build a generic edtech app. Your task is to translate the research-backed handoff into a working MVP.

## Mission
Build a family-first, AI-assisted, data-driven learning app that helps a child become a self-directed learner and future creator/owner/leader. Age is not a ceiling. Use age only for UX and safety.

## Required reading before coding
1. `docs/RESEARCH_TO_PRODUCT_BLUEPRINT.md`
2. `docs/DEEP_MODULE_SPECS.md`
3. `docs/OWNER_TRACK_DEEP_DIVE.md`
4. `schemas/METRICS_AND_ADAPTIVE_MODEL.md`
5. `architecture/AI_AGENT_BEHAVIOR_SPEC.md`
6. `policies/AI_SAFETY_POLICY.md`
7. `issues/DEEP_RESEARCH_BACKLOG.md`
8. `docs/SOURCE_REGISTRY.json`

## Implementation priorities
1. Build data model for child profile, skill, attempt, mastery, review, parent observation, portfolio artifact.
2. Implement Challenge Fit Score and mastery state.
3. Implement a Socratic TutorAgent with hint ladder.
4. Implement memory scheduling.
5. Implement parent dashboard and weekly review.
6. Implement first three learning domains: math, bilingual reading/writing, English roleplay.
7. Add Owner Track prototypes: capital allocation simulator, pitch lab, ethics scenario.

## Non-negotiables
- Do not give children direct answers by default.
- Do not optimize for screen time.
- Do not label the child globally as gifted/weak.
- Do not create social media features.
- Do not store unnecessary sensitive data.
- Every adaptive decision must be logged with evidence.
- Every AI interaction must have safety mode and audit metadata.

## Definition of done for any feature
A feature is complete only if it includes:
- UX flow
- data events
- scoring/metrics
- AI behavior policy if AI is used
- parent visibility if child data is involved
- tests for core logic
- source/evidence note in documentation

## Start here
Implement Epic B1, C1, and E1 first:
- Challenge Fit Score
- TutorAgent hint ladder
- Daily parent mission

Then build vertical slice:
- one math skill
- one Vietnamese reading skill
- one English speaking roleplay
- one parent report
- one portfolio artifact
