# API and Open-Source Evaluation Matrix

Use this table when deciding what to integrate first. Ratings are practical MVP guidance, not a statement of intrinsic quality.

| Resource | Module | Integration value | MVP fit | Risk | Notes |
|---|---|---:|---:|---|---|
| Open Library API | Reading | High | High | Rate limits/bulk policy | Use metadata/covers; avoid bulk downloads. |
| Gutendex | Reading | High | High | Public instance reliability | Good for public-domain English reading. Can self-host. |
| OpenStax | Math/Science | High | Medium | Content import complexity | CC BY OER; excellent for reference and older children. |
| PhET | Science/Math | High | Medium | Licensing varies; embedding/activity design | Best used as curated sim + internal lab sheet. |
| LanguageTool | Writing | Medium | Medium | Language coverage; API limits if hosted | Self-host if needed; test Vietnamese needs separately. |
| Datamuse | English writing | Medium | High | English-centered | Great for word games and synonyms/rhymes. |
| Free Dictionary API | English vocabulary | Medium | High | Volunteer sustainability | Add cache and fallback. |
| Wikimedia APIs | Reading/Civics | High | Medium | Accuracy/age appropriateness | Use with citations and safety filters. |
| Wikidata SPARQL | Knowledge graph | High | Medium | Query complexity/rate limits | Cache results and restrict query templates. |
| Openverse | Media | Medium | Medium | License attribution complexity | Store attribution automatically. |
| SymPy | Math | High | High | Requires careful pedagogical wrapper | Use to validate, generate, and explain; not just solve. |
| MathJax/KaTeX | Math UI | High | High | Accessibility/performance tradeoff | MathJax if accessibility matters most; KaTeX for speed. |
| JupyterLite/Pyodide | Teen coding/data | High | Medium | Sandbox complexity | Introduce after basic coding path. |
| Scratch API/repos | Coding | Medium | Low/Medium | API in development, child social environment | Prefer Blockly/internal editor for MVP. |
| Blockly | Coding | High | Medium | Editor integration effort | Best for controlled block coding. |
| FRED API | Finance/Data | High | Medium | API key/terms | Teen data labs and macro dashboards. |
| World Bank API | Data/Geopolitics | High | Medium | Data interpretation complexity | Great for global comparisons. |
| Alpha Vantage | Finance | Medium | Low/Medium | Rate limits, market data terms | Paper simulations only; no investment advice. |
| SEC EDGAR APIs | Finance/Accounting | Medium | Low | Teen complexity; US-specific | Good for advanced teen business analysis. |
| OpenFisca | Law/Finance | Medium | Low | Country model availability | Use conceptually for rules-as-code. |
| CASEL | SEL | High | High | Framework reuse/endorsement | Use as taxonomy, not diagnostic. |
| Project Zero | Thinking | High | High | Attribution | Strong routines for reflection/debate. |
| Greater Good in Education | SEL | Medium | Medium | Account/licensing per content | Use as benchmark and parent practice source. |
| Kolibri | Platform/offline | High | Low/Medium | Too heavy to embed | Architecture benchmark for offline-first. |
| H5P | Authoring | High | Medium | Runtime packaging | Good interactive content layer. |
| PostHog | Analytics | Medium | Medium | Child privacy | Self-host; avoid replay in child sessions. |
| OpenTelemetry | Observability | High | High | Engineering setup | Use for app performance, not child profiling. |
| Learning Locker | Learning analytics | Medium | Low | Heavy stack | Use xAPI ideas; avoid MVP complexity. |
| Guardrails AI | AI safety | Medium | Medium | Needs custom validators | Layer with policy checks and testing. |
| Presidio | Privacy | High | Medium | Vietnamese customizations needed | Use for PII redaction before logs/external APIs. |
| OPA | Policy | Medium | Medium | Adds infra complexity | Use for strict tool/role policies. |
| LiteLLM | AI gateway | High | Medium | Supply chain/version risk | Pin versions; consider a tiny custom provider interface first. |
| LlamaIndex | RAG | High | Medium | Complexity | Useful for curated curriculum retrieval. |
| Ollama | Local AI | Medium | Low/Medium | Local ops/security | Great for private experiments; do not expose network. |
