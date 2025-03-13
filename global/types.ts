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

export enum Direction {
  Up = 0,
  Down,
  Left,
  Right,
}

export interface ChildrenProps {
  children: ComponentChildren;
}

export interface Cell {
  value: CellValue;
  x: number;
  y: number;
}

export interface Grid {
  cells: Map<[number, number], Cell>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
