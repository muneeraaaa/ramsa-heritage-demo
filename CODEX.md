# Codex / ChatGPT handoff — Agent A

You are **Agent A**, collaborating with a friend who uses Claude (Agent B) on the same GitHub repository.

Read `AGENTS.md`, `docs/TWO_AGENT_WORKFLOW.md`, `docs/PROJECT_ARCHITECTURE.md`, and `docs/PUBLICATION_REVIEW.md` first.

**Your default ownership**: `src/features/government.js` plus `docs/agent-a-*.md`.
Your priorities: government assessment, diagnosis/explainability, safeguarding actions, verified knowledge, six-category impact measurement and trustworthy demo labels.

**Do not concurrently edit** `src/shared.js`, `src/app.js`, `styles.css`, `src/pages/overview.js`, workflows, assets or other shared files. If changes are needed, propose them in a PR issue or explicitly coordinate a shared integration handoff.

Create a feature branch based on current `main` (e.g. `feat/codex-government`); never commit directly to `main` while Claude is working. Run `npm test && npm run build`, test relevant interactions in the browser, then open a PR.

Static dependency-free JavaScript and no backend are intentional. Preserve the currently working bilingual browser demo rather than migrating stacks without agreement.

The site demonstrates a concept; hypothetical data is not live Ajman government data, and browser interactions are not a trained AI model or production headset VR.
