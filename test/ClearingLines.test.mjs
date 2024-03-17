import { describe, test, expect } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function tickTick(board, len = 5) {
    for (let i = 0; i < len; i++) {
        board.tick()
    }
}

describe("Clearing Lines", () => {

    test("Row is not ready to be cleared", () => {
        const board = new Board(8, 6)
        board.drop(Tetromino.I_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)

        expect(board.checkForLineClear(5)).toBe(false)
    })

    test("Last row is cleared", () => {
        const board = new Board(8, 6)
        board.drop(Tetromino.I_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)
        board.drop(Tetromino.I_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        tickTick(board, 6)

        expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........`
        );
    })

    test("Last 2 rows are cleared at the same time", () => {
        const board = new Board(4, 6)
        board.drop(Tetromino.O_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)
        board.drop(Tetromino.O_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        tickTick(board, 6)

        expect(board.toString()).to.equalShape(
        `....
         ....
         ....
         ....
         ....
         ....`
        );
    })

    test("Last 4 rows are cleared at the same time", () => {
        const board = new Board(4, 6)
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.rotateLeft()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        tickTick(board, 6)
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.rotateLeft()
        board.moveLeft()
        tickTick(board, 6)
        board.drop(Tetromino.I_SHAPE)
        board.tick()
        board.rotateLeft()
        tickTick(board, 6)

        expect(board.toString()).to.equalShape(
        `....
         ....
         ....
         ....
         ....
         ....`
        );
    })

    test.skip("After clearing lines, top row is moved down", () => {
        const board = new Board(6, 6)
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateLeft()
        board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateLeft()
        board.rotateLeft()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        tickTick(board, 6)

        expect(board.toString()).to.equalShape(
            `......
             ......
             ......
             ......
             ......
             .T..T.`
            );



    })

    
})