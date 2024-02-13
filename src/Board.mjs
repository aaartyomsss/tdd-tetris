export class Board {
  width;
  height;
  boardMatrix = [];
  fallingElement;
  fallingElementTopLeftIndex;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (let i = 0; i < this.height; i++) {
      const row = ".".repeat(width).split("");
      this.boardMatrix.push(row);
    }
  }

  hasFalling() {
    return !!this.fallingElement;
  }

  drop(element) {
    if (this.fallingElement) {
      throw new Error("already falling");
    }
    this.fallingElement = element;
    if (element.width && element.height) {
      const startingPosition = Math.floor((this.width - element.width) / 2);
      this.fallingElementTopLeftIndex = [startingPosition, 0];
      for (let i = 0; i < element.height; i++) {
        for (let j = 0; j < element.width; j++) {
          this.boardMatrix[i][startingPosition + j] = element.shapeMatrix[i][j];
        }
      }
    } else {
      const middleColumn = Math.floor(this.width / 2);
      this.fallingElementTopLeftIndex = [middleColumn, 0];
      this.boardMatrix[0][middleColumn] = element;
    }
  }

  rowIsCompletelyFree(row) {
    for (const i in row) {
      if (row[i] !== ".") {
        return false;
      }
    }
    return true;
  }

  isUpcomingSpaceInFrontOfTetrominoIsFree() {
    const [col, row] = this.fallingElementTopLeftIndex;
    return (
      this.boardMatrix[row + this.fallingElement.height - this.fallingElement.freeRowsFromBottom()] &&
      this.isWidthFree(
        this.boardMatrix[row + this.fallingElement.height - this.fallingElement.freeRowsFromBottom()],
        col,
        this.fallingElement.width
      )
    );
  }

  isWidthFree(row, start, length) {
    for (let i = start; i < start + length; i++) {
      if (row[i] !== ".") return false;
    }
    return true;
  }

  #moveTetromino(row, col) {
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = this.fallingElement.width - 1; j >= 0; j--) {
        if (row + i + 1 < this.height && "." === this.boardMatrix[row + i + 1][col + j]) {
          this.boardMatrix[row + i + 1][col + j] = this.fallingElement.shapeMatrix[i][j];
        }
        if (row + i < this.height) {
          this.boardMatrix[row + i][col + j] = ".";
        }
      }
    }
  }

  moveTetromino() {
    const [col, row] = this.fallingElementTopLeftIndex;
    if (
      (row + this.fallingElement.height === this.height &&
        !this.rowIsCompletelyFree(this.boardMatrix[this.height - 1])) ||
      !this.isUpcomingSpaceInFrontOfTetrominoIsFree()
    ) {
      this.fallingElement = undefined;
      this.fallingElementTopLeftIndex = undefined;
      return;
    }
    this.#moveTetromino(row, col)
    this.fallingElementTopLeftIndex = [col, row + 1];
  }

  tick() {
    if (!this.fallingElementTopLeftIndex) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (row + 1 === this.height || (this.boardMatrix[row + 1][col] !== "." && !this.fallingElement.width)) {
      this.fallingElement = undefined;
      this.fallingElementTopLeftIndex = undefined;
      return;
    }
    if (!this.fallingElement.width) {
      this.boardMatrix[row][col] = ".";
      this.boardMatrix[row + 1][col] = this.fallingElement;
      this.fallingElementTopLeftIndex = [col, row + 1];
    } else {
      this.moveTetromino();
    }
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.boardMatrix.length; i++) {
      const matrixRow = this.boardMatrix[i];
      const row = matrixRow.join("").concat("\n");
      result += row;
    }
    return result;
  }
}
