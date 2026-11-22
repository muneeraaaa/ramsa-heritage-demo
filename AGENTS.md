# RAMSA agents — shared repository rules

This is a public-facing **student concept demo** for Ajman. Never claim it is an official government service, a trained ML model or a production VR application. All sample scores and sample practitioners/workshops must remain clearly hypothetical.

## Roles and safe file ownership

**Agent A — Codex/ChatGPT: Government, knowledge and measurement**
- Owns: `src/features/government.js`, `docs/agent-a-*.md`.
- May suggest data changes through PRs; coordinate any `src/shared.js` edits.
- Scope: risk assessment controls, explainable diagnosis, human review, documentation, six impact dimensions, government guided-tour quality.

**Agent B — Claude: Visitor experience and community**
- Owns: `src/features/experiences.js`, `src/features/community.js`, `docs/agent-b-*.md`.
- Scope: underwater pearling/browser simulation, palm weaving, tourist discovery, youth workshops, artisan contributions, accessible audio, media.

**Integrator (shared ownership)**
- Owns: `src/shared.js`, `src/app.js`, `src/components/ui.js`, `src/pages/overview.js`, `styles.css`, `index.html`, `assets/`, workflows, README, and translation/data contracts.
- Agents can propose changes via PR but should not edit these shared files independently at the same time.

## Mandatory constraints
1. Bilingual Arabic and English. Arabic default, correct RTL/LTR.
2. Use existing design tokens and RAMSA components; no parallel styling system.
3. Keep feature imports ES modules and no external runtime service/dependency.
4. Must build with `npm run build` and pass `npm test`; run browser QA for interactive work.
5. No real bookings, government approvals, authentication, personal data collection or AI prediction claims.
6. Cite credible sources in the research section; simulated data must be labeled.
7. The pearl-diving and weaving activities must remain playable on ordinary browsers.
8. Preserve Future Visions concept labels, heritage consent, cultural sensitivities and accessibility.
9. No new images masquerading as real historic photographs or government dashboards.
10. Never publish real team DOBs or private info from the source presentations.

## Git workflow
- `main`: stable, Pages deployed after merged PRs.
- `feat/codex-government`: Agent A feature branch.
- `feat/claude-experience`: Agent B feature branch.
- PR into main; no forced pushes; no simultaneous edits to shared files.
- See `docs/TWO_AGENT_WORKFLOW.md` for daily collaboration and handoff protocol.
