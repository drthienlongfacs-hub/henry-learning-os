# Resource Integration Architecture

This file tells coding agents how to implement the resource layer safely.

## Adapter pattern

Define a common adapter interface:

```ts
export interface ExternalResourceAdapter {
  id: string;
  displayName: string;
  resourceType: 'book' | 'article' | 'simulation' | 'dataset' | 'exercise' | 'media' | 'tool';
  licensePolicy: LicensePolicy;
  fetchMetadata(query: ResourceQuery): Promise<ResourceMetadata[]>;
  fetchContent?(id: string): Promise<ResourceContent>;
  normalize(resource: unknown): Promise<NormalizedLearningResource>;
  safetyClassify(resource: NormalizedLearningResource): Promise<SafetyClassification>;
}
```

Do not expose raw APIs directly to the child UI. All external resources must go through:

`Adapter -> LicenseCheck -> SafetyCheck -> PedagogyWrapper -> InternalContentStore -> LearningSession`.

## Core schemas

```ts
export type LicenseUse = 'link_only' | 'cache_metadata' | 'cache_content' | 'transform_allowed' | 'unknown';

export interface ResourceAttribution {
  title: string;
  sourceName: string;
  sourceUrl: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  retrievedAt: string;
}

export interface NormalizedLearningResource {
  id: string;
  providerId: string;
  title: string;
  description?: string;
  language?: string;
  ageBand?: string;
  subjectTags: string[];
  skillTags: string[];
  difficultyEstimate?: number;
  contentUrl?: string;
  localCacheKey?: string;
  attribution: ResourceAttribution;
  safety: SafetyClassification;
  pedagogy?: PedagogyWrapper;
}

export interface PedagogyWrapper {
  learningObjective: string;
  prerequisites: string[];
  retrievalQuestions: string[];
  discussionPrompts: string[];
  transferChallenge?: string;
  parentMission?: string;
  assessmentRubric?: Rubric;
}
```

## Safety gates

1. Age gate: resource must be tagged for age/ability.
2. PII gate: redact child identifiers before optional external AI calls.
3. Social gate: no child direct posting/commenting to third-party platforms.
4. License gate: no caching full copyrighted content unless explicitly allowed.
5. Tool gate: AI cannot invoke external tools that change state without parent approval.
6. Finance gate: no real-money trading, bank linking, or investment advice.
7. Medical/mental health gate: no diagnosis; only non-clinical wellbeing check-ins.

## Resource cache strategy

| Content type | Cache? | Rule |
|---|---|---|
| Public-domain text | Yes | Store source and license. |
| CC media | Yes if license permits | Store attribution and license URL. |
| API metadata | Yes | Keep retrieved date and provider terms. |
| Full copyrighted book | No | Store metadata/link only. |
| Child recordings | Local/encrypted only | Parent approval and delete option. |
| External AI responses | Store summary/events, not raw sensitive chat by default | Parent controls. |

## Learning event standard

Use internal event names but keep xAPI/Caliper-compatible structure:

```json
{
  "actor": "child:<id>",
  "verb": "attempted",
  "object": "skill:fractions.add_unlike_denominators",
  "context": {
    "module": "math",
    "resourceProvider": "internal",
    "aiAssistanceLevel": "hint_2",
    "parentPresent": false
  },
  "result": {
    "success": true,
    "score": 0.8,
    "durationSec": 420,
    "confidence": 0.6
  },
  "timestamp": "ISO-8601"
}
```

## MVP integration sequence

1. `InternalResourceAdapter` for hand-authored content.
2. `GutendexAdapter` for public-domain reading metadata/text links.
3. `OpenLibraryAdapter` for book metadata only.
4. `OpenStaxAdapter` for OER reference content.
5. `PhETAdapter` as curated links with activity wrappers.
6. `WorldBankAdapter` and `FREDAdapter` for teen data labs.
7. `WikidataAdapter` for timelines/entities.
8. `LanguageToolAdapter` for writing checks.
9. `WhisperAdapter` for local ASR prototype.
10. `H5PAdapter` for authored interactive content.

## Provider abstraction for AI

Use LiteLLM or a small internal interface:

```ts
export interface AIProvider {
  complete(req: TutorCompletionRequest): Promise<TutorCompletionResponse>;
  stream?(req: TutorCompletionRequest): AsyncIterable<TutorToken>;
  embed?(texts: string[]): Promise<number[][]>;
}
```

All AI calls must pass through:

`PolicyGuard -> PII Redaction -> Prompt Builder -> Provider -> Output Guard -> Pedagogy Validator -> Response`.

## License warning for coding agents

Never copy full proprietary content into fixtures. Use tiny synthetic examples. For tests, create mock resources with fake titles/content.
