import { describe, expect, test, beforeEach } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("ShuffleBag Class", () => {
    test("It accepts items into the bag", () => {
        const bag = new ShuffleBag([Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE])
        expect(bag.items).toStrictEqual([Tetromino.I_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE])
        expect(bag.currentIndex).toEqual(2)
    })
})