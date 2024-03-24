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

    test("NintendoScoring is capable of performing and update on 1 row removed", () => {
        const scoringSystem = new NintendoScoring()
        expect(scoringSystem.score).toEqual(0)
        scoringSystem.updateScore(1)
        expect(scoringSystem.score).toEqual(40)
    })

})