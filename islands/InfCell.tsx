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
      disabled={!(validCells.value.includes(`${x}-${y}`) || firstTurn.value)}
      className={`${
        validCells.value.includes(`${x}-${y}`) || firstTurn.value
          ? "hover:bg-orange-200 bg-orange-100"
          : value === CellValue.Nought
          ? "bg-blue-200"
          : value === CellValue.Cross
          ? "bg-red-200"
          : "bg-white"
      }`}
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      }}
      onClick={handleClick}
    >
      {value === CellValue.Nought
        ? (
          <text class="text-5xl text-blue-800 bg-blue-200">
            {displaySymbol()}
          </text>
        )
        : (
          <text class="text-5xl text-red-800 bg-red-200">
            {displaySymbol()}
          </text>
        )}
    </button>
  );
}
