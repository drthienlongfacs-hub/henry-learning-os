# Resource Harvest and Integration Mission for Antigravity/Codex

You are developing Long Learning OS, a private family-first learning app for one child, ages 6-18, with adaptive acceleration, AI tutoring, parent co-learning, whole-child growth, and owner/capital/leadership track.

Before coding any external integration, read:

1. `resources/RESOURCE_BENCHMARK_FULLSTACK.md`
2. `resources/API_EVALUATION_MATRIX.md`
3. `resources/INTEGRATION_CATALOG.json`
4. `architecture/RESOURCE_INTEGRATION_ARCHITECTURE.md`
5. `policies/AI_SAFETY_POLICY.md`
6. `schemas/METRICS_AND_ADAPTIVE_MODEL.md`
7. `issues/RESOURCE_INTEGRATION_BACKLOG.md`

Mission:

- Implement resource integrations through adapters, never by hardcoding third-party APIs into UI components.
- Preserve child privacy and family control.
- Add license metadata and attribution for every external resource.
- Do not scrape unofficial services as core dependencies.
- Prefer official APIs, OER, public-domain, CC-licensed resources, and self-hostable open-source tools.
- All AI features must pass through policy, PII redaction, input/output guardrails, and pedagogy validation.
- Every learning activity must emit internal learning events for mastery, retention, transfer, and challenge-fit analytics.

Start with these tasks:

1. Create TypeScript interfaces for resource adapters and normalized resources.
2. Implement `InternalResourceAdapter` with mock content.
3. Implement `GutendexAdapter` and `OpenLibraryAdapter` in a server-side service.
4. Add `ResourceAttribution` UI component.
5. Add tests for license-gate behavior.
6. Add MathJax/KaTeX equation rendering in learning cards.
7. Implement local learning event storage.
8. Add a weekly parent report that includes external resource attributions.

Never implement:

- Real-money trading.
- Bank linking.
- Child public social posting.
- Unsupervised chatbot mode for under-13 children.
- Direct homework answer generator.
- External content caching without license approval.
