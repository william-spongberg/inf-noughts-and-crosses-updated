import { CELL_SIZE } from "../global/constants.ts";
import { Cell, CellValue, Turn } from "../global/types.ts";
import { useState } from "preact/hooks";
import { currentCell, currentTurn } from "../global/utils.ts";

const WHITE = "#FFFFFF";

export default function InfCell({ value, x, y }: Cell) {
  // TODO: change to useSignal?
  const [symbol, setSymbol] = useState("");

  const handleClick = () => {
    if (symbol === "") {
      // update cell, switch turns
      setSymbol(() => {
        if (currentTurn.value === Turn.Nought) {
          currentTurn.value = Turn.Cross;
          currentCell.value = { value: CellValue.Nought, x, y };
          return "O";
        } else {
          currentTurn.value = Turn.Nought;
          currentCell.value = { value: CellValue.Cross, x, y };
          return "X";
        }
      });
    }
  };

  return (
    <button
      type="button"
      style={{
        backgroundColor: WHITE,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      }}
      onClick={handleClick}
    >
      <text class="text-5xl">
        {symbol}
      </text>
    </button>
  );
}
