import {
  INITIAL_GRID,
  INITIAL_GRID_SIZE,
  PIXEL_SIZE,
} from "../global/constants.ts";
import { Cell } from "../global/types.ts";
import InfCell from "./InfCell.tsx";

export default function InfGrid() {
  let grid: Cell[][] = INITIAL_GRID;

  return (
    <div class="px-2 py-4">
      <div
        class="scale-75 md:scale-90 lg:scale-100 xl:scale-125"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${INITIAL_GRID_SIZE}, ${PIXEL_SIZE}px)`,
          width: "100%",
          gap: "4px",
        }}
      >
        {grid.flat().map((cell) => (
          <InfCell key={`pixel-${cell.x}-${cell.y}-${cell.value}`} {...cell} />
        ))}
      </div>
    </div>
  );
}
