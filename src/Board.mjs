export class Board {
  width;
  height;
  boardMatrix = [];
  fallingElement;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (let i = 0; i < this.height; i++) {
      const row = '.'.repeat(width).split('')
      this.boardMatrix.push(row)
    }
  }

  drop(element) {
    if (this.fallingElement) {
      throw new Error("already falling")
    }
    this.fallingElement = element
    const middleColumn = Math.floor(this.width / 2)
    this.boardMatrix[0][middleColumn] = element
  }

  tick() {
    for (let i = 0; i < this.height; i++) {
      const col = this.boardMatrix[i].indexOf(this.fallingElement)
      if (col === -1) continue
      this.boardMatrix[i][col] = '.'
      this.boardMatrix[i + 1][col] = this.fallingElement
      break
    }
  }

  toString() {
    let result = ''
    for (let i = 0; i < this.boardMatrix.length; i++){
      const matrixRow = this.boardMatrix[i]
      const row = matrixRow.join('').concat('\n')
      result += row
    }
    return result
  }
}
