# CrowdRank

**Think you know what everyone thinks? Prove it.**

CrowdRank is a mobile-first, three-round social ranking game built with intentionally editorial UI (warm paper, ink black, signal orange, cobalt blue).

## 🎮 Play

**Practice game:** [Open index.html](./index.html) — the root file is a standalone HTML game with CSS, JavaScript and seven example daily themes embedded. You can download the file and open it directly in your browser. Once GitHub Pages is enabled, it can be played online.

The full modular source is in [web/](./web/). To serve locally:

```bash
npm run serve
```

Open `http://localhost:4173/web/` to test the modular version. Running from the repository root serves the standalone version.

## What works

- Three rounds of four choices each, with conscious ranking and no default answers.
- One point for each correctly ordered pair: 0–6 per round, 0–18 daily.
- Immediate practice reference reveal after locking each round.
- Seven rotating practice-day themes, with date in Asia/Kolkata.
- Browser-only guest progress and weekly personal history.
- Spoiler-free friend comparison links. Linked scores are not authenticated.
- Responsive editorial UI, accessible tap/reorder controls and reduced-motion styling.

**Important: ALL practice reference orders are fictional examples, NOT independently surveyed public opinion.** No public survey has been run. Results are not official, and there are no verified public leaderboards yet.

## Tests

Node.js 22 or newer:

```bash
npm test
```

See [full product design](./docs/superpowers/specs/2026-10-30-crowdrank-design.md) and [MVP limitations and hosting notes](./docs/PLAYABLE_MVP.md).

## Next production milestones

Collect consented independent rankings; lock versioned panel benchmarks; implement server-side scoring, authenticated accounts and verified duels; publish an editorial moderation and privacy flow; measure return play and friend referrals before introducing disclosed sponsor challenges.

No ads, pay-to-win, cash prizes, personal-data sales, or invented population claims are part of this practice build.

*Working title only; brand clearance remains pending.*
