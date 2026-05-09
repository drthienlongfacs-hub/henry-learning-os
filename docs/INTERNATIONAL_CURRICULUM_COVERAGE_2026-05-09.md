# International Curriculum Coverage Evidence - 2026-05-09

## Scope

This evidence note covers the May 9, 2026 upgrade for the Henry Learning OS international English curriculum and the broader primary topic audit layer.

- International country unit index: 205/205 units across United Kingdom, United States, Australia, Finland, Singapore, and Canada.
- Each country unit now has a source-manifest lesson path with at least 7 learning sections plus the vocabulary screen in the child lesson flow.
- Each country unit now has at least 16 assessment items generated from the unit manifest or exact unit benchmark.
- Cambridge Grade 1 Unit 3 remains an exact resolved benchmark unit and keeps its bespoke 16-item question bank.
- Primary generator topic map: 375/375 active Grade 1-5 generator topics now have curriculum map entries.
- Topic learning blueprints: 375/375 active Grade 1-5 generator topics now have gold-standard and benchmark-pattern blueprints.

## Source Boundary

The app uses official standards, permitted/public-domain source registries, and original practice content. It does not copy proprietary textbook pages verbatim unless a source is provided under a license that allows embedding or is supplied by the family for private local use.

Current registered source families include:

- Cambridge Primary English official framework.
- Common Core ELA.
- Australian Curriculum English.
- Finnish National Core Curriculum.
- Singapore English/STELLAR syllabus references.
- Ontario/Canadian Language curriculum references.
- Public-domain/open reading and practice sources such as Project Gutenberg, Smithsonian Learning Lab, IES/WWC practice guides, EEF, and The Learning Scientists.

## Verification Commands

```bash
npx vitest run
npx tsc --noEmit
npm run lint
npm run build
npm run smoke:ui
```

Observed local gate results:

- Vitest: 29 test files passed, 208 tests passed.
- TypeScript: passed.
- ESLint: 0 errors; existing warnings remain outside this tranche.
- Production build: passed, 28 static routes generated.
- Playwright smoke UI: 28/28 passed across desktop and mobile.

Additional local static route checks:

- `/child/international/` displays full benchmark status for the country-selector surface.
- `/child/learn/?subject=english&topic=us_g1_u01` opens the focused United States unit lesson, shows multi-step lesson progress, and reaches a 16-item quiz without the generic "focuses on which skill" question.
- `/child/learn/?subject=english&topic=cam_g1_u03` keeps Unit 3 "Rhyme time" and reaches a 16-item quiz without the generic "focuses on which skill" question.

