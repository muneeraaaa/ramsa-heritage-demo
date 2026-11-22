# Two-agent collaboration plan — one GitHub repository

## Proposed repo
`muneeraaaa/ramsa-heritage-demo` (repository must first be created under the account; current archive has no remote yet).

## Agent responsibilities
- **Agent A (Government)**: `src/features/government.js`. Owns the heritage inventory, diagnosis engine, intervention cards, documentation review panel and six impact measures.
- **Agent B (Experiences & Community)**: `src/features/experiences.js` and `src/features/community.js`. Owns tourist journey, underwater and weaving simulations, youth and artisan interactive paths.
- **Integrator**: `src/app.js`, `src/shared.js`, `src/components/ui.js`, `src/pages/overview.js`, CSS, images, deployment, merging and QA.

## How Codex/ChatGPT and Claude work concurrently
1. Create repository from the ZIP, publish `main` (see `docs/GITHUB_PAGES.md`).
2. Add your friend as collaborator: GitHub repo → Settings → Collaborators and teams → Add people. They must accept invitation.
3. Each person clones the same repository separately, reads `CLAUDE.md`, then checks out their own branch:
   - `git switch -c feat/government-agent`
   - `git switch -c feat/experience-agent`
4. The Codex/ChatGPT teammate reads `CODEX.md` and owns Agent A. The friend using Claude reads `CLAUDE.md` and `.claude/agents/experience-agent.md` and owns Agent B.
5. Agents modify only owned files. If either needs a new `state` property, route or event action in shared files, open an Issue labelled `integration-needed` or describe the contract in the PR before editing shared code.
6. Each agent runs `npm test && npm run build`; changes are tested in browser both languages.
7. Push feature branches and open **separate Pull Requests** into `main`; CI runs automatically.
8. Integrator reviews and merges PRs one at a time. Pages deploys after merge to `main`.
9. Both agents pull main into their branch between major PRs: `git fetch origin && git rebase origin/main` (or merge if preferred, never force-push shared branches).
10. Use GitHub Issues and PR comments as the shared planning trail, not two agents writing to main.

## Example ticket split
- Agent A: add evidence-level and score confidence controls; improve actionable government walkthrough; show safeguarding vs public-engagement separation.
- Agent B: improve underwater scene transitions and VR narration captions; polish weaving puzzle; connect visitor completion to learner/artisan panels.

## Integration contract
- `src/shared.js` exports `state`, `s(ar,en)`, `content`, `practice`, `pt`, `btn`, `placeholder`, `photo`.
- Modules export page functions returning HTML strings; `src/app.js` owns routing and event callbacks.
- HTML actions use `data-action="..."` and are handled by `act` in `src/app.js`.
- Do NOT add a `data-action` not handled by `act` without a separate request to integrator.
- State mutations are for a **simulation only**; real data is not sent.

## Conflict prevention
Neither agent should touch shared CSS or routing in the same PR without coordination. Prefer CSS utility classes already present; for new UI patterns, file a short shared-design request.
