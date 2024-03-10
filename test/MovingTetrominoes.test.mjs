
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

  test("Can be moved right by one", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    console.log(board.toString())

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
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

  test("it cannot be moved down beyond through other shapes", () => {
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
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  })
  
  test("it cannot be moved left through other shapes", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board, 4)
    board.moveLeft()
    board.moveLeft()


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  })

  test("it cannot be moved right through other shapes", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board, 4)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....T..T.
       ....TTTTTT`
    );
  })

  test("tetrominos can be stacked on top of each other with not equal column indexing", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    fallToBottom(board)


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...T......
       ..TTTT....
       ....TTT...`
    );
  })
  
});
