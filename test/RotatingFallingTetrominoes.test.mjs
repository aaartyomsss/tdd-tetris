
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
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("I can be rotated on the board", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  test("Tetromino can stand side by side once rotated", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       .TTTT.....
       ..T.T.....`
    );
  });

  test("Tetromino can stand side by side once rotated in reverse order", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveLeft()
    board.moveLeft()
    board.rotateRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       .TTTT.....
       ..T.T.....`
    );
  });
  
  test("Tetromino can be rotated on the board to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("Tetromino can stand side by side once rotated to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.T...
       ....TTTT..
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
    board.tick()
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.tick()
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
       .....II...
       .....II...
       .....II...
       .....II...`
    );
  });

  test("Tetromino cannot be rotated if there is no space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()   
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.tick()
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
       .......II.
       .......II.
       .......II.
       .......II.`
    );
  });

  test("Tetromino cannot be rotated left if there is no space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()   
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    board.tick()
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
       .......II.
       .......II.
       .......II.
       .......II.`
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
    board.tick()
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       .....I....
       .....I....
       .....I....
       .....I....`
    );
  })

  test("I can be pushed all the way to the left", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
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

  test("I can be pushed all the way to the right", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()


    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
    );
  })
})

describe("Wall bounce is implemented", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("T cannot be rotated right away", () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test.skip("T can be bounced from the left", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()


    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  })

  test.skip("T can be bounced from the right", () => {
    board.drop(Tetromino.T_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  })

  test.skip("T cannot be bounced from the in case of occupied place", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.tick()
    board.tick()
    board.tick()
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.rotateLeft()
    board.moveRight()
    board.tick()
    board.tick()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .......I.T
       .......ITT
       .......I.T
       .......I..`
    );
  })

  test.skip("T cannot be bounced from the in case of occupied place from the left", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.tick()
    board.tick()
    board.tick()
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateRight()
    board.moveLeft()
    board.tick()
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       T.I.......
       TTI.......
       T.I.......
       ..I.......`
    );
  })

  test("I wall bounce is implemented from the left", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateRight()

    // Good enough considering change in reqs. in level 7
    expect(board.toString()).to.equalShape(
      `..........
       IIII......
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("I wall bounce is implemented from the right", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ......IIII
       ..........
       ..........
       ..........
       ..........`
    );
  })
})