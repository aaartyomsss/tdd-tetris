export class Board {
  width;
  height;
  boardMatrix = [];
  fallingElement;
  fallingElementTopLeftIndex

  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (let i = 0; i < this.height; i++) {
      const row = '.'.repeat(width).split('')
      this.boardMatrix.push(row)
    }
  }

  hasFalling() {
    return !!this.fallingElement 
  }

  drop(element) {
    if (this.fallingElement) {
      throw new Error("already falling")
    }
    this.fallingElement = element
    if (element.width && element.height) {
      const startingPosition = Math.floor((this.width - element.width) / 2)
      this.fallingElementTopLeftColumnIndex = [startingPosition, 0]
      for (let i = 0; i < element.height; i++) {
        for (let j = 0; j < element.width; j++) {
          this.boardMatrix[i][startingPosition + j] = element.shapeMatrix[i][j]
        }
      }
    } else {
      const middleColumn = Math.floor(this.width / 2)
      this.fallingElementTopLeftIndex = [middleColumn, 0]
      this.boardMatrix[0][middleColumn] = element}
  }

  tick() {
      const [col, row] = this.fallingElementTopLeftIndex
      if (!col) return
      if (row + 1 === this.height || this.boardMatrix[row + 1][col] !== '.') {
        this.fallingElement = undefined
        this.fallingElementTopLeftIndex = undefined
        return
      }
      this.boardMatrix[row][col] = '.'
      this.boardMatrix[row + 1][col] = this.fallingElement
      this.fallingElementTopLeftIndex = [col, row + 1]
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
