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

  test("Returns aux array when T is rotated twice", () => {
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

  test("T after one tick does not have top row deduction", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    expect(board.fallingElementTopRowDeduction).toBe(false)
  })

  test("T after mutiple ticks does not have top row deduction", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    board.tick()
    board.tick()
    expect(board.fallingElementTopRowDeduction).toBe(false)
  })

  test("T after mutiple chaotic moves does not have top row deduction", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    board.moveRight()
    board.rotateRight()
    board.tick()
    board.tick()
    expect(board.fallingElementTopRowDeduction).toBe(false)
  })

  test("I after one tick does not have top row deduction", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    expect(board.fallingElementTopRowDeduction).toBe(false)
  })

  test("Tetromino has initially deduction after one element has oalready been dropped", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.tick()
    board.tick()
    board.tick()
    board.tick()
    board.tick()
    board.tick()
    board.tick()
    board.drop(Tetromino.I_SHAPE)
    expect(board.fallingElementTopRowDeduction).toBe(true)
  })
})

describe("Amount of top row deduction", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  test("T initially has 1 deduction from top row", () => {
    board.drop(Tetromino.T_SHAPE)

    expect(board.freeTopSpaceDeducation()).toBe(1)
  })

  test("T after one tick has 0 deduction", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()

    expect(board.freeTopSpaceDeducation()).toBe(0)
  })
})