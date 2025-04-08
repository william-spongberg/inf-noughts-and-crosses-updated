import { CELL_GAP, CELL_SIZE } from "../global/constants.ts";
import InfCell from "./InfCell.tsx";
import {
  bankCountO,
  bankCountX,
  bankTurn,
  checkGameOver,
  currentTurn,
  extendGrid,
  firstTurn,
  grid,
  useBankedTurn,
  usingBankedTurn,
} from "../global/utils.ts";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Direction, Turn } from "../global/types.ts";
import { ComponentChildren } from "preact";
import * as Text from "../components/Text.tsx";
import * as Layout from "../components/Layout.tsx";
import { signal } from "@preact/signals";

const INITIAL_ZOOM = 100;
const ZOOM_STEP = 10;
const MAX_ZOOM = 150;
const MIN_ZOOM = 50;

const MAX_PADDING = 100;
const MIN_PADDING = 30;

export default function InfGrid() {
  const gameOver = useMemo(() => signal(false), []);

  // check for win on new turn
  useEffect(() => {
    if (!firstTurn.value) {
      gameOver.value = checkGameOver();
      console.log("win: ", gameOver.value);
    }
  }, [currentTurn.value]);

  return (
    <>
      {gameOver.value ? GameOverScreen() : null}
      {PlayScreen()}
    </>
  );
}

function PlayScreen() {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // center grid on extension to ensure it stays in view
  useEffect(() => {
    centerGrid();
  }, [grid.value.minX, grid.value.maxX, grid.value.minY, grid.value.maxY]);

  const centerGrid = () => {
    if (containerRef.current && gridContainerRef.current) {
      // find mid left and mid top of grid
      const scrollLeft = gridContainerRef.current.offsetWidth / 2 -
        containerRef.current.clientWidth / 2;
      const scrollTop = gridContainerRef.current.offsetHeight / 2 -
        containerRef.current.clientHeight / 2;

      // scroll to center
      containerRef.current.scrollTo({
        left: scrollLeft,
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };

  // hooks
  const extend = (dir: Direction) => {
    extendGrid(dir);
  };
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };
  const handleBankTurn = () => {
    bankTurn();
  };
  const handleUseBankedTurn = () => {
    useBankedTurn();
  };

  // calculate grid size and padding
  const gridWidth = Math.abs(grid.value.minX) + Math.abs(grid.value.maxX);
  const gridHeight = Math.abs(grid.value.minY) + Math.abs(grid.value.maxY);
  const gridPadding = Math.max(
    MIN_PADDING,
    Math.min(MAX_PADDING, (20 * Math.max(gridWidth, gridHeight)) / 5),
  );

  // count number of banked turns for current player
  const currentPlayerBankedTurns = currentTurn.value === Turn.Nought
    ? bankCountO.value
    : bankCountX.value;

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-auto border-2 border-slate-400 rounded-xl"
      >
        <div
          className="absolute transform origin-center"
          style={{
            transform: `scale(${zoom / 100})`,
            padding: `${gridPadding}px`,
            minWidth: "100%",
            minHeight: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            ref={gridContainerRef}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridWidth}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${gridHeight}, ${CELL_SIZE}px)`,
              gap: `${CELL_GAP}px`,
            }}
          >
            {Array.from(grid.value.cells.values())
              .sort((a, b) => a.y - b.y || a.x - b.x)
              .map((cell) => (
                <InfCell
                  key={`cell-${cell.x}-${cell.y}-${cell.value}`}
                  {...cell}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 flex flex-col gap-2 z-10 bg-slate-800 rounded-xl p-2">
        <button
          type="button"
          onClick={handleZoomIn}
          className="bg-slate-100 hover:bg-slate-400 rounded-xl px-3 py-1 text-2xl"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="bg-slate-100 hover:bg-slate-400 rounded-xl px-3 py-1 text-2xl"
        >
          -
        </button>
        <span className="bg-slate-800 text-white px-2 py-1 rounded-xl">
          {zoom}%
        </span>
      </div>

      <div className="fixed top-4 left-4 flex flex-col gap-2 z-10 bg-slate-800 rounded-xl p-2">
        <button
          type="button"
          onClick={handleBankTurn}
          disabled={usingBankedTurn.value}
          className={`${
            usingBankedTurn.value
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-700"
          } text-white text-md font-bold rounded-xl px-3 py-2`}
        >
          Bank Turn
        </button>
        <button
          type="button"
          onClick={handleUseBankedTurn}
          disabled={currentPlayerBankedTurns === 0 || usingBankedTurn.value}
          className={`${
            currentPlayerBankedTurns > 0 && !usingBankedTurn.value
              ? "bg-green-500 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          } text-white text-md font-bold rounded-xl px-3 py-2`}
        >
          Use Bank ({currentPlayerBankedTurns})
        </button>
      </div>

      <CurrentTurn />
      <BankedTurnsDisplay />
      <DirButton
        direction={Direction.Left}
        onClick={() => extend(Direction.Left)}
      >
        ←
      </DirButton>
      <DirButton
        direction={Direction.Right}
        onClick={() => extend(Direction.Right)}
      >
        →
      </DirButton>
      <DirButton direction={Direction.Up} onClick={() => extend(Direction.Up)}>
        ↑
      </DirButton>
      <DirButton
        direction={Direction.Down}
        onClick={() => extend(Direction.Down)}
      >
        ↓
      </DirButton>
    </>
  );
}

function CurrentTurn() {
  return (
    <div class="bg-slate-800 fixed bottom-0 left-0 m-4 rounded-md">
      <Text.Heading>
        {currentTurn.value == Turn.Nought
          ? (
            <>
              <div class="text-blue-400 inline">O's</div> Turn
            </>
          )
          : (
            <>
              <div class="text-red-400 inline">X's</div> Turn
            </>
          )}
        {usingBankedTurn.value && (
          <span class="text-green-400 ml-2">(Extra Turn)</span>
        )}
      </Text.Heading>
    </div>
  );
}

function BankedTurnsDisplay() {
  return (
    <div class="bg-slate-800 fixed bottom-16 left-0 m-4 rounded-md px-2">
      <Text.SubHeading>
        Banked Turns:
      </Text.SubHeading>
      <div class="flex justify-between gap-4">
        <div class="flex items-center">
          <span class="text-blue-400 font-bold text-xl mr-1">O:</span>
          <span class="text-white">{bankCountO.value}</span>
        </div>
        <div class="flex items-center">
          <span class="text-red-400 font-bold text-xl mr-1">X:</span>
          <span class="text-white">{bankCountX.value}</span>
        </div>
      </div>
    </div>
  );
}

function DirButton(
  { direction, onClick, children }: {
    direction: Direction;
    onClick: () => void;
    children: ComponentChildren;
  },
) {
  const positionStyles = {
    [Direction.Left]:
      "fixed top-1/2 left-0 transform -translate-y-1/2 mx-2 my-auto",
    [Direction.Right]:
      "fixed top-1/2 right-0 transform -translate-y-1/2 mx-2 my-auto",
    [Direction.Up]:
      "fixed top-0 left-1/2 transform -translate-x-1/2 my-2 mx-auto",
    [Direction.Down]:
      "fixed bottom-0 left-1/2 transform -translate-x-1/2 my-2 mx-auto",
  };

  return (
    <div
      class={`${
        positionStyles[direction]
      } bg-white hover:bg-slate-400 rounded-xl px-3 py-2 m-4 text-5xl sm:scale-100 scale-75`}
    >
      <button type="button" onClick={onClick} class="w-full h-full">
        {children}
      </button>
    </div>
  );
}

function GameOverScreen() {
  return (
    <>
      <div class="p-10">
        <Layout.Element title="Game Over!">
          <Text.Heading>
            {currentTurn.value === Turn.Nought
              ? "Crosses Win!"
              : "Noughts Win!"}
          </Text.Heading>
          <br />
          <br />
          <button
            type="button"
            onClick={() => globalThis.location.reload()}
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart Game
          </button>
        </Layout.Element>
      </div>
    </>
  );
}
