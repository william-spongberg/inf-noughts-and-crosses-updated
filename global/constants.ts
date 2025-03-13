import { Cell, CellValue } from "./types.ts";

export const PIXEL_SIZE = 100;

export const INITIAL_GRID_SIZE = 3;
export const INITIAL_GRID = Array.from(
  { length: INITIAL_GRID_SIZE },
  (_, y) =>
    Array.from({ length: INITIAL_GRID_SIZE }, (_, x): Cell => ({
      x,
      y,
      value: CellValue.Empty,
    })),
);
