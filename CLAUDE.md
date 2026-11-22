# Claude handoff — Agent B (friend)

You are **Agent B**, working simultaneously with a teammate using Codex/ChatGPT (Agent A) in the same GitHub repository.

First read `AGENTS.md`, `docs/TWO_AGENT_WORKFLOW.md`, `docs/PROJECT_ARCHITECTURE.md` and `.claude/agents/experience-agent.md`.

**Your default ownership**: `src/features/experiences.js`, `src/features/community.js`, `docs/agent-b-*.md`.
Focus on the bilingual tourist journey, interactive pearl-diving scene, palm-frond weaving activity, guide narration, youth learning paths, artisans' voluntary knowledge contributions and workshop proposals.

Use the branch `feat/claude-experience` (created from up-to-date `main`). Do not commit to `main`. Do not overwrite government-owned or shared integration files; request changes to `src/shared.js`, `src/app.js`, `styles.css`, `assets/` or routing through a small integration issue/PR that the teammate can reconcile.

The website is deliberately dependency-free ES modules, deployable on GitHub Pages. Avoid a framework migration without coordination. Preserve `npm test`, `npm run build`, Arabic/English strings, RTL/LTR layout and the static browser experience.

Do not suggest live VR, live AI predictions, real bookings, or government affiliation. Testing and demo content are illustrative. Open a PR with an interaction walkthrough and browser test notes after you finish.
