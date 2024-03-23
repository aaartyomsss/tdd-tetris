import { describe, expect, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring.mjs";

describe("NintendoScoring", () => {

    test("NintendoScoring can be instantiated", () => {
        const scoringSystem = new NintendoScoring()

        expect(scoringSystem.score).toEqual(0)
    })

})