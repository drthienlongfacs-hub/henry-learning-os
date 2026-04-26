# Long Learning OS - Dev Handoff Kit

Muc tieu: build mot ung dung hoc tap rieng cho con trai sinh nam 2020 tai TP.HCM, dung tu 6 den 18 tuoi, giup be tu hoc, ba me hoc cung con, AI dong vai tro giao vien/ban hoc/doi thu/coach, va do tien bo bang du lieu that.

## Thu muc

- `docs/PRD.md`: Product Requirements Document tong the.
- `docs/FEATURE_SPEC.md`: Chi tiet module va feature.
- `docs/LEARNING_ROADMAP_6_18.md`: Lo trinh hoc tap theo tuoi.
- `docs/PARENT_CO_LEARNING.md`: Che do ba me dong hanh.
- `benchmarks/BENCHMARKS.md`: Benchmark voi ung dung hang dau.
- `architecture/ARCHITECTURE.md`: Kien truc ky thuat de xuat.
- `schemas/DATA_MODEL.md`: Data model va event model.
- `policies/AI_SAFETY_POLICY.md`: Chinh sach AI an toan cho tre em.
- `prompts/ANTIGRAVITY_MISSION.md`: Prompt de dua vao Google Antigravity.
- `prompts/CODEX_PROMPT.md`: Prompt de dua vao Codex.
- `issues/MVP_ISSUES.md`: Backlog dang issue de giao cho coding agent.
- `roadmap/ROADMAP.md`: Lo trinh build MVP -> V3.
- `docs/SOURCES.md`: Nguon tham khao va dan chung.

## Cach dung voi Google Antigravity

1. Tao repo moi, copy toan bo thu muc nay vao root repo.
2. Mo repo bang Antigravity.
3. Dua noi dung `prompts/ANTIGRAVITY_MISSION.md` cho Agent Manager.
4. Yeu cau agent lap plan, tao task list, tao artifacts, code MVP, chay test va verify UI.

Antigravity la nen tang agentic development, cho phep quan ly agent theo workspace va van giu trai nghiem AI IDE quen thuoc. Tai lieu cua Google mo ta Agent la he thong reasoning nhieu buoc co the doc code, dung editor/terminal/browser, va giao tiep bang tasks/artifacts.

## Cach dung voi Codex

1. Tao repo moi, copy toan bo thu muc nay vao root repo.
2. Cai Codex CLI hoac dung Codex trong IDE.
3. Chay prompt trong `prompts/CODEX_PROMPT.md`.
4. Yeu cau Codex build tung issue trong `issues/MVP_ISSUES.md`.

Codex la coding agent cua OpenAI, co the ho tro build feature, refactor, review, documentation va lam viec trong IDE hoac terminal.

## Stack de xuat cho ban dau

- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui.
- Backend: Supabase hoac Firebase cho auth/db/storage.
- AI layer: provider-agnostic adapter, co safety middleware.
- Local-first option: SQLite/IndexedDB cache cho tre hoc offline.
- Analytics: event log rieng, khong dung tracking quang cao.

## Nguyen tac bat bien

- AI khong lam ho bai.
- Duoi 13 tuoi khong chat AI tu do khong giam sat.
- Do tien bo bang mastery, retention, transfer, reflection, khong do bang thoi gian dung app.
- Ba me la mentor, khong phai giam sat vien diem so.
- Data cua tre em phai toi thieu, minh bach, co the xoa.

## North Star Track: owner, capital allocator, leader, rule-shaper

App khong chi toi uu cho diem so hay truong lop. Mot track rieng can giup be xay 6 nang luc dai han: song ngu sau; toan-xac suat-du lieu; lich su-luat-chinh sach-dia chinh tri; tai chinh-ke toan-tai san; ban hang-thuyet phuc-lanh dao; dao duc-tu chu-chiu ap luc.

Docs bo sung:

- `docs/OWNER_CAPITAL_LEADERSHIP_TRACK.md`: track 6 nang luc ve agency, ownership, capital allocation, leadership va rule-shaping.
- `docs/SOURCES_OWNER_CAPITAL_LEADERSHIP.md`: nguon tham khao cho track ownership/capital/leadership.

## 2026-04 deep research upgrade

This package now includes a research-to-product layer. Before implementation, read:

- `docs/RESEARCH_TO_PRODUCT_BLUEPRINT.md`
- `docs/DEEP_MODULE_SPECS.md`
- `docs/OWNER_TRACK_DEEP_DIVE.md`
- `benchmarks/BENCHMARK_MATRIX_DEEP.md`
- `schemas/METRICS_AND_ADAPTIVE_MODEL.md`
- `architecture/AI_AGENT_BEHAVIOR_SPEC.md`
- `docs/KEYWORD_TAXONOMY.md`
- `issues/DEEP_RESEARCH_BACKLOG.md`
- `prompts/RESEARCH_HARVEST_MISSION.md`

Design intent: do not build “school by app”. Build a longitudinal family learning OS that adapts to the child’s actual ability, accelerates when evidence supports it, consolidates when needed, and develops ownership, capital reasoning, leadership, ethics, bilingualism, AI/data literacy, and self-regulated learning.

## Resource Full-Stack Layer

Before implementing module integrations, read `RESOURCE_FULLSTACK_UPGRADE_INDEX.md`, `resources/RESOURCE_BENCHMARK_FULLSTACK.md`, `resources/INTEGRATION_CATALOG.json`, and `architecture/RESOURCE_INTEGRATION_ARCHITECTURE.md`. Use official APIs/OER/open-source resources only through adapters with license, attribution, privacy, and safety gates.

