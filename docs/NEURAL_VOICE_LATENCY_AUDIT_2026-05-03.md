# Neural Voice Latency Audit - 2026-05-03

## Verdict

Kokoro improves voice naturalness, but using Kokoro generation directly inside a click handler creates a silent wait before speech starts. For Henry, that is a UX regression. The accepted design is **fast-first hybrid playback**:

1. Word, sentence, vocab and button interactions use Web Speech API immediately.
2. Full-passage reading uses cached Kokoro neural audio only when the passage has already been rendered.
3. If Kokoro audio is not cached, the app starts Web Speech after the 15 ms cancel gap and renders Kokoro in the background for the next replay.
4. Pitch manipulation remains disabled (`pitch = 1`) because it can add audible distortion on OS voices.

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
  - Adds background neural preloading.
  - Makes uncached `speakLongPassage()` start Web Speech immediately instead of awaiting Kokoro.
  - Keeps all word/sentence clicks on the instant Web Speech path.
- `src/components/ReadingQuiz.tsx`
  - Full passage now calls `speakLongPassage()`.
  - Current passage preloads Kokoro in the background after initial UI settles.
- `src/components/ReadToMe.tsx`
  - Removes unused engine import.
  - Preloads neural speech in the background, while the first click remains instant.
- `__tests__/voice-engine.test.ts`
  - Asserts uncached long-passage playback calls Web Speech after the 15 ms cancel gap.
  - Asserts click speech keeps `pitch = 1`.

## Claim Boundary

Allowed claim: Henry now uses a fast-first hybrid voice engine: instant Web Speech for response latency, cached Kokoro for natural replay when available.

Blocked claim: Henry has proven voice quality equal to Google Cloud, Azure Neural, ElevenLabs, or real human narration. That would require controlled listening tests, latency traces on target devices, and preferably MOS/A-B evidence.
