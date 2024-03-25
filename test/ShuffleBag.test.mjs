import { describe, expect, test, beforeEach } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("ShuffleBag Class", () => {
    test("It accepts items into the bag", () => {
        const bag = new ShuffleBag([Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE])
        expect(bag.items).toStrictEqual([Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE])
        expect(bag.currentIndex).toEqual(2)
    })

    test("It returns a shape", () => {
        const shapes = [Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE]

        const bag = new ShuffleBag(shapes)
        const tetromino = bag.next()

        expect(shapes).toEqual(expect.arrayContaining([tetromino]))
    })

    test("It returns a random shape after 2 next calls", () => {
        const shapes = [Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE]

        const bag = new ShuffleBag(shapes)
        const tetromino = bag.next()
        const tetromino2 = bag.next()


        expect(tetromino).not.toStrictEqual(tetromino2)
    })
})