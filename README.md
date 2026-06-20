# Mah-Jong Bingo 🀄

A bingo hall display for calling Mahjong tiles. Type a tile code, see the tile, track what's been called.

Built with **Vite + React + TypeScript**.

## Usage

Type a tile code in the input panel (top-right of main) and press **Enter** (or click **Call ▶**):

| Code | Tile |
| --- | --- |
| `D1`–`D9` | Marbles (圓 / 餅) |
| `B1`–`B9` | Bamboo (索 / 條) |
| `C1`–`C9` | Characters (萬) |
| `WE` `WS` `WW` `WN` | Winds 東南西北 |
| `DR` `DG` `DW` | Dragons 中發白 |
| `FP` `FO` `FC` `FB` | Flowers 梅蘭菊竹 |
| `SS` `SU` `SA` `SW` | Seasons 春夏秋冬 |

Codes are case-insensitive. The input panel shows a live preview of the tile as you type.
Duplicates are silently blocked (the tile is shown in the status bar as "already called").
The called-tile list persists across page reloads via `localStorage`. The Undo button in
the top-right corner removes the most recently called tile (no confirmation — just click again to re-call).

## Running

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Tile Image Credits

All 42 tile images are SVGs from
[Wikimedia Commons — SVG Planar illustrations of Mahjong tiles](https://commons.wikimedia.org/wiki/Category:SVG_Planar_illustrations_of_Mahjong_tiles),
authored by **碧海风 (Bihai Feng)**, 2018, used under
[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).

Attribution: 碧海风, Wikimedia Commons, CC BY-SA 4.0.

A standard mahjong set contains 144 physical tiles (4 copies each of the 34 numbered
tiles + 4 winds + 3 dragons, plus 4 flowers and 4 seasons). This app tracks the
**34 unique numbered tile designs** plus 4 flowers and 4 seasons — 42 distinct tile
designs total. Each design can be called exactly once per game.

## Layout

```
┌─────────────────────────────────────────────┐
│ HEADER  (5vh)                               │
│   麻將 Mah-Jong Bingo        ↶ Undo         │

├─────────────────────────────────────────────┤
│ MAIN  (80vh)                                │
│            [BIG TILE IMAGE]                 │
│            [Code · Name · 中文]             │
│                          ┌──────────────┐   │
│                          │  ENTER CODE  │   │
│                          │  [preview]   │   │
│                          │  [ Call ▶ ]  │   │
│                          └──────────────┘   │
├─────────────────────────────────────────────┤
│ FOOTER  (10vh)                              │
│   CALLED 22 / 42                            │
│   [chip][chip][chip][chip][chip]…           │
└─────────────────────────────────────────────┘
```

## Project Structure

```
mah-jong-bingo/
├── index.html              # HTML shell + font preloads
├── src/
│   ├── App.tsx             # Layout, state, input panel, footer strip
│   ├── App.css             # Asian oriental light theme
│   ├── tiles.ts            # Tile manifest (42 codes → images + labels)
│   └── main.tsx            # React entry point
├── public/tiles/           # 42 SVG tile images (C1..C9, D1..D9, B1..B9, …)
└── scripts/
    └── download-tiles.mjs  # Wikimedia Commons fetcher with retry logic
```
