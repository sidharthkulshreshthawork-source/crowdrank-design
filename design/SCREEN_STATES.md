# Screen-by-screen acceptance and copy

## 1. Today / entry
- Eyeline: `CROWD RANK`, date and `TODAY'S GAME`.
- Headline: `Think you know everyone?`
- Subline: `Predict what a real panel ranked. Three quick rounds. One score to beat.`
- Primary: `Play today's game`.
- Footer: `Free to play | No sign-up needed`. If no verified benchmark, show an honest unavailable state instead.
- Returning: `Continue round 2 of 3` or `Your score is ready`.

## 2. Rank
- Progress, question, objective (`Most annoying -> least annoying`).
- Four unranked options at start, numbered positions and a neutral item tray; tap/drag to place.
- `Lock my guess` disabled until all four slots hold unique choices.
- Screen-reader assistance explains `Move up`, `Move down`, and current rank.
- Exit behavior: clearly inform that an unfinished attempt can resume on this device.

## 3. Reveal
- `The crowd had other ideas.` or `You read the room.` based on actual score.
- Visible `YOU GUESSED` and `THE PANEL RANKED` columns.
- Display `5 / 6 correct pairs` and a compact explanation of pairwise scoring.
- Provenance visible: `Panel: [n] independently collected votes | [date range] | [cohort]`.
- Primary: `Next round`.
- Benchmark invalidated: hide competitive result, explain correction and next step; no fabricated score.

## 4. Results
- Dominant `14 / 18` score with label `TODAY'S RESULT`.
- Round strip `R1 5/6 | R2 4/6 | R3 5/6`.
- CTA: `Challenge a friend` and secondary `See weekly standings`.
- Share card: `I scored 14/18 on CrowdRank. Can you read the room better?` + link; no answer spoilers.
- Optional signin: `Keep your score on every device`, not a blocker for play.

## 5. Duel
- Before play: `Someone thinks they know the crowd better than you.`
- Reveal inviter identity only with their explicit opt-in; otherwise say `A friend challenged you`.
- Do not reveal inviter's score until the invited player finishes or forfeits.
- After both finish: `You won by 2 points`, `Tied at 14`, or `They won by 2`.
- Expired: `This challenge is closed. Explore it as practice, without leaderboard points.`

## 6. Leaderboard
- Opt-in display name and verified account required for public listing.
- Columns: Rank (ties share rank), Player, Points, Days played.
- Explain new week rollover and official score policy.
- Report and moderation actions are accessible.

## 7. Vote for later
- `YOUR opinion, not your prediction.`
- Separate consented data pipeline, independent of current game's panel.
- `Skip` is equally accessible; collect no sensitive free text.

## Core error states
- Offline: `No connection. Your unfinished selection is safe on this device. Reconnect to lock your guess.`
- 409 duplicate: `Today's official score is already locked. View your result.`
- 422 invalid rank: `Place all four options exactly once.`
- 503 invalidated sample: `This round was withdrawn because the benchmark could not be trusted.`
- Region/language mismatch: show the explicit panel cohort and do not claim nationwide representativeness.

All numbers on design mockups are **sample-only**, not verified player activity.