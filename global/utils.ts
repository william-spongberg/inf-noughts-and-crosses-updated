import { Cell, Turn } from "./types.ts";

import { signal } from "@preact/signals";

export const currentTurn = signal<Turn>(Turn.Nought);

// check if win for 3x3 area
export function checkWin(cell: Cell, area: Cell[][]) {
}
