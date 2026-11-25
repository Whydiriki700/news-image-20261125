// news-image-20261125 — gatekeeper for the final front page entry.
// Competition deadline: 27 November 2026 00:00 UTC.
// Validates entry.png (real PNG, max 1024 on each side, max 1 MiB, IEND
// trailer) and copies it byte for byte to MAKEFUN_OUTPUT_DIR (default /output).
// Deterministic: same input bytes always produce the same output bytes.
// Blind rounds (4x) judge the image alone, so this gatekeeper only checks
// the file itself and never rewrites a single pixel.

import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "entry.png";
const MAX_SIDE = 1024;
const MAX_BYTES = 1024 * 1024;

const buf = readFileSync(SRC);
if (buf.length > MAX_BYTES) {
  throw new Error(`entry.png too large: ${buf.length} bytes (max ${MAX_BYTES})`);
}
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(PNG_SIG)) {
  throw new Error("entry.png is not a real PNG");
}
if (buf.readUInt32BE(12) !== 0x49484452) {
  throw new Error("entry.png has no IHDR chunk");
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png too big: ${width}x${height} (max ${MAX_SIDE} per side)`);
}
const IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!buf.subarray(buf.length - 12).equals(IEND)) {
  throw new Error("entry.png is missing its IEND trailer");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(SRC, dest);
const outBuf = readFileSync(dest);
if (!outBuf.equals(buf)) {
  throw new Error("output bytes differ from entry.png");
}
const sha = createHash("sha256").update(buf).digest("hex");
console.log(`OK ${width}x${height} ${buf.length} bytes sha256=${sha} -> ${dest}`);
