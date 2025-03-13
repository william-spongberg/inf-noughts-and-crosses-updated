import { CELL_SIZE } from "../global/constants.ts";
import { Cell, CellValue, Turn } from "../global/types.ts";
import {
  changeTurn,
  currentCell,
  currentTurn,
  firstTurn,
  grid,
  updateValidCells,
  validCells,
} from "../global/utils.ts";

export default function InfCell({ value, x, y }: Cell) {
  const handleClick = () => {
    if (
      value === CellValue.Empty &&
      (validCells.value.includes(`${x}-${y}`) || firstTurn.value)
    ) {
      // update globals
      if (currentTurn.value === Turn.Nought) {
        currentCell.value = { value: CellValue.Nought, x, y };
        grid.value.cells.set(`${x}-${y}`, currentCell.value);
        updateValidCells(x, y);
      } else {
        currentCell.value = { value: CellValue.Cross, x, y };
        grid.value.cells.set(`${x}-${y}`, currentCell.value);
        updateValidCells(x, y);
      }
      firstTurn.value = false;
      changeTurn();
    }
  };

  const displaySymbol = () => {
    if (value === CellValue.Nought) return "O";
    if (value === CellValue.Cross) return "X";
    return "";
  };

  return (
    <button
      type="button"
      className={`${
        validCells.value.includes(`${x}-${y}`) || firstTurn.value
          ? "hover:bg-slate-300 bg-slate-200"
          : "bg-white"
      }`}
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      }}
      onClick={handleClick}
    >
      <text class="text-5xl">
        {displaySymbol()}
      </text>
    </button>
  );
}
