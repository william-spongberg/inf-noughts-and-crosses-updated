import {
  CELL_GAP,
  CELL_SIZE,
  DEFAULT_GRID,
  DEFAULT_GRID_SIZE,
} from "../global/constants.ts";
import { Cell, Grid } from "../global/types.ts";
import InfCell from "./InfCell.tsx";
import { checkWin, currentTurn } from "../global/utils.ts";
import { useEffect } from "preact/hooks";

export default function InfGrid() {
  let grid: Grid = DEFAULT_GRID;
  let gridSize: number = DEFAULT_GRID_SIZE;

  // check for win on new turn
  useEffect(() => {
    checkWin(grid);
  }, [currentTurn.value]);

  return (
    <div class="px-2 py-4">
      <div
        class="scale-75 md:scale-90 lg:scale-100 xl:scale-125"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`,
          width: "100%",
          gap: `${CELL_GAP}px`,
        }}
      >
        {Array.from(grid.cells.values()).map((cell) => (
          <InfCell key={`cell-${cell.x}-${cell.y}-${cell.value}`} {...cell} />
        ))}
      </div>
    </div>
  );
}
