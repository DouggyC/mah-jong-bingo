/**
 * Mahjong tile manifest.
 *
 * Each tile is identified by a short code that the caller types into the input.
 * Codes are case-insensitive in the UI but stored uppercase here.
 *
 * Mapping:
 *   D1-D9  : Dots (圓 / 餅) — 圓1, 圓2, ...
 *   B1-B9  : Bamboo (索 / 條) — 索1, 索2, ...
 *   C1-C9  : Characters (萬) — 一萬, 二萬, ...
 *   WE WS WW WN : Winds — East, South, West, North
 *   DR DG DW    : Dragons — Red (中), Green (發), White (白)
 *   FP FO FC FB : Flowers — Plum, Orchid, Chrysanthemum, Bamboo
 *   SS SU SA SW : Seasons — Spring, Summer, Autumn, Winter
 */

export type TileCode =
  | `D${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `B${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `C${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | 'WE' | 'WS' | 'WW' | 'WN'
  | 'DR' | 'DG' | 'DW'
  | 'FP' | 'FO' | 'FC' | 'FB'
  | 'SS' | 'SU' | 'SA' | 'SW';

export interface Tile {
  code: TileCode;
  image: string;       // URL or path to image
  english: string;     // English label (e.g. "1 Circle")
  chinese: string;     // Chinese label (e.g. "一餅")
  suit: 'dots' | 'bamboo' | 'characters' | 'wind' | 'dragon' | 'flower' | 'season';
}

// Build the manifest at module load. The image path is `/tiles/${code}.svg`.
const build = (
  codes: { code: TileCode; english: string; chinese: string; suit: Tile['suit'] }[],
): Record<TileCode, Tile> =>
  Object.fromEntries(
    codes.map((c) => [
      c.code,
      { ...c, image: `/tiles/${c.code}.svg` },
    ]),
  ) as Record<TileCode, Tile>;

export const TILES = build([
  // Characters 萬 (wan) — C1-C9
  { code: 'C1', english: '1 Character',  chinese: '一萬', suit: 'characters' },
  { code: 'C2', english: '2 Characters', chinese: '二萬', suit: 'characters' },
  { code: 'C3', english: '3 Characters', chinese: '三萬', suit: 'characters' },
  { code: 'C4', english: '4 Characters', chinese: '四萬', suit: 'characters' },
  { code: 'C5', english: '5 Characters', chinese: '五萬', suit: 'characters' },
  { code: 'C6', english: '6 Characters', chinese: '六萬', suit: 'characters' },
  { code: 'C7', english: '7 Characters', chinese: '七萬', suit: 'characters' },
  { code: 'C8', english: '8 Characters', chinese: '八萬', suit: 'characters' },
  { code: 'C9', english: '9 Characters', chinese: '九萬', suit: 'characters' },

  // Dots 餅 (bing) — D1-D9
  { code: 'D1', english: '1 Dot',  chinese: '一餅', suit: 'dots' },
  { code: 'D2', english: '2 Dots', chinese: '二餅', suit: 'dots' },
  { code: 'D3', english: '3 Dots', chinese: '三餅', suit: 'dots' },
  { code: 'D4', english: '4 Dots', chinese: '四餅', suit: 'dots' },
  { code: 'D5', english: '5 Dots', chinese: '五餅', suit: 'dots' },
  { code: 'D6', english: '6 Dots', chinese: '六餅', suit: 'dots' },
  { code: 'D7', english: '7 Dots', chinese: '七餅', suit: 'dots' },
  { code: 'D8', english: '8 Dots', chinese: '八餅', suit: 'dots' },
  { code: 'D9', english: '9 Dots', chinese: '九餅', suit: 'dots' },

  // Bamboo 條 (tiao) — B1-B9
  { code: 'B1', english: '1 Bamboo',  chinese: '一條', suit: 'bamboo' },
  { code: 'B2', english: '2 Bamboo', chinese: '二條', suit: 'bamboo' },
  { code: 'B3', english: '3 Bamboo', chinese: '三條', suit: 'bamboo' },
  { code: 'B4', english: '4 Bamboo', chinese: '四條', suit: 'bamboo' },
  { code: 'B5', english: '5 Bamboo', chinese: '五條', suit: 'bamboo' },
  { code: 'B6', english: '6 Bamboo', chinese: '六條', suit: 'bamboo' },
  { code: 'B7', english: '7 Bamboo', chinese: '七條', suit: 'bamboo' },
  { code: 'B8', english: '8 Bamboo', chinese: '八條', suit: 'bamboo' },
  { code: 'B9', english: '9 Bamboo', chinese: '九條', suit: 'bamboo' },

  // Winds 東南西北
  { code: 'WE', english: 'East Wind',  chinese: '東風', suit: 'wind' },
  { code: 'WS', english: 'South Wind', chinese: '南風', suit: 'wind' },
  { code: 'WW', english: 'West Wind',  chinese: '西風', suit: 'wind' },
  { code: 'WN', english: 'North Wind', chinese: '北風', suit: 'wind' },

  // Dragons 中發白
  { code: 'DR', english: 'Red Dragon',   chinese: '中', suit: 'dragon' },
  { code: 'DG', english: 'Green Dragon', chinese: '發', suit: 'dragon' },
  { code: 'DW', english: 'White Dragon', chinese: '白', suit: 'dragon' },

  // Flowers 梅蘭菊竹
  { code: 'FP', english: 'Plum',         chinese: '梅', suit: 'flower' },
  { code: 'FO', english: 'Orchid',       chinese: '蘭', suit: 'flower' },
  { code: 'FC', english: 'Chrysanthemum', chinese: '菊', suit: 'flower' },
  { code: 'FB', english: 'Bamboo',       chinese: '竹', suit: 'flower' },

  // Seasons 春夏秋冬
  { code: 'SS', english: 'Spring', chinese: '春', suit: 'season' },
  { code: 'SU', english: 'Summer', chinese: '夏', suit: 'season' },
  { code: 'SA', english: 'Autumn', chinese: '秋', suit: 'season' },
  { code: 'SW', english: 'Winter', chinese: '冬', suit: 'season' },
]);

export const ALL_CODES = Object.keys(TILES) as TileCode[];
export const TOTAL_TILES = ALL_CODES.length;

/** Look up a tile by code. Returns undefined if invalid. Case-insensitive. */
export function lookupTile(raw: string): Tile | undefined {
  const code = raw.trim().toUpperCase();
  return TILES[code as TileCode];
}
