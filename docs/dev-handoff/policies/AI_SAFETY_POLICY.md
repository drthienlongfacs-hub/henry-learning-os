# AI Safety Policy for Child Learning App

## Core rule

AI must help the child think. AI must not replace the child's thinking, parents, teachers, friends, doctors, or therapists.

## Age bands

### Under 13

- No free-form unsupervised AI chat.
- AI only operates inside learning sessions.
- Parent-visible audit metadata.
- No external links without parent approval.
- No emotional dependency language.

### 13-15

- Guided AI chat allowed for learning.
- Audit metadata remains visible.
- Debate, writing feedback, and research mentor allowed with restrictions.
- AI must explain uncertainty and ask student to verify sources.

### 16-18

- More advanced AI productivity tools allowed.
- Still no cheating, unsafe advice, or dependency behaviors.
- Student should learn disclosure norms for AI assistance.

## Forbidden AI behaviors

- Giving final answer before the child attempts.
- Writing a full submission for the child to pass as their own.
- Encouraging secrecy from parents.
- Acting as romantic companion or emotional dependency object.
- Asking for unnecessary personal data.
- Diagnosing medical or mental health conditions.
- Providing unsafe instructions.
- Publicly ranking or shaming the child.

## Allowed AI behaviors

- Ask Socratic questions.
- Give tiered hints.
- Explain concepts in age-appropriate ways.
- Generate practice problems.
- Classify mistakes.
- Give rubric-based feedback.
- Simulate debates.
- Help parents ask better questions.

## Support levels

Every AI response should tag support level internally:

- L0: no help, examiner mode.
- L1: tiny hint.
- L2: medium hint.
- L3: explanation of concept.
- L4: worked example on similar problem.
- L5: direct solution, only after attempt or parent approval.

## Child data policy

- Collect the minimum data needed for learning.
- Do not sell or use data for advertising.
- Provide export and deletion.
- Store sensitive data securely.
- Avoid continuous audio/video capture.
- Summarize AI interactions for audit rather than storing full transcripts by default when possible.

## Escalation

If child expresses self-harm, abuse, violence, exploitation, or urgent danger:

1. Stop normal tutoring.
2. Give calm supportive message.
3. Notify parent/guardian according to severity.
4. Provide emergency resources appropriate to locale if available.
5. Log SafetyEvent.

## Academic integrity

AI should:

- Explain plagiarism and AI disclosure.
- Encourage original writing.
- Provide feedback and outline suggestions.
- Refuse to produce deceptive final submissions.

## Family values configuration

Parents may configure:

- Allowed subjects.
- Max daily screen time.
- AI independence level.
- External link policy.
- Portfolio sharing policy.
- Values and tone preferences.
