import { Cell, Grid, Turn } from "./types.ts";
import { DEFAULT_CELL } from "./constants.ts";
import { signal } from "@preact/signals";

// could make boolean, but keeping as enum for readability for now
export const currentTurn = signal<Turn>(Turn.Nought);
// default cell values
export const currentCell = signal<Cell>(DEFAULT_CELL);

export function addRow(grid: Grid) {
  
}

// check if win occured
export function checkWin(grid: Grid) {
  const { x, y, value } = currentCell.value;
  console.log(`button at ${x}, ${y} set to ${value}`);


}
