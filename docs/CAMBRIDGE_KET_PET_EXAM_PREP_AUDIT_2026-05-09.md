# Cambridge KET/PET Exam Prep Upgrade Audit - 2026-05-09

## Scope

Upgrade Henry Learning OS with a child-facing Cambridge KET/PET preparation module:

- A2 Key / KET: 10 complete original practice sets.
- B1 Preliminary / PET: 10 complete original practice sets.
- Each set includes the official component structure, objective answer keys, explanations, writing/speaking sample answers, listening transcripts, and reusable mistake-review guidance.

## Official Evidence Boundary

Sources checked live on 2026-05-09:

- Cambridge English A2 Key exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/`
- Cambridge English A2 Key preparation/sample tests: `https://www.cambridgeenglish.org/exams-and-tests/key-for-schools/preparation/`
- Cambridge English A2 Key for Schools handbook: `https://www.cambridgeenglish.org/Images/168174-cambridge-english-key-for-schools-handbook-for-teachers.pdf`
- Cambridge English B1 Preliminary exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/`
- Cambridge English B1 Preliminary preparation/sample tests: `https://www.cambridgeenglish.org/exams-and-tests/preliminary-for-schools/preparation/`
- Cambridge English B1 Preliminary for Schools handbook: `https://www.cambridgeenglish.org/Images/168143-cambridge-english-preliminary-for-schools-teachers-handbook.pdf`

The built-in module does not copy official Cambridge question papers, answer keys, handbook pages, or textbook content. Official pages are linked as source evidence and for authorised study. The built-in practice content is original Henry content aligned to the official structure and task intent.

## Format Mapping Implemented

### A2 Key / KET

- Reading and Writing: 7 parts / 32 questions / 1 hour / 50%.
- Listening: 5 parts / 25 questions / about 30 minutes / 25%.
- Speaking: 2 parts / 8-10 minutes per pair / 25%.

### B1 Preliminary / PET

- Reading: 6 parts / 32 questions / 45 minutes / 25%.
- Writing: 2 parts / 2 questions / 45 minutes / 25%.
- Listening: 4 parts / 25 questions / about 30 minutes / 25%.
- Speaking: 4 parts / 10-12 minutes per pair / 25%.

## Repo Artifacts

- Data engine: `src/data/cambridge-exam-prep.ts`
- Child route: `src/app/child/cambridge-exams/page.tsx`
- Dashboard entry: `src/app/child/page.tsx`
- Smoke route: `src/data/ui-smoke-gate.ts`
- Governance tests: `__tests__/cambridge-exam-prep.test.ts`

## Claim Gate

Allowed claim:

- The app now contains 10 KET-style and 10 PET-style original practice sets that match the official Cambridge component/part/question counts, with answer explanations and reusable mistake-review guidance.

Blocked claim:

- Do not claim these are official Cambridge papers.
- Do not claim official exam questions, official answer keys, or copyrighted textbooks are bundled in the app.
- Do not claim learner outcome improvement without longitudinal attempt data.
