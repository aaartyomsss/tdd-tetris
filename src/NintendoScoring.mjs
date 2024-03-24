

export class NintendoScoring {
    score = 0
    level = 0

    constructor(level = 0) {
        this.level = level
    }

    updateScore(rowsCleared) {
        if (rowsCleared === 1) {
            this.score += 40 * (this.level + 1)
        }
    }
}