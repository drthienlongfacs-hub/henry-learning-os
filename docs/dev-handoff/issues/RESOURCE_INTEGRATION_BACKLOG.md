# Resource Integration Backlog

## Epic R1 - Resource Registry and License Layer

### Issue R1.1 - Build resource registry schema
- Create tables: `ResourceProvider`, `ExternalResource`, `ResourceAttribution`, `LicensePolicy`, `ResourceAdapterRun`.
- Acceptance: every imported item has provider, URL, retrievedAt, license status, allowed use.

### Issue R1.2 - Build license gate
- Add enum: link_only, cache_metadata, cache_content, transform_allowed, unknown.
- Block caching/transforming unknown or proprietary content.
- Acceptance: tests for CC, public-domain, unknown, link-only resources.

### Issue R1.3 - Add attribution renderer
- Every activity can display source/attribution.
- Acceptance: parent report and child activity show attribution where needed.

## Epic R2 - Reading resource adapters

### Issue R2.1 - OpenLibraryAdapter
- Fetch book metadata and covers.
- Store metadata only by default.
- Acceptance: search by title/author/topic; no bulk download.

### Issue R2.2 - GutendexAdapter
- Fetch public-domain book metadata.
- Link to formats; cache short excerpts only until license policy is explicit.
- Acceptance: generate reading suggestions by age/language/topic.

### Issue R2.3 - Dictionary and Datamuse adapters
- Implement definitions, synonyms, rhymes, related words.
- Acceptance: vocabulary games can call both through one interface.

## Epic R3 - Math/science resources

### Issue R3.1 - Math rendering layer
- Add MathJax or KaTeX.
- Acceptance: equations render in lesson, exercise, feedback, report.

### Issue R3.2 - SymPy validation service
- Use SymPy to validate algebra/numeric answers and generate variants.
- Acceptance: answer checking never reveals full solution unless policy permits.

### Issue R3.3 - PhET activity wrapper
- Curate a list of sims.
- For each sim create objective, prediction, observation, reflection, parent safety note.
- Acceptance: simulation activity emits learning events.

### Issue R3.4 - OpenStax importer prototype
- Import metadata/sections for one open textbook.
- Acceptance: creates reference cards with attribution.

## Epic R4 - Data and finance resources

### Issue R4.1 - WorldBankAdapter
- Fetch country indicators using curated query templates.
- Acceptance: child can build a simple chart with source citation.

### Issue R4.2 - FREDAdapter
- Fetch time series with API key from env.
- Acceptance: teen module builds inflation/rate/GDP charts.

### Issue R4.3 - CapitalAllocationSimulator data model
- Add simulated projects, cash flows, probabilities, outcomes.
- Acceptance: no real investment advice or real-money integration.

### Issue R4.4 - SEC EDGAR advanced adapter
- Optional teen-only module.
- Acceptance: fetch company facts with User-Agent; explain P&L concepts simply.

## Epic R5 - AI safety and policy resources

### Issue R5.1 - PII redaction pipeline
- Add Presidio or custom PII detector.
- Acceptance: child name/email/location redacted from optional external logs.

### Issue R5.2 - AI output guard
- Add structured validation for direct-answer refusal, age tone, no manipulation.
- Acceptance: tests for homework-copy, finance advice, self-harm escalation.

### Issue R5.3 - Policy engine
- Add policy config for age bands, parent approval, external API access.
- Acceptance: under-13 child cannot use free-form external web/AI mode.

## Epic R6 - Platform and analytics

### Issue R6.1 - Learning event schema
- Implement Caliper/xAPI-inspired internal event object.
- Acceptance: all modules emit consistent events.

### Issue R6.2 - Local analytics with DuckDB/SQLite
- Build weekly mastery report.
- Acceptance: report computes mastery, velocity, retention, hint dependence.

### Issue R6.3 - Observability with OpenTelemetry
- Instrument API latency/errors.
- Acceptance: app telemetry separated from learning analytics.

### Issue R6.4 - PostHog optional self-hosted product analytics
- Only for product usage, not sensitive child profiling.
- Acceptance: feature flag support; session replay disabled by default.

## Epic R7 - Authoring and interactive content

### Issue R7.1 - H5P embedding spike
- Test H5P interactive video/book/dialog cards.
- Acceptance: H5P completion events map to internal learning events.

### Issue R7.2 - Internal activity authoring DSL
- Markdown/JSON format for lesson, prompt, question, rubric, parent mission.
- Acceptance: coding agent can add content without DB migrations.
