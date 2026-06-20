/**
 * Mahjong Bingo — tile manifest.
 *
 * Each tile is identified by a short code that the caller types into the input
 * panel. Codes are case-insensitive in the UI but stored uppercase here.
 *
 * Images live in `/public/tiles/<CODE>.png` and are served as static assets
 * alongside the bundle (no external network calls at runtime).
 *
 * Suit overview (in display order in the legend):
 *   characters : C1–C9  — 一萬, 二萬, ... (numbered Characters / 萬子)
 *   marbles    : M1–M9  — 一餅, 二餅, ... (numbered Marbles / 餅子)
 *   bamboo     : B1–B9  — 一條, 二條, ... (numbered Bamboo / 索子)
 *   birthday   : 90, AN, H90, BC — 90th-birthday themed tiles (replaces
 *                  the four traditional wind tiles 東南西北)
 *   dragon     : DR, DG — Red Dragon (中) and Green Dragon (發)
 *                  (the White Dragon tile is not in this set)
 *   flower     : RF1–RF4, BF1–BF4 — Plum, Orchid, Chrysanthemum, Bamboo,
 *                  in red and blue variants
 *   compass    : CS, CN, CE, CW — Spring, Summer, Autumn, Winter directions
 *                  (replaces the four traditional season tiles 春夏秋冬)
 *   tile       : YT, GT — Yellow tile, Green tile
 *   west       : YW, GW, BW, PW, PKW — Yellow, Green, Blue, Purple, Pink
 *                  "west" tiles
 *   dice       : YD, GD, RD, BD, WD, BLD — Yellow, Green, Red, Blue,
 *                  White, Black dice
 *   animal     : RO, CA, RA, WO, RS — Rooster, Cat, Rat, Worm, Red snake
 *   flag       : FA, FP — Flag AUS, Flag PNG
 *   misc       : BB, HJ, FC, RF, MJS, MJSO, MJT, GDI, CL, JK —
 *                  Buck bun, Hoong Joong, Fat Choy, Red Fei, Mahjong set,
 *                  Mahjong solitaire, Mahjong table, Green dealer indicator,
 *                  Clown, Joker
 */

export type TileCode =
  // Characters 萬
  | `C${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  // Marbles 餅
  | `M${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  // Bamboo 條
  | `B${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  // Birthday
  | '90'
  | 'AN'
  | 'H90'
  | 'BC'
  // Dragons
  | 'DR'
  | 'DG'
  // Flowers (red set: RF1-RF4, blue set: BF1-BF4)
  | `RF${1 | 2 | 3 | 4}`
  | `BF${1 | 2 | 3 | 4}`
  // Compass
  | 'CS'
  | 'CN'
  | 'CE'
  | 'CW'
  // Tile
  | 'YT'
  | 'GT'
  // West
  | 'YW'
  | 'GW'
  | 'BW'
  | 'PW'
  | 'PKW'
  // Dice
  | 'YD'
  | 'GD'
  | 'RD'
  | 'BD'
  | 'WD'
  | 'BLD'
  // Animals
  | 'RO'
  | 'CA'
  | 'RA'
  | 'WO'
  | 'RS'
  // Flags
  | 'FA'
  | 'FP'
  // Misc
  | 'BB'
  | 'HJ'
  | 'FC'
  | 'RF'
  | 'MJS'
  | 'MJSO'
  | 'MJT'
  | 'GDI'
  | 'CL'
  | 'JK';

export interface Tile {
  code: TileCode;
  image: string; // Path under /public, e.g. "/tiles/M5.png"
  english: string; // English label (e.g. "5 Marbles")
  chinese?: string; // Optional Chinese label (e.g. "五餅")
  suit:
    | 'characters'
    | 'marbles'
    | 'bamboo'
    | 'birthday'
    | 'dragon'
    | 'flower'
    | 'compass'
    | 'tile'
    | 'west'
    | 'dice'
    | 'animal'
    | 'flag'
    | 'misc';
}

/**
 * Build the manifest at module load. Each entry's `image` is set to
 * `/tiles/${code}.png` — matching the static asset filename convention.
 */
const build = (
  codes: {
    code: TileCode;
    english: string;
    chinese?: string;
    suit: Tile['suit'];
  }[],
): Record<TileCode, Tile> =>
  Object.fromEntries(
    codes.map((c) => [c.code, { ...c, image: `/tiles/${c.code}.png` }]),
  ) as Record<TileCode, Tile>;

export const TILES = build([
  // ───── Characters 萬 (wan) — C1–C9 ─────
  { code: 'C1', english: '1 Character', chinese: '一萬', suit: 'characters' },
  { code: 'C2', english: '2 Characters', chinese: '二萬', suit: 'characters' },
  { code: 'C3', english: '3 Characters', chinese: '三萬', suit: 'characters' },
  { code: 'C4', english: '4 Characters', chinese: '四萬', suit: 'characters' },
  { code: 'C5', english: '5 Characters', chinese: '五萬', suit: 'characters' },
  { code: 'C6', english: '6 Characters', chinese: '六萬', suit: 'characters' },
  { code: 'C7', english: '7 Characters', chinese: '七萬', suit: 'characters' },
  { code: 'C8', english: '8 Characters', chinese: '八萬', suit: 'characters' },
  { code: 'C9', english: '9 Characters', chinese: '九萬', suit: 'characters' },

  // ───── Marbles 餅 (bing) — M1–M9 ─────
  { code: 'M1', english: '1 Marble', chinese: '一餅', suit: 'marbles' },
  { code: 'M2', english: '2 Marbles', chinese: '二餅', suit: 'marbles' },
  { code: 'M3', english: '3 Marbles', chinese: '三餅', suit: 'marbles' },
  { code: 'M4', english: '4 Marbles', chinese: '四餅', suit: 'marbles' },
  { code: 'M5', english: '5 Marbles', chinese: '五餅', suit: 'marbles' },
  { code: 'M6', english: '6 Marbles', chinese: '六餅', suit: 'marbles' },
  { code: 'M7', english: '7 Marbles', chinese: '七餅', suit: 'marbles' },
  { code: 'M8', english: '8 Marbles', chinese: '八餅', suit: 'marbles' },
  { code: 'M9', english: '9 Marbles', chinese: '九餅', suit: 'marbles' },

  // ───── Bamboo 條 (tiao) — B1–B9 ─────
  { code: 'B1', english: '1 Bamboo', chinese: '一條', suit: 'bamboo' },
  { code: 'B2', english: '2 Bamboo', chinese: '二條', suit: 'bamboo' },
  { code: 'B3', english: '3 Bamboo', chinese: '三條', suit: 'bamboo' },
  { code: 'B4', english: '4 Bamboo', chinese: '四條', suit: 'bamboo' },
  { code: 'B5', english: '5 Bamboo', chinese: '五條', suit: 'bamboo' },
  { code: 'B6', english: '6 Bamboo', chinese: '六條', suit: 'bamboo' },
  { code: 'B7', english: '7 Bamboo', chinese: '七條', suit: 'bamboo' },
  { code: 'B8', english: '8 Bamboo', chinese: '八條', suit: 'bamboo' },
  { code: 'B9', english: '9 Bamboo', chinese: '九條', suit: 'bamboo' },

  // ───── Birthday (winds repurposed for 90th-birthday theme) ─────
  { code: '90', english: '90', chinese: '東風', suit: 'birthday' },
  { code: 'AN', english: 'Annie', chinese: '南風', suit: 'birthday' },
  { code: 'H90', english: 'Happy 90th Birthday', chinese: '西風', suit: 'birthday' },
  { code: 'BC', english: 'Birthday cake', chinese: '北風', suit: 'birthday' },

  // ───── Dragons 中發 (Red and Green only — White Dragon not in this set) ─────
  { code: 'DR', english: 'Red Dragon', chinese: '中', suit: 'dragon' },
  { code: 'DG', english: 'Green Dragon', chinese: '發', suit: 'dragon' },

  // ───── Flowers 梅蘭菊竹 — Red set (RF1–RF4) and Blue set (BF1–BF4) ─────
  { code: 'RF1', english: 'Plum',         chinese: '梅', suit: 'flower' },
  { code: 'RF2', english: 'Orchid',       chinese: '蘭', suit: 'flower' },
  { code: 'RF3', english: 'Chrysanthemum', chinese: '菊', suit: 'flower' },
  { code: 'RF4', english: 'Bamboo',       chinese: '竹', suit: 'flower' },
  { code: 'BF1', english: 'Plum',         chinese: '梅', suit: 'flower' },
  { code: 'BF2', english: 'Orchid',       chinese: '蘭', suit: 'flower' },
  { code: 'BF3', english: 'Chrysanthemum', chinese: '菊', suit: 'flower' },
  { code: 'BF4', english: 'Bamboo',       chinese: '竹', suit: 'flower' },

  // ───── Compass 春夏秋冬 (S, N, E, W directions) ─────
  { code: 'CS', english: 'South', chinese: '春', suit: 'compass' },
  { code: 'CN', english: 'North', chinese: '夏', suit: 'compass' },
  { code: 'CE', english: 'East',  chinese: '秋', suit: 'compass' },
  { code: 'CW', english: 'West',  chinese: '冬', suit: 'compass' },

  // ───── Tiles (colored) ─────
  { code: 'YT', english: 'Yellow tile', suit: 'tile' },
  { code: 'GT', english: 'Green tile',  suit: 'tile' },

  // ───── Wests (colored) ─────
  { code: 'YW',  english: 'Yellow west', suit: 'west' },
  { code: 'GW',  english: 'Green west',  suit: 'west' },
  { code: 'BW',  english: 'Blue west',   suit: 'west' },
  { code: 'PW',  english: 'Purple west', suit: 'west' },
  { code: 'PKW', english: 'Pink west',   suit: 'west' },

  // ───── Dice (colored) ─────
  { code: 'YD',  english: 'Yellow dice', suit: 'dice' },
  { code: 'GD',  english: 'Green dice',  suit: 'dice' },
  { code: 'RD',  english: 'Red dice',    suit: 'dice' },
  { code: 'BD',  english: 'Blue dice',   suit: 'dice' },
  { code: 'WD',  english: 'White dice',  suit: 'dice' },
  { code: 'BLD', english: 'Black dice',  suit: 'dice' },

  // ───── Animals ─────
  { code: 'RO', english: 'Rooster',    suit: 'animal' },
  { code: 'CA', english: 'Cat',        suit: 'animal' },
  { code: 'RA', english: 'Rat',        suit: 'animal' },
  { code: 'WO', english: 'Worm',       suit: 'animal' },
  { code: 'RS', english: 'Red snake',  suit: 'animal' },

  // ───── Flags ─────
  { code: 'FA', english: 'Flag AUS', suit: 'flag' },
  { code: 'FP', english: 'Flag PNG', suit: 'flag' },

  // ───── Misc ─────
  { code: 'BB',   english: 'Buck bun',            suit: 'misc' },
  { code: 'HJ',   english: 'Hoong Joong',         suit: 'misc' },
  { code: 'FC',   english: 'Fat Choy',            suit: 'misc' },
  { code: 'RF',   english: 'Red Fei',             suit: 'misc' },
  { code: 'MJS',  english: 'Mahjong set',         suit: 'misc' },
  { code: 'MJSO', english: 'Mahjong solitaire',   suit: 'misc' },
  { code: 'MJT',  english: 'Mahjong table',       suit: 'misc' },
  { code: 'GDI',  english: 'Green dealer indicator', suit: 'misc' },
  { code: 'CL',   english: 'Clown',               suit: 'misc' },
  { code: 'JK',   english: 'Joker',               suit: 'misc' },
]);

export const ALL_CODES = Object.keys(TILES) as TileCode[];
export const TOTAL_TILES = ALL_CODES.length;

/**
 * Look up a tile by code.
 *
 * Trims surrounding whitespace and uppercases the input so the caller can
 * type in any case. Returns `undefined` if the code is not in the manifest.
 */
export function lookupTile(raw: string): Tile | undefined {
  const code = raw.trim().toUpperCase();
  return TILES[code as TileCode];
}
