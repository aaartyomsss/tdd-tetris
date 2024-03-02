
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


function fallToBottom(board, limit = 10) {
  for (let i = 0; i < limit; i++) {
    board.tick();
  }
}

describe("Falling rotating tetrominoes only T shape", () => {
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

  test("Tetromino can stand side by side once rotated in reverse order", () => {
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
  
  test("Tetromino can be rotated on the board to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
    );
  });

  test("Tetromino can stand side by side once rotated to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.T...
       ...TTTT...
       ....T.T...`
    );
  });

});

describe('Falling rotating tetrominoes only I shape', () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 10);
  });

  test("Tetrominos of shape I can stand side by side", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ....II....
       ....II....
       ....II....
       ....II....`
    );
  });

  test("Tetromino cannot be rotated if there is no space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveRight()   
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board, 6)
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ......II..
       ......II..
       ......II..
       ......II..`
    );
  });

  test("Tetromino cannot be rotated left if there is no space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveRight()   
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board, 6)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ......II..
       ......II..
       ......II..
       ......II..`
    );
  });
})

describe("Falling tetromino shape I on a small board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });


  test("Shape I can be dropped when another I is standing vertically", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)

    expect(board.toString()).to.equalShape(
      `..IIII....
       ..........
       ....I.....
       ....I.....
       ....I.....
       ....I.....`
    );
  })

  test("I can be pushed all the way to the left", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()


    expect(board.toString()).to.equalShape(
      `I.........
       I.........
       I.........
       I.........
       ..........
       ..........`
    );
  })

})