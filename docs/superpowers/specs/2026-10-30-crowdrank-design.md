# CrowdRank - Product, Experience, and System Design V1

**Date:** 2026-10-30  
**Stage:** Written specification for owner review, following approval of the high-level V1 direction.  
**Delivery:** A design-only repository. Implementation is explicitly out of scope until this document is reviewed and an implementation plan is approved.

## 1. Problem, objective, and success

Social polls ask people to supply an opinion, but rarely create gameplay. CrowdRank asks a harder and more interesting question: **How well can you predict what a real crowd believes?** Each player makes three quick predictions per day, compares them with an independently locked result, and challenges friends to beat their score.

**Primary audience:** Mobile-first, English-comfortable people in India aged roughly 18+ who enjoy short games, social comparisons, surprising opinion results, and sharing links in WhatsApp/Instagram. The product must not exclude older users. Local-language editions are a future option, not a launch dependency.

**Player promise:** Play for approximately 60-120 seconds, get a satisfying and honest reveal, compare with a friend, and find a fresh challenge tomorrow.

**Business objective:** First prove voluntary repeat play and friend referral; later monetize clearly labeled sponsorship and creator rooms. Ads, paid entry, and data resale must not distort trust in rankings.

**V1 success targets (hypotheses, not historical benchmarks):** >=70% game completion among players starting a round; >=25% next-day retention, >=10% day-seven retention, and >=10% of completed players actively sharing a challenge. Report actual numbers and cohort definitions.

## 2. Design and trust principles

1. **One purpose per screen.** First play, then discover, then share. No persistent clutter, modal traps, or gratuitous upsells.
2. **No invented consensus.** Only score against pre-committed, independently gathered panel votes. Show exact sample size, voting window, and cohort. Never label a convenience sample "what India thinks" without clear qualification.
3. **No fake urgency.** No fabricated countdowns, streak punishments, fake scarcity, or artificial player counts.
4. **Fair competition.** Fixed questions and frozen answers for each day's contest; one officially ranked attempt per signed-in account per day.
5. **Game first, account later.** Guest can play the full daily game; only ask to sign in when saving cross-device records or joining public leaderboards.
6. **Designed, not templated.** Editorial typography, warm tactile surfaces, game-show scoring, high-contrast feedback, intentionally restrained motion.
7. **Private by default.** Avoid scraping public identities or selling identifiable vote data. Explain what is collected, consent for optional research, and provide deletion/export pathways as legally required.

## 3. Core mechanic

### 3.1 Content

- One challenge per India calendar date (Asia/Kolkata), comprising exactly three ordered rounds.
- Each round contains one plain-language prompt and four distinct, independently ranked choices.
- Questions should be quick to understand, relevant, specific, respectful, and safe for a general adult audience.
- Exclude political persuasion, protected-group denigration, sexual material, personal data, unsupported accusations, and misleading public-interest claims from the initial editorial catalog.
- Content editor proposes prompt/options, runs moderation and ambiguity checks, reviews panel vote quality, then signs off before publication.

### 3.2 Two separated input types

**Panel votes** = a participant's *own preference ordering*, collected in a separate, consented survey before publication. These make up the benchmark.  
**Player predictions** = guesses about how that panel ranked those options, submitted after the benchmark is frozen. These can never mutate that benchmark.

No round becomes eligible for scoring without a valid locked panel sample. For the first launch use a conservative editorial minimum (suggested 100 valid independent panel respondents per round), flag it as a provisional policy and raise it as scale allows. Record nonresponse/quality exclusions. The sample is an opt-in panel, **not** a representative census. If insufficient, publish a different qualified round instead of manufacturing votes.

### 3.3 Aggregate crowd ranking

For a 4-option panel vote, assign 4, 3, 2, 1 points to first through fourth ranked choices. Sum weighted points across all valid panel votes. Sort descending to create the **locked crowd order**. If totals tie, compare the number of first-place votes, then second-place votes, then third-place votes. If still tied, a round is ambiguous and must not be published as a competitive round until editorially resolved with new valid votes. Never secretly choose an order to award points.

Keep: raw versioned counts, sample n, collection dates, eligible cohort, algorithm version, published order, and a cryptographic digest of the frozen aggregate. The digest provides an audit anchor; it alone does not prove the sampling is representative.

### 3.4 Player ranking interaction

The four options begin in a neutral, visibly unranked tray. Player taps an option to place it in rank 1, 2, 3, or 4 (next available), or drags cards into numbered positions. Tap again or use Move Up / Move Down controls to revise before submitting. **No default ordering is pre-selected**: the player must make a conscious guess. Lock button is disabled until all four choices are ordered.

Confirm button text: **Lock my guess**. Once locked, cannot edit that round. A short, interruptible reveal shows the crowd ordering alongside the player's prediction and the pairwise points earned. Then: **Next round**. There is no need to withhold results behind a second user action or an ad.

### 3.5 Transparent scoring

For four unique options there are `C(4,2)=6` unordered pairs. Award **1 point** for every pair whose relative order in the player's guess agrees with the locked crowd ordering. Round score: integer from 0 to 6. Daily score = sum across 3 rounds: **0 to 18**. No random bonuses, paid multipliers, or mysterious AI scores.

Example: locked order `[A,B,C,D]`, prediction `[B,A,C,D]` gets 5/6 because only pair A/B is reversed. Show feedback such as `5 of 6 pair decisions matched` and visual ticks that clarify why.

**Tie handling in leaderboards:** highest total score wins; ties share the same rank (competition ranking), displayed with equal points. Do not break ties with fast-click speed, device latency, spending, or follower count. If necessary, display tied entries alphabetically, but not as distinct performance ranks.

### 3.6 Daily challenge lifecycle

- Scheduled publication at 00:00 Asia/Kolkata; record times in UTC.
- The three rounds, benchmark rankings, and scoring rules become immutable for that day.
- The daily challenge is open for official scoring until 23:59:59.999 Asia/Kolkata.
- A guest may practice expired rounds with clear `Archive practice - unranked` labeling; no official archived score can improve current standings.
- If the benchmark or editorial content is materially flawed, administrators can invalidate the round, hide affected standings, post a correction, and issue a transparent score adjustment; never silently change answers.

## 4. The critical user flows

### 4.1 First visit (zero sign-up friction)

1. Shared link or homepage loads a small responsive app shell, with today's date, challenge promise, and one primary CTA: `Play today's challenge`.
2. Intro instruction uses one annotated four-choice example; users can skip. No mandatory multi-screen onboarding.
3. Round 1 opens. Four choices, one question, clear rank positions, progress `1 of 3`.
4. Player orders choices and locks the guess.
5. Immediate benchmark reveal with truthful panel provenance and score breakdown.
6. Repeat rounds 2 and 3; results screen displays score /18, play summary, and a compelling but spoiler-safe CTA `Challenge a friend`.
7. Optional account callout appears only after the full experience: `Save your rank across devices`.

### 4.2 Returning player

- Open to today's unfinished round or today's results if already completed on the same recognized session/account.
- Display weekly competition progress but never put it ahead of today's playable question.
- If a device is unrecognized and the user is a guest, explain that prior guest scores may not transfer rather than asserting cross-device identity.

### 4.3 Friend duel

- Player shares a deep link with day, challenge version, inviter token, and no result-spoiling data.
- Friend opens the exact same day's three rounds while scoring is open; inviter score is shown only after friend finishes or chooses to forfeit.
- The friend sees `You beat X by 2 points`, `You tied`, or `X won by 2`, with both real scores. If friend never plays, no fabricated notification.
- If the day expires, an archive comparison is available but is labeled unranked (unless both completed within the contest window).
- Links contain an opaque invitation ID, not email/phone or private profile information.

### 4.4 Independent opinion panel

- A separate route asks what **the participant personally thinks**, never what they guess a crowd thinks.
- Use plain-language consent, allow skip, and store each panel response with its cohort, timestamp, eligibility, and pseudonymous respondent key.
- Do not let the same daily predictions backfill that day's locked benchmark. Panel votes can support future challenges after quality checks.
- Publish clear methodology and `n` to the player when results appear.

### 4.5 Weekly competition

- Week Monday 00:00 to next Monday 00:00 Asia/Kolkata.
- Sum first valid daily scores per authenticated user. The week displays the highest attainable points based on number of active days.
- Public leaderboard requires sign-in, a non-offensive public display name, spam protection and moderation. Guest scores remain local-only and do not enter public ranks.
- Only compare people fairly: show number of days played alongside total score. Optional average score can appear, but cannot secretly replace official ordering.

## 5. Exact screen and state requirements

**A. Today / Play** - Brand wordmark, date, one-line hook, current round and one primary CTA. Avoid newsfeed, banners, or sponsor clutter. Loading, unavailable, expired, returning and offline states must be explicit.

**B. Rank** - Question, progress, four responsive cards, rank slots, tap and drag support, visible up/down controls for accessibility, enabled lock button only at 4/4. Screen readers announce card rank and movement. Keyboard and touch are equal-first interactions.

**C. Reveal** - Numeric points 0-6, player order vs locked panel order, exact panel n / cohort / field dates. The animation may draw a comparison but must not hide data behind theatrics. Add a compact `How points work` explainer.

**D. Results / Share** - Score 0-18, three round points, legitimate personal best if stored, share text preview that hides the answers, and optional opt-in account prompt. One primary CTA, one quiet secondary CTA.

**E. Duel** - Opening invitation preview, friend name only if voluntarily shared, play CTA, comparison after both valid attempts, graceful expiry handling.

**F. Weekly standings** - Authenticated-only public top list; opt-in display names, score and days played, tie handling, reporting/hide controls. Never show precise location.

**G. Vote for future round** - Distinct "What do YOU think?" visual treatment, consent and methodology, easy skip.

**H. Settings / trust** - Rules, method, privacy/consent, language, accessibility, delete account, report a question and support link.

All screens require design states: default, loading, empty, offline, errors, returning guest, authenticated player, time expiry, benchmark invalidation, and reduced motion. See `design/SCREEN_STATES.md` for copy and acceptance details.

## 6. Editorial and conversation engine

The core content is the game, not a Reddit clone or comment section. Start with four recurring topic lanes: social life, money habits, daily frustrations, and cultural preferences. Each prompt should be relatable without implying a scientific population survey.

Editorial checklist per question:
- Can someone read the question/options in under 10 seconds?
- Are the four choices independently understandable and not overlapping?
- Is the ordering unambiguous (e.g. `most annoying -> least annoying`)?
- Is the group being surveyed clearly defined?
- Can a player be surprised, yet not misled, by the outcome?
- Is the topic safe for public participation and advertiser suitability?
- Does the question avoid asking users to divulge sensitive personal details?

No public comments in V1: avoid harassment, moderation costs, and a second social graph until gameplay works. Use a private abuse-reporting channel and editorial correction procedure.

## 7. Proposed technical architecture (design only)

**Clients:** Responsive mobile-first web application, progressively enhanced to installable PWA later. Guest access via a server-issued anonymous session token. `prefers-reduced-motion` respected. No dependency on Instagram or YouTube SDKs for V1.

**API:** Versioned HTTP API with server-side scoring and authorization. One validated attempt per account/day; idempotent submission endpoint; explicit consistency checks against the frozen challenge version. Do not send benchmark rank/order to the browser until a player's corresponding round is locked; clients are untrusted and perfect anti-cheat is not promised.

**Store:** PostgreSQL with migrations and immutable versioned benchmark snapshots. Redis/cache optional only if measurements justify it; avoid complexity initially. Separate editorial staging and publication paths. A scheduled job publishes prevalidated challenge snapshots; admin rollback/invalidations are audited.

**Core entities:** `User`, `GuestSession`, `ChallengeDay`, `Round`, `Option`, `PanelRespondent`, `PanelVote`, `BenchmarkSnapshot`, `PredictionAttempt`, `RoundGuess`, `DuelInvite`, `WeeklyStanding`, `EditorialAudit`, `Sponsorship`, `ConsentRecord`.

**Suggested API contracts (non-binding draft):**
- `GET /api/v1/challenges/today` returns round content, lock status, dates, but no unrevealed benchmark.
- `POST /api/v1/attempts` starts or resumes one attempt for the client session.
- `PUT /api/v1/attempts/{id}/rounds/{id}` atomically locks a ranked guess with idempotency key and returns server-scored reveal.
- `GET /api/v1/attempts/{id}/results` returns official summary only after all rounds locked.
- `POST /api/v1/duels` generates an opaque share invitation.
- `GET /api/v1/duels/{opaque-id}` returns invitation context without spoilers.
- `GET /api/v1/leaderboards/weekly` returns public opt-in standings and last-updated timestamp.
- Distinct consented vote endpoints for future panels; **never** silently merge predictions into panel votes.

**Admin and security:** Enforce content review and sampling audit before publication; rate limits, CSRF protection where applicable, server validation, secure session cookies, anti-bot detection proportionate to abuse, suspicious-vote exclusion logs, restricted admin roles, encryption in transit, retention limits, data deletion requests, and monitoring. User-generated links must not enable open redirects.

**Data minimization:** Avoid collecting address/phone by default. City competitions (not V1) should use voluntary city selection, not precise location. Document retention separately for anonymous guesses vs opt-in panel votes.

**Analytics events:** `app_open`, `round_started`, `rank_complete`, `guess_locked`, `reveal_viewed`, `challenge_completed`, `share_invoked`, `duel_opened`, `duel_completed`, `guest_account_linked`, `vote_consent`, `vote_submitted`, `benchmark_invalidated`; include anonymized challenge/version and experiment cohort. Never include personal free-text details in event payloads.

## 8. Visual design system

**Positioning:** Editorial print meets 30-second competitive game show: warm paper surfaces, ink typography, crisp signal-orange actions, cobalt for score comparisons. Distinctive without emoji spam or pseudo-3D. No generic SaaS dashboard shell, gradient hero, floating glass panels, or AI-generated illustration collage.

**Key tokens:** `design/tokens.json` - ink #171719, paper #F3EFE6, signal orange #FF5A39, cobalt #3653B7, surface #FFFFFF, muted #666761. Typography: Inter Display or a similarly strong grotesk for numeric and display text, Inter for body; use system fallbacks. Wordmark custom styling, not a downloadable font asset.

**Layout:** 4/8-point spacing rhythm; safe-area-aware mobile layouts at 320-430 CSS px, responsive max-width ~480 px for play column, 44x44 px minimum tap areas, 16 px body baseline, visible focus states and keyboard support. Primary CTA anchored after interaction, not covering bottom safe area.

**Motion:** 120-220 ms purposeful rank movement and scored pair reveals; animation can be skipped; avoid incessant celebration, artificial jitter, loading theater, or motion-only status. Optional sound is OFF by default.

**Copy:** Direct, witty, human. Use `Who do you think chose this?`, `Lock my guess`, `The crowd had other ideas`, `Challenge a friend`. No invented player counts or fake personalization. Samples in previews explicitly labeled illustrative.

## 9. Monetization strategy and guardrails

**Before engagement is proven:** Free game. No forced video ads, pay-to-win, paid leaderboards, paid entry, or cash prize contests. Validate retention first.

**Stage 1 experiment:** One clearly labeled sponsor can underwrite a daily set, but has no power to change the benchmark or ranking. Avoid deceptive sponsored content: identify the brand and make it clear the research results are independently collected.

**Stage 2 experiment:** Creator rooms with branded questions, separate leaderboards, and basic aggregate insights; charge creators / communities for tools rather than players for competitive advantage. Keep sponsored data distinct from independent benchmarks.

**Stage 3 (conditional):** Platform-compliant ad inventory or optional cosmetics if engagement and platform rules permit. Embedded platform rules vary; do not assume ordinary web ads are permitted within YouTube Playables or Instagram games.

**Never:** Sell identifiable player data, allow a sponsor to alter an answer, monetize through gambling-like financial stakes, or hide important privacy disclosures.

## 10. Experiment and delivery sequencing

- **Prelaunch:** Recruit a small consented voting panel, create at least 7 fully checked challenge days, manually QA benchmark locks, score formulas, copy and accessibility.
- **Week 1:** Release lightweight guest mobile website with one fully usable 3-round daily experience and spoiler-free sharing.
- **Week 2:** Test genuine duels, referral flow, account linking, and content cadence; recruit more independent panel votes.
- **Week 3:** Introduce opt-in weekly standings if cheating and identity controls are ready; test reveal clarity and speed.
- **Week 4:** Compare completion, return, and invite conversion cohorts against targets; decide whether to expand topics and cities.

**Decision rule:** If people share but don't return, fix the game and editorial calendar before spending on acquisition. If they return but don't share, improve the duels. If votes cannot be collected independently and reliably, pause ranked competition rather than showing false public consensus.

## 11. Acceptance tests for implementation planning

1. New visitor can start a scored game without creating an account.
2. A round cannot be submitted until exactly four unique choices are ranked.
3. A submitted ranking returns an auditable integer score in [0,6] against a frozen, eligible benchmark; a day sums to [0,18].
4. Benchmark predictions never change the published crowd order; only separated panel votes can inform future snapshots.
5. A benchmark cannot publish if it fails minimum sample or unresolved tie checks.
6. No answer is revealed to a player before they lock that round; server enforces the rule.
7. Repeat official submissions cannot inflate weekly rankings; ties display fairly.
8. A shared link never spoils answers or reveals unconsented personal information.
9. Challenge expiration, incomplete rounds, offline transitions and server errors all preserve honest and recoverable state.
10. All controls work with screen reader, keyboard and touch; focus is visible, minimum touch targets and reduced-motion are respected.
11. Sponsored challenges are labeled and cannot change scoring or the underlying panel result.
12. No simulated or placeholder crowd statistics appear in production UI.

## 12. Risks and unresolved choices for owner review

- **Panel operations:** 100 independent participants per round is an initial quality proposal, not proof of representative public opinion. If panel recruitment is costly, narrower claims and carefully vetted cohorts are essential.
- **Brand clearance:** CrowdRank is a working title; check name/domain/trademark before commercial launch.
- **Age policy:** Initial content and monetization are for an adult/general audience. Decide age gates and regional privacy obligations in the implementation plan.
- **Ranking integrity:** Anonymous guests can clear browser state; only verified accounts can enter official public leaderboards. Fraud monitoring must evolve with abuse.
- **Content cadence:** Three daily rounds require 21 approved questions each week plus buffer; review actual editorial capacity.
- **Localization:** Hinglish and regional languages could improve reach, but translation can shift poll meaning. Keep benchmark language/cohorts explicit.
- **Platform integration:** YouTube/Meta game publishing requires separate platform acceptance and compliance; V1 remains independent web.

## 13. Explicitly out of V1

Live public comments, anonymous user-uploaded question feeds, SMS spam notifications, cash rewards, crypto, microtransactions, paid score boosts, avatar loot boxes, location tracking, forced login, city competition, real-time multiplayer physics, complex RPG progression, and an automatic AI-generated content pipeline without human editorial review.

---

**Approval requested:** Please review this written specification and its static design previews. Approval of this file permits the next implementation-planning stage, not automatic publication of a production game.