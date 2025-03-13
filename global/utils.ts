import { Cell, Direction, Grid, Turn } from "./types.ts";
import { DEFAULT_CELL, DEFAULT_GRID } from "./constants.ts";
import { signal } from "@preact/signals";

// could make currentTurn boolean, but keeping as enum for readability for now
export const currentTurn = signal<Turn>(Turn.Nought);
export const currentCell = signal<Cell>(DEFAULT_CELL);
export const grid = signal<Grid>(DEFAULT_GRID);

export function extendGrid(dir: Direction) {
  console.log("extending grid!");
  const newGrid = {
    ...grid.value,
    cells: new Map(grid.value.cells),
  };

  switch (dir) {
    case Direction.Up:
      // add new row at the top
      for (let x = newGrid.minX; x < newGrid.maxX; x++) {
        const newCell = { ...DEFAULT_CELL, x, y: newGrid.minY - 1 };
        newGrid.cells.set([x, newGrid.minY - 1], newCell);
      }
      newGrid.minY--;
      break;

    case Direction.Down:
      // add new row at the bottom
      for (let x = newGrid.minX; x < newGrid.maxX; x++) {
        const newCell = { ...DEFAULT_CELL, x, y: newGrid.maxY + 1 };
        newGrid.cells.set([x, newGrid.maxY + 1], newCell);
      }
      newGrid.maxY++;
      break;

    case Direction.Left:
      // add new column to the left
      for (let y = newGrid.minY; y < newGrid.maxY; y++) {
        const newCell = { ...DEFAULT_CELL, x: newGrid.minX - 1, y };
        newGrid.cells.set([newGrid.minX - 1, y], newCell);
      }
      newGrid.minX--;
      break;

    case Direction.Right:
      // add new column to the right
      for (let y = newGrid.minY; y < newGrid.maxY; y++) {
        const newCell = { ...DEFAULT_CELL, x: newGrid.maxX + 1, y };
        newGrid.cells.set([newGrid.maxX + 1, y], newCell);
      }
      newGrid.maxX++;
      break;
  }
  console.log(grid);
  grid.value = newGrid;
}

// check if win has occured
export function checkWin() {
  const { x, y, value } = currentCell.value;
  console.log(`button at ${x}, ${y} set to ${value}`);
}
