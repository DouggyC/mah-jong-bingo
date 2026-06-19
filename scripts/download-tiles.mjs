#!/usr/bin/env node
/**
 * Download all 144 Mahjong tile SVGs from Wikimedia Commons.
 * License: CC BY-SA 4.0 (attribution: 碧海风, 2018)
 * Source: https://commons.wikimedia.org/wiki/Category:SVG_Planar_illustrations_of_Mahjong_tiles
 *
 * Uses Special:FilePath which handles Unicode filenames and redirects to the
 * correct upload.wikimedia.org URL.
 */
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TILES_DIR = join(__dirname, '..', 'public', 'tiles');
const CONCURRENCY = 2; // Wikimedia rate-limits aggressive concurrency
const DELAY_MS = 800;   // delay between requests within a worker

const MAP = [
  ['0101一萬.svg', 'C1'], ['0102二萬.svg', 'C2'], ['0103三萬.svg', 'C3'],
  ['0104四萬.svg', 'C4'], ['0105五萬.svg', 'C5'], ['0106六萬.svg', 'C6'],
  ['0107七萬.svg', 'C7'], ['0108八萬.svg', 'C8'], ['0109九萬.svg', 'C9'],
  ['0201一餅.svg', 'D1'], ['0202二餅.svg', 'D2'], ['0203三餅.svg', 'D3'],
  ['0204四餅.svg', 'D4'], ['0205五餅.svg', 'D5'], ['0206六餅.svg', 'D6'],
  ['0207七餅.svg', 'D7'], ['0208八餅.svg', 'D8'], ['0209九餅.svg', 'D9'],
  ['0301一條.svg', 'B1'], ['0302二條.svg', 'B2'], ['0303三條.svg', 'B3'],
  ['0304四條.svg', 'B4'], ['0305五條.svg', 'B5'], ['0306六條.svg', 'B6'],
  ['0307七條.svg', 'B7'], ['0308八條.svg', 'B8'], ['0309九條.svg', 'B9'],
  ['0401東風.svg', 'WE'], ['0403南風.svg', 'WS'],
  ['0402西風.svg', 'WW'], ['0404北風.svg', 'WN'],
  ['0405中.svg', 'DR'], ['0406發.svg', 'DG'], ['0407白.svg', 'DW'],
  ['0501春.svg', 'SS'], ['0502夏.svg', 'SU'],
  ['0503秋.svg', 'SA'], ['0504冬.svg', 'SW'],
  ['0505梅.svg', 'FP'], ['0506蘭.svg', 'FO'],
  ['0507菊.svg', 'FC'], ['0508竹.svg', 'FB'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(src, dest, retries = 4) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(src)}`;
  const out = join(TILES_DIR, `${dest}.svg`);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'MahjongBingoApp/1.0 (https://github.com/local/mah-jong-bingo; educational)',
          'Accept': 'image/svg+xml,*/*',
        },
        redirect: 'follow',
      });
      if (res.status === 429) {
        const backoff = 3000 * attempt;
        console.log(`  429 ${dest} (retry ${attempt}/${retries}, sleeping ${backoff}ms)`);
        await sleep(backoff);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) throw new Error(`Suspiciously small: ${buf.length}b`);
      const head = buf.subarray(0, 200).toString('utf8');
      if (!head.includes('<svg') && !head.includes('<?xml')) {
        throw new Error('Not an SVG');
      }
      await writeFile(out, buf);
      return { ok: true, src, dest };
    } catch (err) {
      if (attempt === retries) return { ok: false, src, dest, error: err.message };
      await sleep(1000 * attempt);
    }
  }
}

async function main() {
  await mkdir(TILES_DIR, { recursive: true });
  console.log(`Downloading ${MAP.length} tile images (concurrency=${CONCURRENCY}, delay=${DELAY_MS}ms)...`);
  const results = [];
  let i = 0;
  async function worker(id) {
    while (i < MAP.length) {
      const idx = i++;
      const [src, dest] = MAP[idx];
      process.stdout.write(`[w${id}] ${dest} `);
      const r = await fetchOne(src, dest);
      results.push(r);
      console.log(r.ok ? 'OK' : `FAIL: ${r.error}`);
      await sleep(DELAY_MS);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, (_, k) => worker(k + 1)));
  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok);
  console.log(`\n=== Result: ${ok}/${MAP.length} succeeded ===`);
  if (fail.length) {
    console.log('Failures:');
    fail.forEach((f) => console.log(`  ${f.dest} <- ${f.src}: ${f.error}`));
  }
  const files = await readdir(TILES_DIR);
  console.log(`Files in ${TILES_DIR}: ${files.length}`);
  process.exit(fail.length ? 1 : 0);
}

main();
