
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


function fallToBottom(board, limit = 10) {
  for (let i = 0; i < limit; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Tetromino can be rotated on the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ....TT....
       ....T.....
       ..........
       ..........`
    );
  });

  test("Tetromino can stand side by side once rotated", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    fallToBottom(board)
    

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       ..TTTT....
       ..T.T.....`
    );
  });

  test.skip("Tetromino can stand side by side once rotated in reverse order", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       ..TTTT....
       ..T.T.....`
    );
  });
  
});
