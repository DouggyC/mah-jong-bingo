import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ALL_CODES,
  lookupTile,
  TILES,
  type Tile,
  type TileCode,
} from './tiles';
import './App.css';

const STORAGE_KEY = 'mahjong-bingo-called-v1';

/** Suit metadata for the legend panel. */
const SUIT_LABELS: Record<Tile['suit'], { english: string; chinese: string }> =
  {
    characters: { english: 'Characters', chinese: '萬' },
    marbles: { english: 'Marbles', chinese: '餅' },
    bamboo: { english: 'Bamboo', chinese: '條' },
    birthday: { english: 'Birthday', chinese: '風' },
    dragon: { english: 'Dragons', chinese: '三元' },
    flower: { english: 'Flowers', chinese: '花' },
    compass: { english: 'Compass', chinese: '季' },
    tile: { english: 'Tiles', chinese: '' },
    dice: { english: 'Dices', chinese: '' },
    west: { english: 'Wests', chinese: '' },
    misc: { english: 'Miscs', chinese: '' },
    flag: { english: 'Flags', chinese: '' },
    animal: { english: 'Animals', chinese: '' },
  };

/** Group all tile codes by suit for the legend display. */
const TILES_BY_SUIT: Record<Tile['suit'], Tile[]> = ALL_CODES.reduce(
  (acc, code) => {
    const tile = TILES[code];
    (acc[tile.suit] ||= []).push(tile);
    return acc;
  },
  {} as Record<Tile['suit'], Tile[]>,
);

/** Display order for suits in the legend. */
const SUIT_ORDER: Tile['suit'][] = [
  'characters',
  'marbles',
  'bamboo',
  'birthday',
  'dragon',
  'flower',
  'compass',
  'tile',
  'dice',
  'west',
  'misc',
  'flag',
  'animal',
];

/** Read the persisted called-tiles set from localStorage. */
function loadCalled(): TileCode[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is TileCode => typeof c === 'string' && c in TILES,
    );
  } catch {
    return [];
  }
}

/** Status of the most recent input attempt. */
type CallStatus =
  | { kind: 'idle' }
  | { kind: 'ok'; tile: Tile }
  | { kind: 'invalid'; raw: string }
  | { kind: 'duplicate'; tile: Tile };

function App() {
  const [called, setCalled] = useState<TileCode[]>(() => loadCalled());
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<CallStatus>({ kind: 'idle' });
  const inputRef = useRef<HTMLInputElement>(null);
  const footerScrollRef = useRef<HTMLDivElement>(null);

  // Persist called tiles on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(called));
    } catch {
      /* ignore quota errors */
    }
  }, [called]);

  // Auto-scroll footer to the right (newest) when a tile is called.
  useEffect(() => {
    const el = footerScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  }, [called]);

  // Focus the input on mount and after every status change.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(() => {
    const tile = lookupTile(input);
    if (!tile) {
      setStatus({ kind: 'invalid', raw: input });
      setInput('');
      inputRef.current?.focus();
      return;
    }
    if (called.includes(tile.code)) {
      setStatus({ kind: 'duplicate', tile });
      setInput('');
      inputRef.current?.focus();
      return;
    }
    setCalled((prev) => [...prev, tile.code]);
    setStatus({ kind: 'ok', tile });
    setInput('');
    inputRef.current?.focus();
  }, [input, called]);

  const undo = useCallback(() => {
    if (called.length === 0) return;
    setCalled((prev) => prev.slice(0, -1));
    setStatus({ kind: 'idle' });
    setInput('');
    inputRef.current?.focus();
  }, [called.length]);


  const currentTile: Tile | undefined = useMemo(
    () =>
      status.kind === 'ok'
        ? status.tile
        : called.length > 0
          ? TILES[called[called.length - 1]]
          : undefined,
    [status, called],
  );

  // Preview the live input as a (possibly partial) tile — only show if it matches exactly.
  const previewTile = useMemo(() => {
    const trimmed = input.trim().toUpperCase();
    if (trimmed.length === 0) return undefined;
    return lookupTile(trimmed);
  }, [input]);

  const totalCalled = called.length;
  const duplicatesBlocked = status.kind === 'duplicate';

  return (
    <div className='app'>
      {/* ============ HEADER (5vh) ============ */}
      <header className='header'>
        <div className='header__decor header__decor--left' aria-hidden>
          ❀
        </div>
        <h1 className='header__title'>
          <span className='header__chinese'>麻將</span>
          <span className='header__english'>Mah-Jong Bingo</span>
        </h1>
        <button
          type='button'
          className='header__undo'
          onClick={undo}
          disabled={called.length === 0}
          aria-label='Undo last called tile'
          title={
            called.length > 0
              ? `Undo last call (${called[called.length - 1]})`
              : 'Nothing to undo'
          }
        >
          ↶ Undo
        </button>

      </header>

      {/* ============ MAIN (80vh) ============ */}
      <main className='main'>
        {/* Large tile display */}
        <section className='stage' aria-live='polite'>
          {currentTile ? (
            <img
              key={currentTile.code}
              src={currentTile.image}
              alt={`${currentTile.code} — ${currentTile.english}`}
              className='stage__tile stage__tile--enter'
              draggable={false}
            />
          ) : (
            <div className='stage__empty'>
              <div className='stage__empty-glyph'>麻</div>
              <p>Awaiting first call…</p>
            </div>
          )}
          {currentTile && (
            <div className='stage__label'>
              <span className='stage__label-code'>{currentTile.code}</span>
              <span className='stage__label-en'>{currentTile.english}</span>
              <span className='stage__label-cn'>{currentTile.chinese}</span>
            </div>
          )}
        </section>

        {/* Legend — top-left corner of main */}
        <aside className='legend' aria-label='Tile code legend'>
          <div className='legend__title'>
            <span className='legend__title-en'>Tile Codes</span>
            <span className='legend__title-cn'>牌譜</span>
          </div>
          <div className='legend__groups'>
            {SUIT_ORDER.map((suit) => {
              const tiles = TILES_BY_SUIT[suit];
              if (!tiles?.length) return null;
              const label = SUIT_LABELS[suit];
              return (
                <div
                  key={suit}
                  className={`legend__group legend__group--${suit}`}
                >
                  <div className='legend__group-label'>
                    <span className='legend__group-en'>{label.english}</span>
                    <span className='legend__group-cn'>{label.chinese}</span>
                  </div>
                  <div className='legend__chips'>
                    {tiles.map((tile) => {
                      const isCalled = called.includes(tile.code);
                      return (
                        <button
                          key={tile.code}
                          type='button'
                          className={`legend__chip${isCalled ? ' legend__chip--called' : ''}`}
                          title={`${tile.code} — ${tile.english}`}
                          onClick={() => {
                            // Click a chip to fill the input (convenience)
                            setInput(tile.code);
                            setStatus({ kind: 'idle' });
                            inputRef.current?.focus();
                          }}
                        >
                          {tile.code}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Input panel — top-right corner of main */}
        <aside className='input-panel' aria-label='Tile input'>
          <label htmlFor='tile-input' className='input-panel__label'>
            Enter code
          </label>
          <input
            id='tile-input'
            ref={inputRef}
            className={`input-panel__input${status.kind === 'invalid' ? ' input-panel__input--error' : ''}`}
            type='text'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (status.kind !== 'idle') setStatus({ kind: 'idle' });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submit();
              }
            }}
            placeholder='e.g. D5, WE, FP'
            autoComplete='off'
            spellCheck={false}
            maxLength={4}
            inputMode='text'
          />
          <div className='input-panel__preview' aria-live='polite'>
            {previewTile ? (
              <img
                src={previewTile.image}
                alt={`Preview ${previewTile.code}`}
                className='input-panel__preview-img'
              />
            ) : (
              <div className='input-panel__preview-placeholder'>—</div>
            )}
            <div className='input-panel__preview-text'>
              <div className='input-panel__preview-code'>
                {input.trim().toUpperCase() || '···'}
              </div>
              <div className='input-panel__preview-name'>
                {previewTile ? previewTile.english : 'unknown'}
              </div>
            </div>
          </div>
          <button
            type='button'
            className='input-panel__call'
            onClick={submit}
            disabled={!previewTile}
          >
            Call ▶
          </button>
          <div className='input-panel__status' role='status'>
            {status.kind === 'invalid' && (
              <span className='status status--error'>
                “{status.raw}” is not a valid code
              </span>
            )}
            {status.kind === 'duplicate' && (
              <span className='status status--warn'>
                {status.tile.code} already called
              </span>
            )}
            {status.kind === 'ok' && (
              <span className='status status--ok'>
                Called {status.tile.code} ✓
              </span>
            )}
          </div>
        </aside>
      </main>

      {/* ============ FOOTER (10vh) ============ */}
      <footer className='footer'>
        <div className='footer__label'>
          Called <span className='footer__count'>{totalCalled}</span>
          <span className='footer__count-sep'>/</span>
          <span className='footer__total'>{ALL_CODES.length}</span>
        </div>
        <div className='footer__strip' ref={footerScrollRef}>
          {called.length === 0 ? (
            <div className='footer__empty'>No tiles called yet</div>
          ) : (
            called.map((code, idx) => {
              const tile = TILES[code];
              return (
                <img
                  key={`${code}-${idx}`}
                  src={tile.image}
                  alt={code}
                  title={`${code} — ${tile.english}`}
                  className={`footer__chip footer__chip--${tile.suit}`}
                  draggable={false}
                />
              );
            })
          )}
        </div>
        {duplicatesBlocked && (
          <div className='footer__warn'>Duplicate blocked</div>
        )}
      </footer>
    </div>
  );
}

export default App;
