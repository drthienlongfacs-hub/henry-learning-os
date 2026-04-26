# 360 Resource, Benchmark, API, and Open-Source Map

Purpose: give Antigravity/Codex a practical resource layer for building Long Learning OS. Each module lists what to benchmark, what can be integrated, what should be self-hosted, what data it emits, and what to avoid.

Design principle: use external resources as inputs to a private, child-safe, family-controlled learning system. Do not simply embed third-party tools and call it a product. Normalize every resource into internal content objects, skill objects, learning events, evidence cards, and safety-reviewed activities.

## Resource selection rubric

Use this rubric before integrating anything.

| Criterion | Must ask | Default decision |
|---|---|---|
| Child safety | Can a child access unsafe/social content? | Proxy, curate, or avoid direct access. |
| License | Can content be stored, transformed, redistributed, or only linked? | Store license metadata per content item. |
| API stability | Is there an official API, rate limit, API key, or scraping risk? | Prefer official APIs and open datasets. |
| Offline value | Can it work offline for family use? | Cache metadata and approved activities. |
| Pedagogical fit | Does it support mastery, feedback, retrieval, transfer? | Wrap in internal pedagogy layer. |
| Data value | Does it emit useful learning evidence? | Convert to xAPI/Caliper-like events. |
| Vendor lock-in | Can the feature degrade gracefully without the resource? | Build adapter interface and fallback. |
| Privacy | Does the provider see child data? | Do not send child PII to optional APIs. |

## Full-stack integration pattern

Every external resource should flow through this pattern:

1. Adapter fetches resource metadata/content.
2. License validator checks usage rights.
3. Content normalizer converts it into internal schema.
4. Safety classifier tags age, risk, sensitive topics, ads/social exposure.
5. Pedagogy wrapper adds objective, prerequisites, retrieval prompts, transfer challenge, parent mission.
6. Evidence engine emits LearningEvent records.
7. Adaptive engine updates mastery, velocity, retention, challenge fit.

Recommended interfaces:

- `ContentProviderAdapter`
- `AssessmentProviderAdapter`
- `SimulationProviderAdapter`
- `DataProviderAdapter`
- `AIProviderAdapter`
- `PolicyGuardAdapter`
- `AnalyticsSinkAdapter`

## Module 1 - Dynamic Ability Engine and Adaptive Acceleration

### Product objective

Do not lock the child to chronological age. Detect readiness by domain, compact already-mastered material, stretch when challenge fit is too low, and scaffold when challenge fit is too high.

### Benchmarks and frameworks

| Benchmark / framework | What to learn | Product translation |
|---|---|---|
| Khan Academy mastery model | Skill graph, mastery status, practice loops | `MasteryState`, `UnitTest`, `SkillPracticeSession`. |
| ALEKS / adaptive assessment concept | Knowledge-space style placement | Build Bayesian/IRT-like placement later; start heuristic. |
| Carnegie Learning / cognitive tutors | Step-level hints and error models | Store step attempts and hint levels. |
| NWEA MAP style growth | Level independent growth measure | Track ability by domain, not grade only. |
| Gifted acceleration / curriculum compacting literature | Skip redundant work after evidence of mastery | `CompactionDecision` with audit trail. |

### Open-source / APIs / libraries

| Resource | Type | Use | Notes |
|---|---|---|---|
| py-irt | GitHub/Python | Item response theory prototypes | Use for assessment calibration, not MVP requirement. |
| catsim | GitHub/Python | Computerized adaptive testing simulation | Useful for testing adaptive algorithms offline. |
| scikit-learn | OSS library | Lightweight mastery prediction | Avoid opaque high-stakes decisions. |
| DuckDB | OSS database | Local analytics over learning events | Good for family/offline analysis. |
| xAPI / Learning Locker | LRS standard/tool | Learning event store | Heavy for MVP; useful reference. |
| 1EdTech Caliper | Specification | Standard learning telemetry vocabulary | Use as event-shape inspiration. |

### Data events

- `diagnostic_started`, `diagnostic_completed`
- `skill_attempted`, `skill_mastered`, `skill_regressed`
- `hint_used`
- `compaction_candidate_detected`
- `compaction_approved_by_parent`
- `stretch_task_assigned`
- `frustration_signal_detected`

### Feature requirements

1. Build `AbilityProfile` per domain: math, reading, writing, English, science, coding, SEL, finance, civic reasoning.
2. Do not show labels like gifted/weak to child.
3. Only accelerate after converging evidence: high accuracy, low hints, transfer success, retention success, positive affect.
4. Add parent review for large jumps.
5. Use a challenge-fit target band, not a fixed grade level.

## Module 2 - AI Tutor, Socratic Tutor, and Hint Ladder

### Product objective

AI should make the child think, not outsource thinking. It should explain, question, diagnose, and scaffold.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Khanmigo | Socratic hints, tutor/teacher assistant framing | Refuse direct answer first; ask next-step questions. |
| Open edX | Rapid feedback, adaptive hints, concept checks | Build exercises with feedback objects. |
| Duolingo Max | Explain-my-answer, roleplay | Use for languages, but avoid streak addiction. |
| Brilliant | Interactive, learn-by-doing problems | Tutor starts with action, not lecture. |
| Photomath/Socratic style apps | Step explanations | Good UX, but must avoid answer-copying. |

### Open-source / APIs / libraries

| Resource | Type | Use | Notes |
|---|---|---|---|
| LiteLLM | OSS AI gateway | Route OpenAI/Gemini/local models behind one interface | Pin versions and scan supply chain. |
| LlamaIndex | OSS RAG/data framework | Retrieve from curated curriculum/resources | Keep child data separated from public content. |
| Ollama | Local model runtime | Local fallback/private experiments | Never expose server publicly. |
| Guardrails AI | OSS validation | Input/output risk checks, structured outputs | Use with custom child-safety validators. |
| Microsoft Presidio | OSS PII detection | Redact child PII before logs or optional APIs | Needs custom Vietnamese recognizers. |
| OPA | Policy as code | Enforce age, role, data, tool-use policies | Good for parent-controlled permissions. |

### Agent behaviors

- `SocraticTutor`: asks questions before explaining.
- `HintLadder`: hint 1 = nudge, hint 2 = concept reminder, hint 3 = worked example with different numbers, hint 4 = parent/teacher intervention.
- `MisconceptionDetector`: classifies error patterns.
- `AnswerWithholder`: blocks direct homework completion.
- `ConfidenceCalibrator`: asks child to rate confidence and compares with correctness.

### Data events

- `ai_hint_requested`
- `ai_direct_answer_refused`
- `misconception_classified`
- `worked_example_shown`
- `teach_back_completed`
- `parent_escalation_recommended`

## Module 3 - Memory Engine: Spacing, Retrieval, Interleaving

### Product objective

Make memory durable without boring repetition. Review only what is useful, at the right time, with increasing transfer.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Anki | Spaced repetition scheduler, ease factor | Use SM-2-like scheduler as starting point. |
| Quizlet | Flashcards, tests, games | Good UX; add understanding checks. |
| SuperMemo | Long-history of SRS algorithms | Later compare SM-2, FSRS. |
| RemNote | Linked notes + flashcards | Connect concept map and cards. |

### Open-source / APIs / libraries

| Resource | Type | Use | Notes |
|---|---|---|---|
| Anki algorithm docs / py libraries | OSS/reference | Implement initial scheduler | Do not depend on Anki app. |
| fsrs4anki / FSRS | OSS algorithm | More advanced scheduler | Consider after enough usage data. |
| H5P Dialog Cards | OSS content type | Interactive flashcards | Useful if using H5P ecosystem. |
| SQLite/DuckDB | Local data | Review history and analytics | Privacy-first. |

### Feature requirements

1. Flashcards must have source, skill, difficulty, and concept links.
2. Every card must be type-tagged: fact, procedure, concept, example, misconception.
3. Use retrieval before review.
4. After repeated success, convert card into transfer challenge.
5. Stop reviewing mastered low-value facts too often.

## Module 4 - Reading, Vietnamese Mastery, and Bilingual Depth

### Product objective

Build deep Vietnamese for identity/context and strong English for global learning. Reading should produce vocabulary, comprehension, inference, writing, and discussion evidence.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Epic / Libby / Kindle Kids | Reading library UX | But use open/public-domain or licensed content. |
| CommonLit / ReadWorks | Reading passages with questions | Build passage + evidence-based questions. |
| Newsela style | Leveled texts | Need internal leveler for Vietnamese/English. |
| Duolingo Max | Roleplay and error explanation | Use for spoken/interactive language. |
| Grammarly / LanguageTool | Writing feedback UX | Give rubric feedback, not rewrite fully. |

### Open resources / APIs

| Resource | Type | Use | Notes |
|---|---|---|---|
| Open Library API | API | Book metadata, covers, reading lists | Do not bulk download. |
| Gutendex / Project Gutenberg | API/open texts | Public-domain English books | Curate for age and cultural fit. |
| Wikimedia APIs | API | Background knowledge, encyclopedia snippets | Always cite and simplify. |
| Wikidata Query Service | SPARQL API | People, places, timelines, knowledge graph | Cache and rate-limit. |
| Openverse API | API | CC/public-domain images/audio | Store license attribution. |
| Free Dictionary API | API | Definitions/pronunciation/examples | English only; service sustainability note. |
| Datamuse API | API | Synonyms, rhymes, related words | Great for writing games. |
| LanguageTool | OSS/API | Grammar/style checks for many languages | Vietnamese support may be limited; test. |
| Whisper | OSS ASR | Speech-to-text for read-aloud/speaking | Verify transcripts; do not use as sole grading. |

### Feature requirements

- `ReadingBuddy`: preview, read, question, infer, summarize, reflect.
- `VocabularyDepth`: meaning, usage, morphology, cross-language equivalents.
- `BilingualBridge`: explain concept in Vietnamese, then English, then child explains back.
- `EvidenceQuote`: child must cite sentence/paragraph when answering comprehension.
- `ParentReadTogether`: 10-minute shared reading mission.

## Module 5 - English Speaking, Pronunciation, and Roleplay

### Product objective

Build usable English: listening, speaking, reading, writing, academic vocabulary, and confidence.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Duolingo Max | Roleplay, explain answer | Short, frequent speaking tasks. |
| ELSA Speak | Pronunciation feedback UX | Need careful affect design: do not shame accent. |
| Cambridge English / CEFR | Level framework | Track CEFR-like proficiency, not just streaks. |
| Quizlet vocabulary | Review UX | Tie vocabulary to real reading/speaking. |

### APIs / libraries

| Resource | Type | Use | Notes |
|---|---|---|---|
| Whisper / whisper.cpp | OSS ASR | Transcribe speaking | Evaluate Vietnamese-accented English. |
| Web Speech API | Browser API | Lightweight speech recognition/TTS | Browser support varies. |
| Piper TTS | OSS TTS | Local synthetic voice | Test voice quality. |
| CMU Pronouncing Dictionary | Open dataset | Phoneme lookup for English | Useful for pronunciation games. |
| LanguageTool | OSS/API | Writing/grammar feedback | Use as one signal only. |
| Datamuse | API | Word games, synonyms, rhymes | Good for vocabulary play. |

### Feature requirements

- Roleplay scenarios by age.
- Pronunciation feedback should be private and kind.
- Add `Can communicate intent` score, not only native-like accent.
- Record before/after samples only with parent approval.

## Module 6 - Math, Probability, Data, and AI Thinking

### Product objective

Build math as a language for reality: number sense, logic, proof, probability, data, algorithms, and model thinking.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Brilliant | Interactive problem solving | Learn by doing. |
| Khan Academy | Mastery and exercise bank | Skill graph and remediation. |
| Desmos / GeoGebra | Visual math exploration | Use embedded calculators/simulations where allowed. |
| AoPS | Deep problem solving | Optional stretch lane. |
| DataCamp/Kaggle Learn | Data skill progression | Later teen pathway. |

### APIs / open-source

| Resource | Type | Use | Notes |
|---|---|---|---|
| SymPy | OSS Python | Symbolic math checking/generation | Great for algebra verification. |
| SageMath | OSS math system | Advanced math sandbox | Heavy; not MVP. |
| MathJax / KaTeX | OSS JS | Render formulas | MathJax stronger accessibility; KaTeX faster. |
| JupyterLite | OSS browser lab | Teen data/Python notebooks in browser | Sandbox carefully. |
| Pyodide | OSS WebAssembly Python | Run Python in browser | Good for offline-ish data labs. |
| Vega-Lite / Observable Plot | OSS viz | Data visualization | Use for simple charts. |
| OpenStax | OER textbooks | Reference content | CC BY; store attribution. |
| FRED API | Economic data | Probability/data/finance examples | API key and terms. |
| World Bank Data API | Open data | Global indicators for data literacy | Good for geopolitics/data. |

### Feature requirements

- `MathReasoningAnalyzer`: require steps and explanation.
- `MistakeNotebook`: classifies arithmetic, concept, strategy, reading errors.
- `DataStoryLab`: child makes charts from real data.
- `ProbabilityCasino`: teaches expected value, risk, variance without gambling incentives.
- `AIModelThinking`: teach model, data, bias, uncertainty.

## Module 7 - Science, Maker, and Simulation Lab

### Product objective

Teach scientific thinking: observe, hypothesize, experiment, measure, explain, revise.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| PhET | High-quality STEM simulations | Embed or link curated sims with activity sheets. |
| Mystery Science | Narrative science questions | Start from curiosity. |
| Science Buddies | Project structure | Home lab templates and safety checklists. |
| Tinkercad Circuits | Maker simulation | Later engineering track. |
| Arduino/Raspberry Pi education | Physical computing | Teen maker projects. |

### APIs / open-source / content

| Resource | Type | Use | Notes |
|---|---|---|---|
| PhET simulations | OSS/free simulations | Physics, chemistry, math sims | Check individual sim licenses; many code repos public. |
| H5P Interactive Book/Video | OSS content types | Interactive lessons and labs | Good authoring format. |
| OpenStax science books | OER | Background explanations | Attribution required. |
| NASA APIs | Public APIs | Space imagery/data | Good for curiosity; inspect terms. |
| NOAA / Open-Meteo | Weather APIs | Local weather data labs | Use for age-appropriate data projects. |
| Openverse | CC media | Images/audio for science projects | Store attribution. |

### Feature requirements

- Each experiment has: question, prediction, materials, safety, procedure, data table, explanation, parent role.
- No hazardous experiments.
- Add `evidence_quality_score`: did child measure, repeat, compare?

## Module 8 - Coding, AI Literacy, and Digital Creation

### Product objective

Turn the child from consumer to creator: computational thinking, automation, product sense, AI literacy, and responsible tool use.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Scratch / ScratchJr | Creative coding and storytelling | Project-first coding for young children. |
| Code.org | K-12 CS/AI curriculum | Scope and sequence for CS. |
| Replit / Trinket | In-browser coding UX | Safe sandbox and progressive tasks. |
| CodeCombat | Game-based coding | Use sparingly; avoid over-gamification. |
| GitHub Skills | Project/version control | Teen workflow. |

### APIs / open-source

| Resource | Type | Use | Notes |
|---|---|---|---|
| Scratch REST API | API/docs | Explore Scratch project metadata | In development; do not rely for core. |
| Scratch GUI/VM repos | OSS | Learn block editor architecture | Heavy to customize. |
| Blockly | OSS | Build block-based coding editor | Good for custom safe coding tasks. |
| CodeMirror / Monaco | OSS editor | Teen code editor | Monaco is heavier. |
| JupyterLite / Pyodide | Browser Python | Python/data labs | Restrict packages and file access. |
| GitHub API | API | Teen portfolio repos later | Parent approval needed. |
| Ollama/local models | Runtime | Offline AI literacy demos | Keep no internet tool access. |

### Feature requirements

- `CreateBeforeConsume`: each coding unit produces a project.
- `ExplainCode`: child explains what code does.
- `DebuggingCoach`: AI gives hints, not full solution.
- `AIHonesty`: child labels AI-assisted code.

## Module 9 - History, Law, Policy, Civic Reasoning, and Geopolitics

### Product objective

Teach how institutions, incentives, laws, geography, history, and narratives shape the world. This is the foundation for rule-shaping without cynicism.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| iCivics | Civic games and lesson plans | Decision games: branches, rights, budgets. |
| Stanford Civic Online Reasoning | Source evaluation | Teach lateral reading and evidence checks. |
| C3 Framework | Inquiry arc for civics/history | Questions, sources, claims, action. |
| Oyez | Legal arguments/audio | Teen debate and legal reasoning. |
| Model UN / debate programs | Roleplay geopolitics | Simulations with ethical constraints. |

### APIs / resources

| Resource | Type | Use | Notes |
|---|---|---|---|
| iCivics resources | Free curriculum/games | Benchmark; link activities | Check reuse rights before embedding. |
| Oyez | Archive | US law/court reasoning examples | Not Vietnam-specific, use as reasoning benchmark. |
| Supreme Court audio | Public resource | Oral advocacy study | US-specific. |
| Wikidata / Wikimedia APIs | API | Timelines, people, institutions | Needs verification and citation. |
| World Bank API | Open data | Country comparison, development indicators | Great for geopolitics/data. |
| Our World in Data | Open data | Historical/global trends | Check license per dataset. |
| OpenFisca | OSS rules-as-code | Teen module: laws/policies as executable rules | Use conceptually; country packages may not include Vietnam. |

### Feature requirements

- `SourceTriangulation`: compare at least two sources.
- `MapAndTimeline`: every event has place, time, actors, incentives.
- `PolicySimulator`: change a rule, inspect consequences.
- `EthicsUnderPower`: teach law and power with responsibility.

## Module 10 - Finance, Accounting, Assets, and Capital Allocation

### Product objective

Teach the child to understand money as measurement, responsibility, optionality, and stewardship. Avoid get-rich-quick framing.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Khan Academy personal finance | Basic finance curriculum | Family finance lessons. |
| Investopedia Simulator | Market simulation | Teen paper portfolio, no real trading. |
| YNAB / budgeting apps | Envelope budgeting mental model | Child allowance and savings goals. |
| QuickBooks/Xero concepts | Accounting categories | Teen bookkeeping simulator. |
| Monopoly/board-game finance | Assets/liabilities concepts | Build better, data-driven versions. |

### APIs / data

| Resource | Type | Use | Notes |
|---|---|---|---|
| FRED API | Economic data | Inflation, rates, GDP, unemployment | Great for macro dashboards. |
| World Bank API | Global economics | Compare countries and development | Good for older children. |
| Alpha Vantage | Market API | Teen paper portfolio and charts | Free tier/rate limits; no investment advice. |
| SEC EDGAR APIs | Company filings | Teen business/accounting analysis | US public companies; requires User-Agent. |
| OpenFisca | OSS rules engine | Tax/benefit simulation concept | For policy literacy. |
| CSV import | Local | Family mock budget | Never require bank login in MVP. |

### Feature requirements

- `AllowanceLedger`: income, saving, giving, spending.
- `AssetVsLiabilityGame`: classify items and explain cash flow.
- `CapitalAllocationSimulator`: choose between projects, probability, payoff, risk.
- `BusinessCaseLab`: read simple P&L/cash flow.
- `NoFinancialAdviceGuard`: explicit guardrail for real investments.

## Module 11 - Sales, Persuasion, Negotiation, Leadership, and Founder Skills

### Product objective

Teach value creation, communication, trust, persuasion, negotiation, hiring/teamwork, and leadership under pressure.

### Benchmarks and resources

| Benchmark / resource | What to learn | Product translation |
|---|---|---|
| Y Combinator Startup School | Founder basics | Teen optional founder track. |
| Toastmasters / debate rubrics | Public speaking practice | Speech rubric and recording feedback. |
| Harvard negotiation concepts | BATNA, interests, options | Negotiation roleplay. |
| IDEO design thinking | Empathy, prototype, test | Project builder. |
| Project Zero thinking routines | Visible thinking routines | Reflection and critique protocols. |

### Tools / libraries

| Resource | Type | Use | Notes |
|---|---|---|---|
| Whisper / ASR | OSS/API | Speech practice transcription | Verify and do not overgrade. |
| Video/audio local recording | Platform API | Presentation review | Parent approval required. |
| Rubric engine | Internal | Pitch/leadership scoring | Use transparent criteria. |
| Miro-like whiteboard via Excalidraw | OSS | Storyboards, business models | Excalidraw is useful for drawing tasks. |
| Mermaid.js | OSS | Simple diagrams | Good for systems thinking. |

### Feature requirements

- `PitchCoach`: problem, customer, solution, evidence, ask.
- `NegotiationArena`: child practices win-win, not manipulation.
- `LeadershipScenario`: conflict, delegation, accountability.
- `SalesEthicsGuard`: block deceptive persuasion.

## Module 12 - Ethics, Self-Regulation, Pressure, and Whole-Child Development

### Product objective

Build a child who can handle competence, money, power, and pressure without being corrupted by them.

### Benchmarks and frameworks

| Benchmark / framework | What to learn | Product translation |
|---|---|---|
| CASEL SEL framework | Five SEL competencies | SEL skill map. |
| Greater Good in Education | Research-based wellbeing practices | Activity cards and parent missions. |
| Harvard Project Zero | Thinking routines and perspective taking | Debate/ethics prompts. |
| AAP Family Media Plan | Family-level screen rules | Built-in media plan. |
| Habit trackers | Routine loops | Use non-addictive habit design. |

### APIs / open-source

| Resource | Type | Use | Notes |
|---|---|---|---|
| CASEL framework pages | Framework | SEL taxonomy | Do not imply endorsement. |
| Greater Good in Education | Resource hub | Practice ideas | Link/curate per license. |
| Project Zero routines | Free routines | Thinking scaffolds | Store attribution/source. |
| OpenHabitTracker / Habo / Trakit | OSS references | Habit UX | Reuse concepts, inspect license. |
| Local-only mood check | Internal | Wellbeing signal | Avoid medical claims. |

### Feature requirements

- `EmotionCheckIn`: simple, non-clinical.
- `PressureSimulator`: losing, criticism, peer pressure, temptation to cheat.
- `EthicalDecisionJournal`: what happened, options, consequences, values.
- `FamilyMediaPlan`: screen boundaries and no-AI zones.
- `EscalationProtocol`: if self-harm/abuse/violence appears, alert parent and stop normal coaching.

## Module 13 - Parent Co-Learning and Family Mentor Mode

### Product objective

Make parents effective mentors without turning them into school teachers or surveillance officers.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Seesaw | Portfolio + family view | Parent sees artifacts and growth. |
| Google Classroom / Canvas | Assignment flow | Simplify for home. |
| ClassDojo | Parent communication UX | Avoid behavior-score gamification. |
| AAP Family Media Plan | Family rules | Parent-child agreements. |
| Montessori/Reggio documentation | Observe and document child | Parent observations and artifacts. |

### Tools

| Resource | Type | Use | Notes |
|---|---|---|---|
| Caliper/xAPI event shapes | Standard | Shareable event model | Internal use only for MVP. |
| PostHog self-hosted | OSS analytics | Product analytics and experiments | Disable session replay for child spaces unless explicit. |
| OpenTelemetry | OSS telemetry | System observability | Separate from learning analytics. |
| Local PDF/Markdown reports | Internal | Weekly family report | No external analytics needed. |

### Feature requirements

- Parent dashboard shows patterns, not surveillance.
- Daily parent mission is short and concrete.
- Weekly family review is reflective, not punitive.
- Parent can approve acceleration, external resource use, recordings.

## Module 14 - Portfolio, Evidence Cards, and Longitudinal Growth

### Product objective

Create a 12-year evidence trail of growth: projects, writing, code, presentations, experiments, values, and reflections.

### Benchmarks

| Benchmark | What to learn | Product translation |
|---|---|---|
| Seesaw | Student portfolio UX | Artifact capture and parent feedback. |
| GitHub profile | Code/project evidence | Teen optional public portfolio. |
| Notion/Obsidian | Personal knowledge base | Private learning wiki. |
| Badgr/Open Badges | Credential metadata | Later badges with evidence. |

### Tools / APIs

| Resource | Type | Use | Notes |
|---|---|---|---|
| S3-compatible storage / local filesystem | Storage | Artifacts | Encrypt child data. |
| Excalidraw | OSS | Diagrams and sketches | Store source JSON. |
| Mermaid.js | OSS | Diagrams in Markdown | Good for systems thinking. |
| GitHub API | API | Teen code portfolio | Parent approval. |
| Static site generator | OSS | Optional private/public portfolio | Default private. |

### Feature requirements

- Every artifact has: date, age, skill, prompt, process, reflection, parent comment, AI assistance level.
- Portfolio must show growth over time, not just polished outputs.
- Include `AI_Assistance_Label`: none, hints, editing, generated draft, code help.

## Module 15 - Platform, Offline, Content Authoring, and LMS Layer

### Product objective

Build a durable system, not a pile of prompts. The app needs content packaging, offline support, telemetry, privacy, and extensibility.

### Benchmarks / platforms

| Resource | Type | Use | Notes |
|---|---|---|---|
| Kolibri | OSS offline learning platform | Benchmark offline-first learning architecture | Good reference if low-connectivity/offline matters. |
| Moodle | OSS LMS | Course/quiz architecture reference | Too heavy for family app. |
| Open edX | OSS platform | Advanced assessment/hints at scale | Too heavy for MVP but strong reference. |
| H5P | OSS interactive content | Interactive question/content types | Good authoring plugin layer. |
| xAPI / Learning Locker | LRS | Learning event storage | Heavy but useful standard. |
| Caliper Analytics | Standard | Learning event vocabulary | Use as vocabulary inspiration. |

### Feature requirements

- Content objects are versioned.
- Resource adapters are replaceable.
- Every external item stores source URL/license/attribution.
- The app works in core mode without internet.
- AI features degrade to static hints and parent missions if model unavailable.

## Integration priority for MVP

### Must integrate or build now

1. Internal content schema.
2. AI gateway adapter with provider abstraction.
3. PII redaction and safety policy layer.
4. MathJax/KaTeX for math rendering.
5. SQLite/DuckDB learning event analytics.
6. Open Library/Gutendex metadata for reading suggestions.
7. Spaced repetition engine.
8. Parent weekly report generator.

### Should prototype next

1. PhET activity wrapper.
2. OpenStax content importer.
3. Wikidata timeline adapter.
4. World Bank/FRED data lab.
5. JupyterLite teen data sandbox.
6. H5P content embedding.
7. LanguageTool writing feedback.
8. Whisper read-aloud/speaking prototype.

### Avoid in MVP

1. Social/community features.
2. Bank account integrations.
3. Public portfolio publishing.
4. Free-form web browsing by child.
5. Realtime stock trading or real-money investment features.
6. Unsupervised general chatbot for children under 13.
7. Scraping unofficial services as core dependency.
