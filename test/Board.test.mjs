import { describe, test, expect, beforeEach } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Some board specific functions", () => {
  test("Returns auxiliary board without the currently falling element", () => {
    const board = new Board(10, 6);

    board.drop(Tetromino.T_SHAPE);
    board.tick()
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

  test.skip("Returns aux array when T is rotated twice", () => {
    const board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight();
    board.rotateRight();

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

describe("Board keeps track of falling element top empty row deduction", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  test("T initially has fallingElementTopLevel deduction", () => {
    board.drop(Tetromino.T_SHAPE)


    expect(board.fallingElementTopRowDeduction).toBe(true)
  })
})