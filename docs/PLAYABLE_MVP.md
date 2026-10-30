# CrowdRank playable MVP — hosting and limits

This repository contains a functional static, mobile-first **practice edition**. It is not a production, scientifically representative opinion survey or verified competition.

## How to play

The root [index.html](../../index.html) is entirely self-contained. Download it and open it in a modern browser. For full modular source, see [web/](../../web/).

For local development (Python 3 + Node 22):

```bash
npm test
npm run serve
```

Visit `http://localhost:4173/`. The modular version is also accessible at `http://localhost:4173/web/`.

## Deployment

To enable a hosted link, use **GitHub → Settings → Pages → Deploy from branch → main → /(root)**. Verify on a real mobile browser before announcing an external launch.

## Implemented

- Three rounds of four picks each, with conscious ranking and up/down/remove controls.
- Pairwise order scoring from 0 to 6 per round, up to 18 total.
- Answer reveal after each locked round with clearly presented practice reference.
- Seven authored daily practice themes rotated in Asia/Kolkata time.
- Local-device scores and weekly practice history.
- Spoiler-free practice friend links with editable/unverified scores.
- Keyboard-aware controls, reduced-motion styling, no third-party fonts/assets/analytics.

## Not yet production ready

Every reference ranking is an **illustrative, fictional example**. No real panel has voted. There is no official public-opinion evidence, authenticated identity, secure scoring server, official leaderboard, verified multiplayer duel, production editorial tooling, or monetization. Shared practice results are unverified and can be edited in URLs. Browser local storage is not tamperproof and can be wiped at any time.

Before launch: recruit an independent consented panel; collect qualified ranking votes; publish locked benchmark snapshots with real n and field dates; implement server-side idempotent scored submissions with access controls; add privacy, anti-abuse and editorial correction procedures; validate touch, keyboard and screen readers with real users; and run retention experiments. Sponsorship should always be disclosed and cannot influence correct results.

## Quality record

Core game rules, date boundaries, session integrity, malformed duel links, HTML contract, and the full three-round flow are covered by `npm test` (Node built-in runner). Browser QA was performed via Chromium/Playwright using an inline HTML rendering context; direct `localhost` navigation is blocked in the QA sandbox. Browser tests were carried out at 320, 390, 768 and 1440 CSS pixels; run public HTTPS smoke tests after Pages deploys.

Never describe these fictional rankings as what India actually thinks.
