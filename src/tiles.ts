/**
 * Mahjong tile manifest.
 *
 * Each tile is identified by a short code that the caller types into the input.
 * Codes are case-insensitive in the UI but stored uppercase here.
 *
 * Mapping:
 *   D1-D9  : Marbles (圓 / 餅) — 圓1, 圓2, ...
 *   B1-B9  : Bamboo (索 / 條) — 索1, 索2, ...
 *   C1-C9  : Characters (萬) — 一萬, 二萬, ...
 *   WE WS WW WN : Winds — East, South, West, North
 *   DR DG DW    : Dragons — Red (中), Green (發), White (白)
 *   FP FO FC FB : Flowers — Plum, Orchid, Chrysanthemum, Bamboo
 *   SS SU SA SW : Compasss — Spring, Summer, Autumn, Winter
 */

export type TileCode =
  | `M${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `B${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `C${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  // birthday
  | '90'
  | 'AN'
  | 'H90'
  | 'BC'
  // dragon
  | 'DR'
  | 'DG'
  // Flower
  | 'RF1'
  | 'RF2'
  | 'RF3'
  | 'RF4'
  | 'BF1'
  | 'BF2'
  | 'BF3'
  | 'BF4'
  // compass
  | 'CS'
  | 'CN'
  | 'CE'
  | 'CW'
  // west
  | 'YW'
  | 'GW'
  | 'BW'
  | 'PW'
  | 'PKW'
  // tile
  | 'GT'
  | 'YT'
  // dice
  | 'YD'
  | 'GD'
  | 'RD'
  | 'BD'
  | 'WD'
  | 'BLD'
  // flag
  | 'FA'
  | 'FP'
  // animal
  | 'RO'
  | 'CA'
  | 'RA'
  | 'WO'
  | 'RS'
  // misc
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
  image: string; // URL or path to image
  english: string; // English label (e.g. "1 Circle")
  chinese: string; // Chinese label (e.g. "一餅")
  suit:
    | 'marbles'
    | 'bamboo'
    | 'characters'
    | 'birthday'
    | 'west'
    | 'dragon'
    | 'flower'
    | 'compass'
    | 'tile'
    | 'dice'
    | 'flag'
    | 'animal'
    | 'misc';
}

// Build the manifest at module load. The image path is `/tiles/${code}.svg`.
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
  // Characters 萬 (wan) — C1-C9
  { code: 'C1', english: '1 Character', chinese: '一萬', suit: 'characters' },
  { code: 'C2', english: '2 Characters', chinese: '二萬', suit: 'characters' },
  { code: 'C3', english: '3 Characters', chinese: '三萬', suit: 'characters' },
  { code: 'C4', english: '4 Characters', chinese: '四萬', suit: 'characters' },
  { code: 'C5', english: '5 Characters', chinese: '五萬', suit: 'characters' },
  { code: 'C6', english: '6 Characters', chinese: '六萬', suit: 'characters' },
  { code: 'C7', english: '7 Characters', chinese: '七萬', suit: 'characters' },
  { code: 'C8', english: '8 Characters', chinese: '八萬', suit: 'characters' },
  { code: 'C9', english: '9 Characters', chinese: '九萬', suit: 'characters' },

  // Marbles 餅 (bing) — D1-D9
  { code: 'M1', english: '1 Marble', chinese: '一餅', suit: 'marbles' },
  { code: 'M2', english: '2 Marbles', chinese: '二餅', suit: 'marbles' },
  { code: 'M3', english: '3 Marbles', chinese: '三餅', suit: 'marbles' },
  { code: 'M4', english: '4 Marbles', chinese: '四餅', suit: 'marbles' },
  { code: 'M5', english: '5 Marbles', chinese: '五餅', suit: 'marbles' },
  { code: 'M6', english: '6 Marbles', chinese: '六餅', suit: 'marbles' },
  { code: 'M7', english: '7 Marbles', chinese: '七餅', suit: 'marbles' },
  { code: 'M8', english: '8 Marbles', chinese: '八餅', suit: 'marbles' },
  { code: 'M9', english: '9 Marbles', chinese: '九餅', suit: 'marbles' },

  // Bamboo 條 (tiao) — B1-B9
  { code: 'B1', english: '1 Bamboo', chinese: '一條', suit: 'bamboo' },
  { code: 'B2', english: '2 Bamboo', chinese: '二條', suit: 'bamboo' },
  { code: 'B3', english: '3 Bamboo', chinese: '三條', suit: 'bamboo' },
  { code: 'B4', english: '4 Bamboo', chinese: '四條', suit: 'bamboo' },
  { code: 'B5', english: '5 Bamboo', chinese: '五條', suit: 'bamboo' },
  { code: 'B6', english: '6 Bamboo', chinese: '六條', suit: 'bamboo' },
  { code: 'B7', english: '7 Bamboo', chinese: '七條', suit: 'bamboo' },
  { code: 'B8', english: '8 Bamboo', chinese: '八條', suit: 'bamboo' },
  { code: 'B9', english: '9 Bamboo', chinese: '九條', suit: 'bamboo' },

  // Birthday 東南西北
  { code: '90', english: '90', chinese: '東風', suit: 'birthday' },
  { code: 'AN', english: 'Annie', chinese: '南風', suit: 'birthday' },
  {
    code: 'H90',
    english: 'Happy 90th Birthday',
    chinese: '西風',
    suit: 'birthday',
  },
  { code: 'BC', english: 'Birthday cake', chinese: '北風', suit: 'birthday' },

  // Dragons 中發白
  { code: 'DR', english: 'Red Dragon', chinese: '中', suit: 'dragon' },
  { code: 'DG', english: 'Green Dragon', chinese: '發', suit: 'dragon' },

  // Flowers 梅蘭菊竹
  { code: 'RF1', english: 'Plum', chinese: '梅', suit: 'flower' },
  { code: 'RF2', english: 'Orchid', chinese: '蘭', suit: 'flower' },
  { code: 'RF3', english: 'Chrysanthemum', chinese: '菊', suit: 'flower' },
  { code: 'RF4', english: 'Bamboo', chinese: '竹', suit: 'flower' },
  { code: 'BF1', english: 'Plum', chinese: '梅', suit: 'flower' },
  { code: 'BF2', english: 'Orchid', chinese: '蘭', suit: 'flower' },
  { code: 'BF3', english: 'Chrysanthemum', chinese: '菊', suit: 'flower' },
  { code: 'BF4', english: 'Bamboo', chinese: '竹', suit: 'flower' },

  // Compass 春夏秋冬
  { code: 'CS', english: 'South', chinese: '春', suit: 'compass' },
  { code: 'CN', english: 'North', chinese: '夏', suit: 'compass' },
  { code: 'CE', english: 'East', chinese: '秋', suit: 'compass' },
  { code: 'CW', english: 'West', chinese: '冬', suit: 'compass' },

  // Tile
  { code: 'YT', english: 'Yellow tile', suit: 'tile' },
  { code: 'GT', english: 'Green tile', suit: 'tile' },
  // West
  { code: 'YW', english: 'Yellow west', suit: 'west' },
  { code: 'GW', english: 'Green west', suit: 'west' },
  { code: 'BW', english: 'Blue west', suit: 'west' },
  { code: 'PW', english: 'Purple west', suit: 'west' },
  { code: 'PKW', english: 'Pink west', suit: 'west' },
  // dice
  { code: 'YD', english: 'Yellow dice', suit: 'dice' },
  { code: 'GD', english: 'Green dice', suit: 'dice' },
  { code: 'RD', english: 'Red dice', suit: 'dice' },
  { code: 'BD', english: 'Blue dice', suit: 'dice' },
  { code: 'WD', english: 'White dice', suit: 'dice' },
  { code: 'BLD', english: 'Black dice', suit: 'dice' },

  // animal
  { code: 'RO', english: 'Rooster', suit: 'animal' },
  { code: 'CA', english: 'Cat', suit: 'animal' },
  { code: 'RA', english: 'Rat', suit: 'animal' },
  { code: 'WO', english: 'Worm', suit: 'animal' },
  { code: 'RS', english: 'Red snake', suit: 'animal' },
  // flag
  { code: 'FA', english: 'Flag AUS', suit: 'flag' },
  { code: 'FP', english: 'Flag PNG', suit: 'flag' },
  // misc
  { code: 'BB', english: 'Buck bun', suit: 'misc' },
  { code: 'HJ', english: 'Hoong Joong', suit: 'misc' },
  { code: 'FC', english: 'Fat Choy', suit: 'misc' },
  { code: 'RF', english: 'Red Fei', suit: 'misc' },
  { code: 'MJS', english: 'Mahjong set', suit: 'misc' },
  { code: 'MJSO', english: 'Mahjong solitaire', suit: 'misc' },
  { code: 'MJT', english: 'Mahjong table', suit: 'misc' },
  { code: 'GDI', english: 'Green dealer indicator', suit: 'misc' },
  { code: 'CL', english: 'Clown', suit: 'misc' },
  { code: 'JK', english: 'joker', suit: 'misc' },
]);

export const ALL_CODES = Object.keys(TILES) as TileCode[];
export const TOTAL_TILES = ALL_CODES.length;

/** Look up a tile by code. Returns undefined if invalid. Case-insensitive. */
export function lookupTile(raw: string): Tile | undefined {
  const code = raw.trim().toUpperCase();
  return TILES[code as TileCode];
}
