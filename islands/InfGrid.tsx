import { CELL_GAP, CELL_SIZE } from "../global/constants.ts";
import InfCell from "./InfCell.tsx";
import {
  checkGameOver,
  currentTurn,
  extendGrid,
  firstTurn,
  grid,
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
  // TODO: is this the best way of doing this?
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

  const extend = (dir: Direction) => {
    extendGrid(dir);
  };

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

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const gridWidth = Math.abs(grid.value.minX) + Math.abs(grid.value.maxX);
  const gridHeight = Math.abs(grid.value.minY) + Math.abs(grid.value.maxY);

  // change padding based on grid size
  const gridPadding = Math.max(
    MIN_PADDING,
    Math.min(MAX_PADDING, (20 * Math.max(gridWidth, gridHeight)) / 5),
  );

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

      <CurrentTurn />
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
    <div class="bg-slate-800 fixed bottom-10 left-10 rounded-md">
      <Text.Heading>
        {currentTurn.value == Turn.Nought ? "O's Turn" : "X's Turn"}
      </Text.Heading>
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
      } bg-white hover:bg-slate-400 rounded-xl px-3 py-2 m-4 text-5xl`}
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
