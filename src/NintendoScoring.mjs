

export class NintendoScoring {
    score = 0
    level = 0

    constructor(level = 0) {
        this.level = level
    }

    updateScore(rowsCleared) {
        let baseLinePoints
        if (rowsCleared === 1) {
            baseLinePoints = 40 
        } else if (rowsCleared === 2) {
            baseLinePoints = 100
        } else if (rowsCleared === 3) {
            baseLinePoints = 300
        } else if (rowsCleared === 4) {
            baseLinePoints = 1200
        }

        this.score += baseLinePoints * (this.level + 1)
    }
}