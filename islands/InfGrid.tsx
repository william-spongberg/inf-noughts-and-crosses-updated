import {
  CELL_GAP,
  CELL_SIZE,
  INITIAL_GRID,
  INITIAL_GRID_SIZE,
} from "../global/constants.ts";
import { Cell } from "../global/types.ts";
import InfCell from "./InfCell.tsx";
import { currentTurn } from "../global/utils.ts";

export default function InfGrid() {
  let grid: Cell[][] = INITIAL_GRID;

  return (
    <div class="px-2 py-4">
      <div
        class="scale-75 md:scale-90 lg:scale-100 xl:scale-125"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${INITIAL_GRID_SIZE}, ${CELL_SIZE}px)`,
          width: "100%",
          gap: `${CELL_GAP}px`,
        }}
      >
        {grid.flat().map((cell) => (
          <InfCell key={`pixel-${cell.x}-${cell.y}-${cell.value}`} {...cell} />
        ))}
      </div>
    </div>
  );
}
