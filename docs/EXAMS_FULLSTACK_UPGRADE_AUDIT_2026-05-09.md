# Exams Full-Stack Upgrade Audit - 2026-05-09

## Scope

Route upgraded: `/child/exams/`

Goal: make the child exam module useful for long-term Cambridge-style preparation while staying evidence-based and copyright-safe for a private family app.

## Evidence Boundary

Official sources checked on 2026-05-09:

- Pre A1 Starters exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/starters/format/`
- A1 Movers exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/movers/format/`
- A2 Flyers exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/flyers/format/`
- A2 Key for Schools and A2 Key exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/`
- B1 Preliminary for Schools and B1 Preliminary exam format: `https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/`
- Cambridge English candidate regulations, updated April 2026: `https://support.cambridgeenglish.org/hc/en-gb/articles/202842836-Summary-Regulations-for-Candidates`

Cambridge's regulations state that question papers and exam material are copyrighted and must not be shared or distributed. Therefore the app must not bundle copied official papers, leaked papers, or official answer keys. It can:

- link to official Cambridge sample/preparation pages;
- match official structure, component counts, part counts, and question counts;
- provide original Henry practice content;
- allow privately owned/licensed PDFs to be imported locally through the existing local textbook/library flow.

## Implemented

- Added source-of-truth framework: `src/data/cambridge-official-framework.ts`
- Added 10 complete original practice sets for each supported level:
  - Starters
  - Movers
  - Flyers
  - KET / A2 Key
  - PET / B1 Preliminary
- Each generated full set includes every official component for that level:
  - listening with instant TTS transcripts;
  - reading / reading-writing objective and gap-fill items;
  - writing prompts with model answer and rubric;
  - speaking prompts with model answer and rubric.
- Added UI source/copyright gate on `/child/exams/`.
- Updated practice engine so learners select level -> full set -> component.
- Added official-sample links inside the practice engine.
- Added route smoke manifest coverage for `/child/exams/`.
- Added full-stack regression tests: `__tests__/cambridge-exam-fullstack.test.ts`.

## Current Claim Gate

Allowed claim:

> Henry Learning OS contains original practice packs aligned to current official Cambridge format metadata verified on 2026-05-09.

Blocked claim:

> The bundled practice packs are not official Cambridge papers, official answer keys, leaked papers, or a 100% copy of official exam content.

## Remaining High-Value Upgrade Path

1. Add a private licensed-paper importer specifically for exam PDFs/audio ZIPs, reusing the local library IndexedDB model.
2. Add family-only answer-sheet mode for official PDFs: user imports file, app records local attempts and explanations without republishing content.
3. Add per-skill mastery analytics across sets: weak part, repeated mistake type, next review date.
4. Add speech recording and local rubric checklist for Speaking; keep raw audio local only.
5. Add visual generated scene cards or user-owned image uploads for picture-heavy YLE tasks.

