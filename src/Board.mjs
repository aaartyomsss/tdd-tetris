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
          if (i - this.fallingElement.freeRowsFromTop() >= 0) {
            this.boardMatrix[i - this.fallingElement.freeRowsFromTop()][startingPosition + j] =
              element.shapeMatrix[i][j];
          }
        }
      }
    } else {
      const middleColumn = Math.floor(this.width / 2);
      this.fallingElementTopLeftIndex = [middleColumn, 0];
      this.boardMatrix[0][middleColumn] = element;
    }
  }

  rotateRight() {
    if (!this.fallingElement) return;
    const newElement = this.fallingElement.rotateRight();
    if (!this.checkUpdateElementOnBoardPostRotation(newElement)) return;
    this.fallingElement = newElement;
    this.updateElementOnBoardPostRotation();
  }

  rotateLeft() {
    if (!this.fallingElement) return;
    const newElement = this.fallingElement.rotateLeft();
    if (!this.checkUpdateElementOnBoardPostRotation(newElement)) return;
    this.fallingElement = newElement;
    this.updateElementOnBoardPostRotation();
  }

  checkUpdateElementOnBoardPostRotation(maybeNewElement) {
    const [col, row] = this.fallingElementTopLeftIndex;
    console.log("Current index col, row", col, row);
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();
    console.log("Aux board");
    console.log(auxBoard);
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = this.fallingElement.width - 1; j >= 0; j--) {
        if (row + i >= this.height || col + j >= this.width) {
          return false;
        }
        if (maybeNewElement.shapeMatrix[i][j] !== "." && auxBoard[row + i][col + j] !== ".") {
          return false;
        }
      }
    }
    return true;
  }

  updateElementOnBoardPostRotation() {
    const [col, row] = this.fallingElementTopLeftIndex;
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = this.fallingElement.width - 1; j >= 0; j--) {
        this.boardMatrix[row + i][col + j] = this.fallingElement.shapeMatrix[i][j];
      }
    }
  }

  createAuxBoardWithoutCurrentlyFallingElement() {
    const [col, row] = this.fallingElementTopLeftIndex;
    const auxBoard = JSON.parse(JSON.stringify(this.boardMatrix));
    const elementHeightWithoutBottomDots = this.fallingElement.height - this.fallingElement.freeRowsFromBottom();
    const startingIndexOfTheColumn = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    const endingIndexOfTheColumn = this.fallingElement.freeColsFromLeft();
    for (let i = elementHeightWithoutBottomDots; i >= 0; i--) {
      for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
        if (
          i - this.fallingElement.freeRowsFromTop() >= 0 &&
          row + i < this.height &&
          col + j < this.width &&
          this.fallingElement.shapeMatrix[i][j] === auxBoard[row + i - this.fallingElement.freeRowsFromTop()][col + j]
        ) {
          auxBoard[row + i - this.fallingElement.freeRowsFromTop()][col + j] = ".";
        }
      }
    }
    return auxBoard;
  }

  isHeightFree(col, colStart, height) {
    for (let i = colStart; i <= colStart + height - 1; i++) {
      if (this.boardMatrix[i][col] !== ".") return false;
    }
    return true;
  }

  isUpcomingHeightFree(colDirection) {
    const [col, row] = this.fallingElementTopLeftIndex;
    const elementHeightWithoutBottomDots = this.fallingElement.height - this.fallingElement.freeRowsFromBottom();
    if (colDirection === 1) {
      return this.isHeightFree(col + this.fallingElement.width, row, elementHeightWithoutBottomDots);
    } else if (colDirection === -1) {
      return this.isHeightFree(col - 1, row, elementHeightWithoutBottomDots);
    }
  }

  isWidthFree(row, start, length) {
    for (let i = start; i < start + length; i++) {
      if (row[i] !== ".") return false;
    }
    return true;
  }

  #moveTetromino(row, col) {
    const startingIndexOfTheColumn = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    const endingIndexOfTheColumn = this.fallingElement.freeColsFromLeft();
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
        if (row + i + 1 < this.height && "." === this.boardMatrix[row + i + 1][col + j]) {
          this.boardMatrix[row + i + 1][col + j] = this.fallingElement.shapeMatrix[i][j];
        }
        if (row + i < this.height) {
          this.boardMatrix[row + i][col + j] = ".";
        }
      }
    }
  }

  #checkMoveTetromino(row, col) {
    const upcomingRow = row + 1 + this.fallingElement.height - 1 - this.fallingElement.freeRowsFromBottom();
    const startingIndexOfTheColumn = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    const endingIndexOfTheColumn = this.fallingElement.freeColsFromLeft();
    for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
      if (upcomingRow < this.height && "." !== this.boardMatrix[upcomingRow][col + j]) {
        return false;
      }
    }
    return true;
  }

  moveTetromino() {
    if (!this.fallingElement) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (
      !this.#checkMoveTetromino(row, col) ||
      row + this.fallingElement.height - this.fallingElement.freeRowsFromBottom() === this.height
    ) {
      this.fallingElement = undefined;
      this.fallingElementTopLeftIndex = undefined;
      return;
    }

    this.#moveTetromino(row, col);
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

  moveRight() {
    if (!this.fallingElement) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (col + this.fallingElement.width === this.width) return;
    if (!this.isUpcomingHeightFree(1)) return;
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = this.fallingElement.width - 1; j >= 0; j--) {
        if (col + j + 1 < this.width && row + i < this.height && "." === this.boardMatrix[row + i][col + j + 1]) {
          this.boardMatrix[row + i][col + j + 1] = this.fallingElement.shapeMatrix[i][j];
        }

        if (row + i < this.height) {
          this.boardMatrix[row + i][col + j] = ".";
        }
      }
    }
    this.fallingElementTopLeftIndex = [col + 1, row];
  }

  moveLeft() {
    if (!this.fallingElement) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (col === 0) return;
    if (!this.isUpcomingHeightFree(-1)) return;
    for (let i = 0; i < this.fallingElement.height; i++) {
      for (let j = 0; j < this.fallingElement.width; j++) {
        if (col + j - 1 >= 0 && "." === this.boardMatrix[row + i][col + j - 1]) {
          this.boardMatrix[row + i][col + j - 1] = this.fallingElement.shapeMatrix[i][j];
        }
        if (col + j >= 0) {
          this.boardMatrix[row + i][col + j] = ".";
        }
      }
    }
    this.fallingElementTopLeftIndex = [col - 1, row];
  }

  moveDown() {
    this.moveTetromino();
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
