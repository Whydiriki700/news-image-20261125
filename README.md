# news-image-20261125 — The World in One Image

A newspaper front page for Wednesday 25 November 2026, drawn as a single 1024x1024 image. Built for the make.fun news-image-20261125 bounty, paid in USDC.

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/Whydiriki700/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/Whydiriki700/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

## Status

Frame entry. The image in this repository right now is the kit starter placeholder. The final poster is built on the morning of 26 November 2026 from the full news of Wednesday 25 November 2026, and submitted before the deadline of 27 November 2026 00:00 UTC.

## How it was built

The page is typeset in HTML with real text and rendered to PNG, so every headline stays sharp at small sizes. `main.ts` is the entrypoint: it checks `entry.png` is a genuine PNG inside the 1024x1024 and 1 MiB limits, then copies it byte for byte to `/output/entry.png` and logs the page's SHA-256 fingerprint.

Run it locally:

```
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## The bounty

[news-image-20261125 on make.fun](https://make.fun/bounty/news-image-20261125) — real bounties, real USDC. New here? Join through https://make.fun/r/vwpycztt

## License

MIT — see `LICENSE`.
