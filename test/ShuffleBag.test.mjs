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

    test("It returns all shapes after 3 calls", () => {
        const shapes = [Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE]

        const bag = new ShuffleBag(shapes)
        const tetromino = bag.next()
        const tetromino2 = bag.next()
        const tetromino3 = bag.next()


        expect(shapes).toEqual(expect.arrayContaining([tetromino, tetromino2, tetromino3]))
    })

    test("Can be called more than the amount of items in the bag", () => {
        const shapes = [Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE]

        const bag = new ShuffleBag(shapes)
        bag.next()
        bag.next()
        bag.next()
        const tetromino4 = bag.next()


        expect(shapes).toEqual(expect.arrayContaining([tetromino4]))
    })

    test("Even distribution after n rounds", () => {
        const shapes = [Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE]

        const counts = {
            I: 0,
            L: 0,
            O: 0
        }
        const rounds = 10
        const bag = new ShuffleBag(shapes)
        for (let i = 0; i < rounds * 3; i++) {
            const tetromino = bag.next()
            counts[tetromino.shapeType] += 1 
        }


        expect(counts.I).toEqual(10)
        expect(counts.L).toEqual(10)
        expect(counts.O).toEqual(10)
    })
})