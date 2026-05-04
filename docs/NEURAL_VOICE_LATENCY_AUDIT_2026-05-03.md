# Neural Voice Latency Audit - 2026-05-03

## Verdict

Kokoro improves voice naturalness, but using Kokoro generation directly inside a click handler creates a silent wait before speech starts. For Henry, that is a UX regression. The accepted design is **fast-first hybrid playback**:

1. Word, sentence, vocab and button interactions use Web Speech API immediately.
2. Full-passage reading uses cached Kokoro neural audio only when the passage has already been rendered.
3. If Kokoro audio is not cached, the app starts Web Speech after the 15 ms cancel gap.
4. Automatic Kokoro preload is disabled by default. Live audit showed background model activity can keep `/child/reading/` busy and can make real devices feel slow even when the click handler itself is fast.
5. Pitch manipulation remains disabled (`pitch = 1`) because it can add audible distortion on OS voices.

## Source Benchmark

| Option | Evidence | Fit for Henry |
|---|---|---|
| Web Speech API | MDN defines `window.speechSynthesis` as the browser entry point for speech synthesis and shows voice selection through `getVoices()` and `SpeechSynthesisUtterance`. Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis | Best latency and compatibility. Quality varies by OS/browser, so it is the fallback and fast interaction layer. |
| Kokoro 82M ONNX | Hugging Face model card: Apache-2.0, 82M params, v1.0 release with multiple voices. Source: https://huggingface.co/hexgrad/Kokoro-82M | Best free/on-device naturalness for English in this app, but generation time is not acceptable as a click-blocking path. |
| kokoro-js | NPM README says the model can run 100% locally in the browser through Transformers.js and supports WASM/WebGPU. Source: https://www.npmjs.com/package/kokoro-js | Good implementation layer, but must be lazy/cached and never block audible response. |
| ONNX Runtime WebGPU | ONNX Runtime docs describe WebGPU as a browser execution provider for more compute-intensive models, with WASM as the lightweight default. Source: https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html | Useful for future acceleration, but device/browser support remains variable. |
| Azure / Google neural cloud TTS | Azure documents neural voices and SSML controls; Google documents Chirp/Neural2 voice tiers. Sources: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech and https://cloud.google.com/text-to-speech/docs/voices | Likely stronger absolute quality, but needs server/API key/cost and sends text outside the private browser context. Not selected for this private child app. |

## Implementation Evidence

Changed surfaces:

- `src/lib/voiceEngine.ts`
  - Adds in-memory neural audio cache.
  - Keeps Kokoro as explicit opt-in/cache-only; automatic preload is guarded by `localStorage["henry.voice.neuralAutoPreload"] === "1"`.
  - Makes uncached `speakLongPassage()` start Web Speech immediately instead of awaiting Kokoro.
  - Keeps all word/sentence clicks on the instant Web Speech path.
- `src/components/ReadingQuiz.tsx`
  - Full passage now calls `speakLongPassage()`.
  - Removes automatic Kokoro preload from the reading route.
- `src/components/ReadToMe.tsx`
  - Uses `speakLongPassage()` so the first click remains instant.
  - Removes automatic Kokoro preload from the shared reader control.
- `src/components/PhonicsLab.tsx`, `src/components/VocabReview.tsx`
  - Increases accent button touch targets on `/child/reading/` so the voice route passes the UI smoke accessibility gate on desktop and mobile.
- `__tests__/voice-engine.test.ts`
  - Asserts uncached long-passage playback calls Web Speech after the 15 ms cancel gap.
  - Asserts click speech keeps `pitch = 1`.
- `tests/smoke/ui-smoke.spec.ts`
  - Asserts the live reading surface emits a `speechSynthesis.speak()` call within 250 ms when "Read full passage" is clicked, proving Kokoro background rendering is not blocking the interaction path.

## Verification Evidence

- `npx tsc --noEmit` - pass.
- `npx eslint src/lib/voiceEngine.ts src/components/ReadToMe.tsx src/components/ReadingQuiz.tsx src/components/PhonicsLab.tsx src/components/VocabReview.tsx src/data/ui-smoke-gate.ts __tests__/voice-engine.test.ts __tests__/ui-smoke-gate.test.ts tests/smoke/ui-smoke.spec.ts` - pass, 0 warnings.
- `npx vitest run __tests__/voice-engine.test.ts __tests__/ui-smoke-gate.test.ts __tests__/reading-quiz-history.test.ts` - pass, 9 tests.
- `npm run build` - pass; `/child/reading` prerendered as static content.
- `npm run smoke:ui` - pass, 26/26 tests across desktop and mobile.

## Claim Boundary

Allowed claim: Henry now uses an instant-first voice engine: Web Speech is the default interaction path, while Kokoro neural speech is opt-in/cache-only so model loading cannot silently slow the child reading route.

Blocked claim: Henry has proven voice quality equal to Google Cloud, Azure Neural, ElevenLabs, or real human narration. That would require controlled listening tests, latency traces on target devices, and preferably MOS/A-B evidence.
