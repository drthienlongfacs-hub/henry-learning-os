# Learn Textbook Fidelity Audit - 2026-05-09

## Evidence Boundary

- Live route checked: `https://drthienlongfacs-hub.github.io/henry-learning-os/child/learn/`.
- Live symptom observed before this tranche: English still rendered as `Lớp 3, 4, 5` on the deployed page, while the current repo contains Grade 1-2 English unit data.
- Official program boundary: MOET public article for CTGDPT 2018 states primary school includes compulsory Vietnamese, Math, Ethics, Foreign Language 1 in grades 3-5, Natural/Social Science in grades 1-3, History-Geography and Science in grades 4-5, Computing/Technology in grades 3-5, PE, Art, Experiential Activities, plus optional Foreign Language 1 in grades 1-2.
- Current repo boundary: `/child/learn` is an interactive learning generator with curriculum maps and images, not a licensed page-by-page public reproduction of Vietnamese textbooks.

## Current Local Inventory

- `src/data/sgk-catalog.ts`: 66 SGK catalog records across grades 1-5 and school subjects.
- `src/lib/content/*-generator.ts`: interactive topics across Math, Vietnamese, English, Science, History-Geography, Computing, Ethics and Art.
- `public/images`: open/original/static image assets used for learning illustrations.
- `src/lib/textbook/local-textbook.ts` and `/child/library`: private local textbook vault for family-owned or school-authorized PDF/EPUB/TXT/MD files.

## Gap

The prior UI could look like a broad curriculum surface while hiding the decisive replacement gate:

1. CTGDPT/topic coverage is not the same as 100% textbook fidelity.
2. Original textbook pages and illustrations cannot be copied into the public GitHub Pages build unless rights are verified.
3. PE and Experiential Activities exist in the SGK catalog but are not first-class `/child/learn` subjects yet.
4. Full replacement requires lesson-order fidelity, media rights, interactive questions, review evidence, and human review.

## Upgrade Implemented

- Added `src/data/textbook-fidelity.ts` as the source-of-truth for grade/subject SGK fidelity rows.
- Added `/child/learn` parent-facing fidelity panels:
  - global SGK catalog count and not-100% replacement warning;
  - per-subject/per-grade SGK status;
  - direct path to `/child/library` for private authorized textbook import.
- Added `__tests__/textbook-fidelity.test.ts` to prevent overclaiming and keep missing official subjects visible.
- Updated the Grade 1-2 English unit comment to remove the unsupported "100% match official SGK" claim.

## Replacement Rule Going Forward

Do not call `/child/learn` a 100% textbook replacement until all of the following are true for each grade/subject/book:

1. source map to the official program and selected textbook set;
2. lesson order and required outcomes verified;
3. textbook pages/images imported privately or licensed/open for public use;
4. interactive lesson, practice, hint, mistake ledger and spaced review exist for each lesson;
5. local build, Playwright render and live Pages verification pass;
6. adult/human review marks the row ready.

