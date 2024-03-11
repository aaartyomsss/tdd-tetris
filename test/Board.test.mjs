import { describe, test, expect } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Some board specific functions", () => {
  test("Returns auxiliary board without the currently falling element", () => {
    const board = new Board(10, 6);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    const aux = board.createAuxBoardWithoutCurrentlyFallingElement();

    expect(aux).to.toStrictEqual([
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "T", ".", ".", ".", ".", "."],
      [".", ".", ".", "T", "T", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "T", ".", ".", ".", ".", "."],
    ]);
  });

  test("Returns aux array when T is rotated and pushed to the left", () => {
    const board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    const aux = board.createAuxBoardWithoutCurrentlyFallingElement();

    expect(aux).to.toStrictEqual([
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ]);
  });
});
