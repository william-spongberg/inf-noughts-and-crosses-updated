import { CELL_SIZE } from "../global/constants.ts";
import { Cell, CellValue } from "../global/types.ts";
import { useEffect, useState } from "preact/hooks";

const WHITE = "#FFFFFF";
const BLACK = "#000000";

export default function InfCell({ value, x, y }: Cell) {
  const [colour, setColour] = useState(WHITE);
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

  useEffect(() => {
    console.log("Updating cell!");
  }, [colour]);

  const handleClick = () => {
    // testing
    setSymbol((prevSymbol) => {
      switch (prevSymbol) {
        case "O":
          return "X";
        case "X":
          return "";
        default:
          return "O";
      }
    });
    console.log(`button at ${x}, ${y} clicked`);
  };

  return (
    <button
      type="button"
      style={{
        backgroundColor: colour,
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