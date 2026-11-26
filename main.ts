// news-image-20261125 — resubmit (round 2) fixing the round-1 run_completes failure.
// The first entry's program exited with code 1, so this version follows the
// proven NI24 pattern: the script folder comes from process.argv[1], and the
// poster entry.png sitting next to this file is copied byte for byte into the
// output folder. Deterministic, no network, nothing is written outside the
// output folder and nothing is read from outside this repository.
//
// Why argv[1] and not import.meta.url: the first program found its own folder
// through the module URL, and that lookup is what died on the grader — it
// exited with code 1 before writing anything. argv[1] is simply the path
// Node was told to run, so its dirname is the folder holding this file, with
// no URL parsing and no module-system behaviour standing in the way.
import { copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

const scriptDir = dirname(process.argv[1]);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

copyFileSync(join(scriptDir, "entry.png"), join(outputDir, "entry.png"));
