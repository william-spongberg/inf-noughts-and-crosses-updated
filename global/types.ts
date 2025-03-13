import { ComponentChildren } from "preact";

export enum CellValue {
  Empty = 0,
  Nought,
  Cross,
}

export enum Turn {
  Nought = 0,
  Cross,
}

export interface ChildrenProps {
  children: ComponentChildren;
}

export interface Cell {
  value: CellValue;
  x: number;
  y: number;
  // add more information? hold surrounding cells for easier computation?
}
