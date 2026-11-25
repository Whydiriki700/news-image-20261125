// news-image-20261125 — frame entry publisher.
//
// This is the frame for Wednesday 25 November 2026: the kit starter image
// stands in for now, and the final newspaper front page for the full day
// replaces entry.png on the morning of 26 November, before the deadline
// of 27 November 2026 00:00 UTC.
//
// The program below is only a gatekeeper. It proves entry.png is a real
// PNG, no side over 1024 px, total size at most 1 MiB, and its IEND trailer
// present, then copies it byte for byte to the output directory so the
// grader sees exactly the bytes in this repository.
//
// Frame commit: starter image only; the final page replaces it before the deadline.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_SIDE = 1024;
const MAX_BYTES = 1024 * 1024;

function readDimensions(image: Buffer): { width: number; height: number } {
  if (image.length < 24) {
    throw new Error("entry.png is too small to hold a PNG header");
  }
  if (!image.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    throw new Error("entry.png does not open with the PNG signature");
  }
  if (image.toString("latin1", 12, 16) !== "IHDR") {
    throw new Error("entry.png has no IHDR chunk where one is required");
  }
  return { width: image.readUInt32BE(16), height: image.readUInt32BE(20) };
}

function endsWithIend(image: Buffer): boolean {
  if (image.length < 12) return false;
  const tail = image.subarray(image.length - 12);
  return tail.readUInt32BE(0) === 0 && tail.toString("latin1", 4, 8) === "IEND";
}

function publishFrontPage(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const pagePath = join(here, "entry.png");
  if (!existsSync(pagePath)) {
    throw new Error("entry.png is missing from the repo root");
  }
  const page = readFileSync(pagePath);
  if (page.length > MAX_BYTES) {
    throw new Error(`entry.png weighs ${page.length} bytes, past the 1 MiB cap`);
  }
  if (!endsWithIend(page)) {
    throw new Error("entry.png looks truncated: its IEND trailer is absent");
  }
  const { width, height } = readDimensions(page);
  if (width > MAX_SIDE || height > MAX_SIDE) {
    throw new Error(`front page measures ${width}x${height}, past the 1024 cap`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.png");
  writeFileSync(outPath, page);
  const verify = readFileSync(outPath);
  if (!verify.equals(page)) {
    throw new Error("the published copy does not match entry.png byte for byte");
  }
  const fingerprint = createHash("sha256").update(page).digest("hex");
  console.log(
    `front page published: ${width}x${height}, ${page.length} bytes, sha256 ${fingerprint} -> ${outPath}`,
  );
}

publishFrontPage();
