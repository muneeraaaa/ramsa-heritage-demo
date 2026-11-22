# رَمْسَة | RAMSA — From Risk to Revival

**Arabic-first, English-enabled interactive concept demo** for the 2026 أصالة إماراتية Ajman student innovation competition.

RAMSA proposes one connected ecosystem: heritage assessment → verified documentation → interactive heritage simulations → connections to real artisans/workshops → separate outcome measurement. This website is a student prototype, **not** a deployed government platform, an AI predictive model or working headset-based VR.

## What works in the demo
- Four journeys: government, tourist, youth learner and artisan.
- Government heritage records, adjustable illustrative vulnerability indicators, explainable action cards, documentation example and six impact dimensions.
- Browser-based pearl diving: choose language, board the vessel, learn about tools, transition underwater, click oysters and complete the experience.
- Palm weaving: follow a simple interactive sequence.
- Youth interest and artisan contribution/workshop forms (saved only as a local demonstration).
- Ajman / Masfout / Manama conceptual map, seven Future Visions images, two supplied demonstration videos, project/research explorer and guided judging tour.
- Persistent Arabic/English switch with RTL/LTR layout.

## Run locally (Windows / macOS / Linux)
Requires Node.js 20+.

```bash
npm install
npm test
npm run dev
```

Open `http://127.0.0.1:4173/`.

Build and preview the exact deployment output:

```bash
npm run build
npm run preview
```

### Deployment
GitHub Pages deployment is configured via `.github/workflows/pages.yml`. See [GitHub Pages setup](docs/GITHUB_PAGES.md) for repository creation, pushing, Pages settings and collaborator invitation.

### Two-agent teamwork
See [AGENTS.md](AGENTS.md), [two-agent workflow](docs/TWO_AGENT_WORKFLOW.md), plus [CODEX.md](CODEX.md) for the ChatGPT/Codex teammate and [CLAUDE.md](CLAUDE.md) for the friend using Claude. Ownership is intentionally split into different feature files to limit conflicts.

### Project architecture
See [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) and [content coverage](docs/CONTENT_COVERAGE.md).

### Important: public demo safety
Demo risk figures, practitioner profiles and workshop forms are hypothetical. Existing institutional initiatives named in the site are context, **not confirmed partnerships**. Generated concept images are labelled. Before publishing a public GitHub repository, review media rights and the [publication checklist](docs/PUBLICATION_REVIEW.md).

### Official reference sources
- [Ajman Vision 2030](https://ajman2030.ae/vision/)
- [Ajman Open Data](https://data.ajman.ae/)
- [Ajman Statistics Centre](https://scc.ajman.ae/)
- [UNESCO intangible cultural heritage ethical principles](https://ich.unesco.org/en/ethics-and-ich-00866)

**Team:** Ajman University student innovation project. Public demo intentionally omits participant dates of birth and other private information.
