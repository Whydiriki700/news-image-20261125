# news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/Whydiriki700/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/Whydiriki700/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

Halaman koran "The World in One Image" yang merangkum berita dunia Rabu 25 November 2026 dalam satu gambar 1024x1024: lead dua tanker terbakar di Selat Hormuz, panel chart pasar anjlok, enam panel berita, dan strip bawah hitam berisi kabar lain hari itu.

## Cara jalan

Render poster dari sumber HTML:

```sh
node render.mjs poster.html entry.png 1024 1024
```

Validasi dan salin entry ke folder output:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` memvalidasi entry.png (PNG asli, sisi maks 1024, maks 1 MiB, trailer IEND) lalu menyalinnya byte for byte ke folder output.

## Bounty

- Bounty: https://make.fun/bounty/news-image-20261125
- Referral: https://make.fun/r/vwpycztt

## Lisensi

MIT — lihat LICENSE.
