# CrowdRank playable practice — implementation plan

**Spec:** [2026-10-30 CrowdRank design](../specs/2026-10-30-crowdrank-design.md)

**Goal:** Establish an engaging, self-contained mobile-browser game that validates the ranking mechanic and design, while keeping all invented reference rankings plainly labelled as practice content.

**Architecture:** Dependency-free ES modules with pure ranking scoring and content, local-only session persistence, and a responsive editorial game UI. A standalone bundled HTML file at the repository root works without a server. Official, survey-backed gameplay belongs in a later backend milestone.

**Constraints:** 3 rounds / 4 options / 6 points maximum per round / 18 daily; one point for each correct ordered pair; locked guesses cannot be changed; never represent sample answers as real votes; accessible button-based ranking; no cash stakes, accounts or ads.

## Tasks

- [x] Implement and unit-test `validateRank`, `pairScore`, `sumScores`, and `dateKey`.
- [x] Author seven distinct practice-day themes, three rounds per day, with valid permutations.
- [x] Implement local guest sessions, sequential answer locking, saved-progress validation, nonspoiling practice duel links, and weekly date ranges.
- [x] Build editorial HTML/CSS with four-option ranking and no preselected answer, reveal after lock, results, share action, rules and local weekly history.
- [x] Build self-contained standalone `index.html` as the root game.
- [x] Test game scoring, date boundary, malformed sessions/links, HTML interface and complete 3-round state transitions.
- [x] Run Chromium/Playwright browser interactions and mobile-width screen capture.
- [ ] Add server-backed panel votes, benchmark freezing, verified score submission and real duel invites in a subsequent release.

## Verification

```bash
npm test
node --check web/app.mjs
```

The practice build is intentionally separate from the authoritative live product. No real crowd reference can be claimed until verified, independently collected panel voting is operational.
