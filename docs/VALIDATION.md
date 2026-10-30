# Validation and commercial readiness

## Instrumentation
- Load -> round started -> rank completed -> guess locked -> reveal viewed -> 3-round completed.
- Completed -> share invoked -> recipient opened -> recipient completed -> both compare scores.
- Return cohorts by first-play date and by invitation source; distinguish D1 (next day) vs D7 (seven calendar days later).
- Independent-vote coverage and quality: sample n, invalid votes, overlapping respondent identifiers, unbalanced cohorts, age/region/consent restrictions.

## Provisional targets (internal experiments, not measured benchmarks)
| Metric | Target | Failure response |
|---|---:|---|
| Round-to-game completion | >=70% | Simplify rank UI; improve prompt clarity |
| D1 player retention | >=25% | Improve tomorrow's content and the reason to return |
| D7 player retention | >=10% | Check whether content and score progress remain valuable |
| Shares among game completers | >=10% | Improve spoiler-free share card and duel payout |
| Share-to-invitee-start | Baseline then optimize | Remove friction on incoming links |

Define denominator and acquisition channel for every metric; don't mix paid and organic cohorts. Exclude test/bot traffic. Publish actual measured results without rounding into invented success.

## Revenue tests, in order
1. No forced ads during initial retention tests.
2. Clearly labeled sponsorship with no ability to change game answers.
3. Creator-hosted challenges with separate community engagement metrics.
4. Optional platform-compliant advertisements or cosmetic payments if evidence justifies them.

## Risk log
- "Everyone thinks" copy can overstate representativeness: always cite the specific opt-in panel.
- Incentives can contaminate responses: keep panel and prediction incentives separated.
- Ranking may reward lucky guesses: weekly scores and daily consistency give a fuller skill signal.
- Abuse may target public leaderboards: verified accounts and replay policies are required.
- Reels/Playables integration relies on platform acceptance; independent web is the distribution fallback.