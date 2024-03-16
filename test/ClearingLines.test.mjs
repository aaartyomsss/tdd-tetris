import { describe, test, expect } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function tickTick(board, len = 5) {
    for (let i = 0; i < len; i++) {
        board.tick()
    }
}

describe("Clearing Lines", () => {
    test("Row is ready to be cleared", () => {
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

        expect(board.checkForLineClear()).toBe(true)
    })

    test("Row is not ready to be cleared", () => {
        const board = new Board(8, 6)
        board.drop(Tetromino.I_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        tickTick(board, 6)
        
        expect(board.checkForLineClear()).toBe(false)
    })

    test.skip("Row is cleared", () => {
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

    
})