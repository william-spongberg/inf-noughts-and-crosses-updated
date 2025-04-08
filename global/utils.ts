import { Cell, CellValue, Direction, Grid, Turn } from "./types.ts";
import { DEFAULT_CELL, DEFAULT_GRID } from "./constants.ts";
import { signal } from "@preact/signals";

// could make currentTurn boolean, but keeping as enum for readability for now
export const currentTurn = signal<Turn>(Turn.Nought);
export const currentCell = signal<Cell>(DEFAULT_CELL);
export const grid = signal<Grid>(DEFAULT_GRID);
export const validCells = signal<string[]>([]);
export const firstTurn = signal<boolean>(true);
export const bankCountX = signal<number>(0);
export const bankCountO = signal<number>(0);
export const usingBankedTurn = signal<boolean>(false);

export function changeTurn() {
  // don't change turn if using banked turn
  if (usingBankedTurn.value) {
    usingBankedTurn.value = false;
    return;
  }

  if (currentTurn.value === Turn.Nought) {
    currentTurn.value = Turn.Cross;
  } else {
    currentTurn.value = Turn.Nought;
  }
}

// bank a turn for later use
export function bankTurn() {
  // update banked count
  if (currentTurn.value === Turn.Nought) {
    bankCountO.value++;
  } else {
    bankCountX.value++;
  }

  changeTurn();

  // if not first turn, ensure valid cells are updated
  if (!firstTurn.value) {
    updateValidCells(currentCell.value.x, currentCell.value.y);
  }
}

// use banked turn instead
export function useBankedTurn() {
  const hasBankedTurns = currentTurn.value === Turn.Nought
    ? bankCountO.value > 0
    : bankCountX.value > 0;

  if (hasBankedTurns) {
    if (currentTurn.value === Turn.Nought) {
      bankCountO.value--;
    } else {
      bankCountX.value--;
    }

    usingBankedTurn.value = true;
  }
}

// only allow vertically or horizontally adjacent
export function updateValidCells(x: number, y: number) {
  validCells.value = [];

  // left
  if (grid.value.cells.get(`${x - 1}-${y}`)?.value === CellValue.Empty) {
    validCells.value.push(`${x - 1}-${y}`);
  } else {
    console.log(`left has ${grid.value.cells.get(`${x - 1}-${y}`)?.value}`);
  }

  // right
  if (grid.value.cells.get(`${x + 1}-${y}`)?.value === CellValue.Empty) {
    validCells.value.push(`${x + 1}-${y}`);
  } else {
    console.log(`right has ${grid.value.cells.get(`${x + 1}-${y}`)?.value}`);
  }

  // up
  if (grid.value.cells.get(`${x}-${y - 1}`)?.value === CellValue.Empty) {
    validCells.value.push(`${x}-${y - 1}`);
  } else {
    console.log(`up has ${grid.value.cells.get(`${x}-${y - 1}`)?.value}`);
  }

  // down
  if (grid.value.cells.get(`${x}-${y + 1}`)?.value === CellValue.Empty) {
    validCells.value.push(`${x}-${y + 1}`);
  } else {
    console.log(`down has ${grid.value.cells.get(`${x}-${y + 1}`)?.value}`);
  }

  console.log(validCells.value);
}

export function extendGrid(dir: Direction) {
  console.log("extending grid!");
  const newGrid = grid.value;

  switch (dir) {
    case Direction.Up:
      // add new row at the top
      for (let x = newGrid.minX; x < newGrid.maxX; x++) {
        const newCell = { ...DEFAULT_CELL, x, y: newGrid.minY - 1 };
        newGrid.cells.set(`${x}-${newGrid.minY - 1}`, newCell);
      }
      newGrid.minY--;
      break;

    case Direction.Down:
      // add new row at the bottom
      for (let x = newGrid.minX; x < newGrid.maxX; x++) {
        const newCell = { ...DEFAULT_CELL, x, y: newGrid.maxY };
        newGrid.cells.set(`${x}-${newGrid.maxY}`, newCell);
      }
      newGrid.maxY++;
      break;

    case Direction.Left:
      // add new column to the left
      for (let y = newGrid.minY; y < newGrid.maxY; y++) {
        const newCell = { ...DEFAULT_CELL, x: newGrid.minX - 1, y };
        newGrid.cells.set(`${newGrid.minX - 1}-${y}`, newCell);
      }
      newGrid.minX--;
      break;

    case Direction.Right:
      // add new column to the right
      for (let y = newGrid.minY; y < newGrid.maxY; y++) {
        const newCell = { ...DEFAULT_CELL, x: newGrid.maxX, y };
        newGrid.cells.set(`${newGrid.maxX}-${y}`, newCell);
      }
      newGrid.maxX++;
      break;
  }
  grid.value = newGrid;
  console.log(grid.value);

  // if using banked turn, don't change turn
  if (usingBankedTurn.value) {
    usingBankedTurn.value = false;
  } else {
    changeTurn();
  }

  updateValidCells(currentCell.value.x, currentCell.value.y);
}

// check if game over
export function checkGameOver(): boolean {
  const WIN_LENGTH = 4;
  const INAROW = WIN_LENGTH - 1;

  const { x: currX, y: currY, value: currValue } = currentCell.value;
  console.log(`cell at ${currX}, ${currY} set to ${currValue}`);

  // check available moves - if none game over
  if (validCells.value.length === 0) {
    return true;
  }

  // count matching cells in a direction
  const countInDirection = (dirX: number, dirY: number): number => {
    let count = 0;
    for (let i = 1; i <= INAROW; i++) {
      const cell = grid.value.cells.get(
        `${currX + dirX * i}-${currY + dirY * i}`,
      );
      if (cell && cell.value === currValue) {
        count++;
      } else {
        break;
      }
    }
    return count;
  };

  // check horizontal vertical and both diagonals
  // if any more than 2 is win (since include current cell)

  // check left and right
  if (countInDirection(-1, 0) + countInDirection(1, 0) >= INAROW) {
    return true;
  }

  // check up and down
  if (countInDirection(0, -1) + countInDirection(0, 1) >= INAROW) {
    return true;
  }

  // check top-left to bottom-right
  if (countInDirection(-1, -1) + countInDirection(1, 1) >= INAROW) {
    return true;
  }

  // check top-right to bottom-left
  if (countInDirection(1, -1) + countInDirection(-1, 1) >= INAROW) {
    return true;
  }

  return false;
}
