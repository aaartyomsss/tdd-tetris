import { describe, expect, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring.mjs";

describe("NintendoScoring", () => {

    test("NintendoScoring can be instantiated", () => {
        const scoringSystem = new NintendoScoring()

        expect(scoringSystem.score).toEqual(0)
        expect(scoringSystem.level).toEqual(0)
    })

    test("NintendoScoring accepts level as a parameter", () => {
        const scoringSystem = new NintendoScoring(3)
        expect(scoringSystem.score).toEqual(0)
        expect(scoringSystem.level).toEqual(3)
    })

    test("NintendoScoring is capable of performing an update on 1 row removed", () => {
        const scoringSystem = new NintendoScoring()
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(1)
        expect(scoringSystem.score).toEqual(40)
    })

    test("NintendoScoring is capable of performing an update on 1 row removed dependently on the level", () => {
        const scoringSystemLevel2 = new NintendoScoring(1)
        scoringSystemLevel2.updateScore(1)
        expect(scoringSystemLevel2.score).toEqual(80)

        const scoringSystemLevel3 = new NintendoScoring(2)
        scoringSystemLevel3.updateScore(1)
        expect(scoringSystemLevel3.score).toEqual(120)

        const scoringSystemLevel9 = new NintendoScoring(9)
        scoringSystemLevel9.updateScore(1)
        expect(scoringSystemLevel9.score).toEqual(400)
    })

    test("NintendoScoring is capable of performing an update on 2 rows removed", () => {
        const scoringSystem = new NintendoScoring()
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(2)
        expect(scoringSystem.score).toEqual(100)
    })

    test("NintendoScoring is capable of performing an update on 3 rows removed", () => {
        const scoringSystem = new NintendoScoring()
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(3)
        expect(scoringSystem.score).toEqual(300)
    })

    test("NintendoScoring is capable of performing an update on 4 rows removed", () => {
        const scoringSystem = new NintendoScoring()
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(4)
        expect(scoringSystem.score).toEqual(1200)
    })

    test("NintendoScoring full system", () => {
        const scoringSystem = new NintendoScoring(2)
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(2)
        expect(scoringSystem.score).toEqual(300)

        scoringSystem.updateScore(1)
        expect(scoringSystem.score).toEqual(420)

        scoringSystem.updateScore(3)
        expect(scoringSystem.score).toEqual(1320)

        scoringSystem.updateScore(4)
        expect(scoringSystem.score).toEqual(4920)
    })

})