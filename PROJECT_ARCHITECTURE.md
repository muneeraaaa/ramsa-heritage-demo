# Architecture: GitHub Pages-ready RAMSA

This site is a no-backend, bilingual static web demonstration. The build copies static files into `dist/`, with no paid external services or runtime secrets.

## Structure
- `index.html` — entrypoint and Arabic default metadata
- `src/app.js` — hash routes, demo state transitions, inputs and judge tour
- `src/shared.js` — content sample records, bilingual helper, state and shared utilities
- `src/components/ui.js` — navigation, footer, reusable UI wrappers
- `src/pages/overview.js` — homepage, heritage map, Future Visions gallery and full project explainer
- `src/features/government.js` — government journey (Agent A)
- `src/features/experiences.js` — tourist experience, pearl dive, palm craft (Agent B)
- `src/features/community.js` — learner and practitioner flows (Agent B)
- `styles.css` — unified design tokens and responsive styles
- `assets/` — seven Future Visions visuals, slide imagery, two supplied concept videos
- `scripts/` — dependency-free static build and preview server
- `.github/workflows/` — PR checks and Pages deployment

## Routes
Use hash routing: `#/home`, `#/government/assessment`, `#/government/documentation`, `#/government/impact`, `#/tourist`, `#/pearl`, `#/weaving`, `#/youth`, `#/artisan`, `#/map`, `#/gallery`, `#/explore`.

## Bilingual rendering
Arabic default; site dynamically sets `html.lang`/`html.dir`. Every visible string in interactive components should use `s(ar,en)`.

## Shared concept contract
All practices in government and visitors must come from `content.practices`. Illustrative risk metrics must never be passed off as verified local data. The site uses speechSynthesis as an optional device-dependent demo, not recorded authentic Emirati narration.

## Privacy and deployment
No backend, no authentication, no actual payments, no transmission of form details. LocalStorage only stores language and demonstration progress. The site is not endorsed by or connected to the Government of Ajman.
