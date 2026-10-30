# CrowdRank visual language

**Creative thesis:** a public-opinion game wearing the clothes of a contemporary editorial publication and a live contest. Not a survey, SaaS dashboard, crypto app, quiz template, or manufactured social feed.

- **Paper:** #F3EFE6. A warm, matte neutral that feels owned rather than default-white.
- **Ink:** #171719. Dominant text, high contrast and decisiveness.
- **Signal:** #FF5A39. Primary action, active ranking chip, a single punchy highlight per scene.
- **Cobalt:** #3653B7. Ranking comparison, score-related marks, and playful precision.
- **White:** #FFFFFF. Actual playable cards that need focus.
- **Muted ink:** #666761. Secondary metadata only, never essential instructions.
- **Border:** #D7D4CB. Quiet delineation rather than card shadows everywhere.

Typography: Inter Display Black for oversized display, Inter Medium/Regular for controls and prose. Use system fallbacks; avoid bundling license-sensitive fonts. Use a tabular numeral style for scoring. The wordmark should be typeset as an editorial lockup: **CROWD** + **RANK**, with a small signal-dot or offset rectangle (not a generic mascot).

Layout: centered 390 px mobile-first game canvas on desktop, meaningful paper margins, no fake app chrome. Hero question should be the strongest element. At most one primary orange CTA per view. Rank cards provide 48+ px touch areas. Cards are flat white with one crisp stroke and selective cobalt/ink emphasis. Progress is quiet, such as `01 / 03` and a short rule.

Motion: cards settle with a subtle 160 ms transform. Reveals sequence from question to crowd order to 0-6 result within 700 ms, with complete static fallback under reduced motion. Haptics optional; sound off by default.

**Hallmark-inspired quality floor:** one primary action per screen, accessible focus and reduced motion, no invented activity, no ornamental UI without a role, no random gradients, no repeated eyebrow labels, no nonfunctional controls, and no fake forms claiming submission. Static screen images are *concept illustrations*, not interactive UI.