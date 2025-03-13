import { CELL_GAP, CELL_SIZE, DEFAULT_GRID_SIZE } from "../global/constants.ts";
import InfCell from "./InfCell.tsx";
import { checkWin, currentTurn, extendGrid, grid } from "../global/utils.ts";
import { useEffect } from "preact/hooks";
import { Direction } from "../global/types.ts";
import { ComponentChildren } from "preact";

export default function InfGrid() {
  // check for win on new turn
  useEffect(() => {
    checkWin();
  }, [currentTurn.value]);

  useEffect(() => {
  }, [grid.value]);

  const extend = (dir: Direction) => {
    extendGrid(dir);
  };

  return (
    <div class="px-2 py-4">
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
            <InfCell key={`cell-${cell.x}-${cell.y}-${cell.value}`} {...cell} />
          ))}
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
    [Direction.Left]: "absolute top-1/2 left-0 transform -translate-y-1/2",
    [Direction.Right]: "absolute top-1/2 right-0 transform -translate-y-1/2",
    [Direction.Up]: "absolute top-0 left-1/2 transform -translate-x-1/2",
    [Direction.Down]: "absolute bottom-0 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      className={`${
        positionStyles[direction]
      } bg-white hover:bg-slate-500 rounded-xl px-3 py-2 my-2 mt-4 flex`}
    >
      <button type="button" onClick={onClick} class="w-full h-full">
        {children}
      </button>
    </div>
  );
}
