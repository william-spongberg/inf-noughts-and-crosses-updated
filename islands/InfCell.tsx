import { CELL_SIZE } from "../global/constants.ts";
import { Cell, CellValue, Turn } from "../global/types.ts";
import { useEffect, useState } from "preact/hooks";
import { currentTurn } from "../global/utils.ts";

const WHITE = "#FFFFFF";

export default function InfCell({ value, x, y }: Cell) {
  // TODO: change to useSignal?
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    switch (value) {
      case CellValue.Empty:
        setSymbol("");
        break;
      case CellValue.Nought:
        setSymbol("O");
        break;
      case CellValue.Cross:
        setSymbol("X");
        break;
    }
  }, [value]);

  const handleClick = () => {
    if (symbol === "") {
      // update cell, switch turns
      setSymbol(() => {
        switch (currentTurn.value) {
          case Turn.Nought:
            currentTurn.value = Turn.Cross;
            return "O";
          case Turn.Cross:
            currentTurn.value = Turn.Nought;
            return "X";
        }
      });
    }
    console.log(`button at ${x}, ${y} clicked`);
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
      <text class="text-4xl">
        {symbol}
      </text>
    </button>
  );
}
