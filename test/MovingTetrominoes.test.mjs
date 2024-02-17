
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";



describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Can be moved right by one", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Can be moved left by one", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Can be moved left by twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..T.......
       .TTT......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();


    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );

  })

  test("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()


    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );

  })

  test("cannot be moved right and then ticks down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.tick()


    expect(board.toString()).to.equalShape(
      `..........
       .....T....
       ....TTT...
       ..........
       ..........
       ..........`
    );

  })

  test("Player can move shape down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()


    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );

  })

  test("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })
  
});