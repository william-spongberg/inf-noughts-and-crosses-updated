import { ComponentChildren } from "preact";

export enum CellValue {
  Empty = 0,
  Nought,
  Cross
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
