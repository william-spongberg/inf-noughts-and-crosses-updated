import { CELL_GAP, CELL_SIZE } from "../global/constants.ts";
import InfCell from "./InfCell.tsx";
import {
  checkGameOver,
  currentTurn,
  extendGrid,
  firstTurn,
  grid,
} from "../global/utils.ts";
import { useEffect, useMemo } from "preact/hooks";
import { Direction, Turn } from "../global/types.ts";
import { ComponentChildren } from "preact";
import * as Text from "../components/Text.tsx";
import * as Layout from "../components/Layout.tsx";
import { signal } from "@preact/signals";

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
  const extend = (dir: Direction) => {
    extendGrid(dir);
  };

  return (
    <>
      <div class="p-4 m-4">
        <div
          class="scale-75 md:scale-90 lg:scale-100 xl:scale-125"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${
              Math.abs(grid.value.minX) + Math.abs(grid.value.maxX)
            }, ${CELL_SIZE}px)`,
            width: "100%",
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

function DirButton(
  { direction, onClick, children }: {
    direction: Direction;
    onClick: () => void;
    children: ComponentChildren;
  },
) {
  const positionStyles = {
    [Direction.Left]: "fixed top-1/2 left-0 transform -translate-y-1/2",
    [Direction.Right]: "fixed top-1/2 right-0 transform -translate-y-1/2",
    [Direction.Up]: "fixed top-0 left-1/2 transform -translate-x-1/2",
    [Direction.Down]: "fixed bottom-0 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      class={`${
        positionStyles[direction]
      } bg-slate-200 hover:bg-slate-400 rounded-xl px-3 py-2 m-4 text-5xl`}
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
      <div class="z-10">
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
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart Game
          </button>
        </Layout.Element>
      </div>
    </>
  );
}
