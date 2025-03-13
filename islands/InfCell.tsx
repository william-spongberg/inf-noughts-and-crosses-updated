import { PIXEL_SIZE } from "../global/constants.ts";
import { Cell } from "../global/types.ts";
import { useEffect, useState } from "preact/hooks";

const WHITE = "#FFFFFF"
const BLACK = "#00000F"

export default function InfCell({ value, x, y }: Cell) {
  const [colour, setColour] = useState(WHITE);

  useEffect(() => {
    console.log("Updating cell!");
  }, [colour]);

  const handleClick = () => {
    if (colour === WHITE) {
      setColour(BLACK);
    } else {
      setColour(WHITE);
    }
    console.log(`button at ${x}, ${y} clicked`);
  };

  return (
    <button
      type = "button"
      style={{
        backgroundColor: colour,
        width: `${PIXEL_SIZE}px`,
        height: `${PIXEL_SIZE}px`,
      }}
      onClick={handleClick}
    >
    </button>
  );
}