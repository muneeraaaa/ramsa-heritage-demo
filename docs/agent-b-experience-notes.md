# Agent B (Claude) — visitor, VR, youth & artisan experiences

Branch: `feat/claude-experience`. Owned files changed: `src/features/experiences.js`, `src/features/community.js`, new `src/features/experience-kit.js`, this note.

## How the interactive pages work without touching shared routing
`src/app.js` owns every `data-action`. To avoid adding new actions there, Agent B pages use **islands**:

- `experience-kit.js` exposes `on(name, fn)` for clicks on `[data-xp="name"]`, `form[data-xp-form]` submits and `[data-xp-keys]` keyboard shortcuts.
- `island(id, render)` wraps a section; `refresh()` re-renders only Agent B islands on the page and restores keyboard focus via `data-focus` keys.
- Existing shared actions are still used where they already exist (`choose-practice` opens the government assessment for a practice; `lang` switches the site language).
- Demo progress lives in `localStorage['ramsa-agent-b']` (pearl/weave completion, learned terms, demo interests, demo contributions, demo workshop proposals). No personal data, nothing is sent anywhere. `ramsa-youth-progress` (shared key) is also bumped for compatibility.
- Scoped styles (`.xpb-*`) are injected once by `experience-kit.js` and use only the shared tokens from `styles.css`. **Integration candidate:** move this CSS into `styles.css` in a shared PR.

## Pearl diving (`#/pearl`) — 6 stages
1. Guide language: Arabic or English captions + optional device-voice narration. Russian / Chinese / Hindi shown as *proposed* (disabled). The guide language is independent of the site language; caption direction (`dir`) follows the guide language.
2. Vessel & crew: hotspots for النوخذة، الغيص، السيب، النهّام (meet ≥2 to continue).
3. Gear: equip الفطام، الديين، الحجر، الحبل (all four to dive).
4. Dive: animated descent, seabed scene (rays, fish, seagrass, rocks), breath meter (simplified 40 s), collect oysters, tug the rope (≥3) or be pulled up when breath runs out.
5. Deck: open each oyster; one pearl, most empty — labelled as a simplified game outcome.
6. Completion: oysters, pearl, learned-term chips, links to the youth pathway, heritage map and the government assessment for the practice.

## Palm-frond weaving (`#/weaving`) — 4 stages
Materials (السعف، الخوص، العسيب، الصبغ، السفّة، المنتجات) → order five preparation steps → 6×6 over/under grid with per-row dyes, keyboard O/U, mistake count and hint → completion with terms and next steps. Clearly labelled as a simplified plain-weave illustration of alternation; real saff is a multi-leaflet braid learned with an artisan.

## Youth (`#/youth`)
Skill selection, five-step pathway (Discover → Try virtually → Express interest → Train with an artisan → Continue) driven by real demo state, workshop discovery with craft and area filters (Ajman / Masfout / Manama), demo interest toggle, interest summary, link to the assessment indicator about young learners. Workshops are illustrative: no dates, venues, fees or teachers.

## Artisan (`#/artisan`)
Tabs: fictional sample profiles; knowledge contribution with usage permission (public / learning-only / restricted); cultural review workflow (received → specialist review → practitioner approves representation → ready for learning, with "request changes" and withdraw); workshop proposals that appear in the youth portal; illustrative opportunities with a fair-benefit principle.

## Integration
The feature files were integrated on top of the restored folder structure, shared routing fixes, and government Decision Brief. The experience pages reuse the shared video card.

## Content caveats
Terms and descriptions are simplified and flagged for review by specialists and practitioners before public use. Narration uses device voices, not recorded Emirati narration. Nothing here is a booking, a real workshop, a real person or a government decision.
