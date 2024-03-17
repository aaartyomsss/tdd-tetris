export class Board {
  width;
  height;
  boardMatrix = [];
  fallingElement;
  fallingElementTopLeftIndex;
  fallingElementTopRowDeduction;

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

  freeTopSpaceDeducation() {
    if (!this.fallingElementTopRowDeduction) return 0
    return this.fallingElement.freeRowsFromTop();
  }

  drop(element) {
    if (this.fallingElement) {
      throw new Error("already falling");
    }
    this.fallingElement = element;
    // According to arika all of them have top row as free ....
    this.fallingElementTopRowDeduction = true
    if (element.width && element.height) {
      const startingPosition = Math.floor((this.width - element.width) / 2);

      this.fallingElementTopLeftIndex = [startingPosition, 0];
      for (let i = 0; i < element.height - this.fallingElement.freeRowsFromBottom(); i++) {
        for (let j = element.freeColsFromLeft(); j < element.width - element.freeColsFromRight(); j++) {
          if (i - this.freeTopSpaceDeducation() >= 0) {
            this.boardMatrix[i - this.freeTopSpaceDeducation()][startingPosition + j] = element.shapeMatrix[i][j];
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
    let startingCol = col;
    const freeColsLeft = maybeNewElement.freeColsFromLeft();
    if (col < 0 && Math.abs(col) > maybeNewElement.freeColsFromLeft()) {
      startingCol = freeColsLeft === 0 ? freeColsLeft : col + freeColsLeft;
    }
    if (col + maybeNewElement.width - maybeNewElement.freeColsFromRight() > this.width) {
      startingCol = this.width - maybeNewElement.width + maybeNewElement.freeColsFromRight();
    }
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();

    if (row - this.freeTopSpaceDeducation() < 0) return false;
    for (let i = this.fallingElement.height - 1 - maybeNewElement.freeRowsFromBottom(); i >= 0; i--) {
      for (let j = this.fallingElement.width - 1 - maybeNewElement.freeColsFromRight(); j >= 0; j--) {
        if (row - this.freeTopSpaceDeducation() + i >= this.height || startingCol + j >= this.width) {
          return false;
        }
        if (
          maybeNewElement.shapeMatrix[i][j] !== "." &&
          auxBoard[row - this.freeTopSpaceDeducation() + i][startingCol + j] !== "."
        ) {
          return false;
        }
      }
    }
    this.fallingElementTopLeftIndex = [startingCol, row];
    this.boardMatrix = auxBoard;
    return true;
  }

  updateElementOnBoardPostRotation() {
    const [col, row] = this.fallingElementTopLeftIndex;
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = this.fallingElement.width - 1; j >= 0; j--) {
        if (this.fallingElement.shapeMatrix[i][j] !== ".")
          this.boardMatrix[row + i][col + j] = this.fallingElement.shapeMatrix[i][j];
      }
    }
  }

  createAuxBoardWithoutCurrentlyFallingElement() {
    const [col, row] = this.fallingElementTopLeftIndex;
    const auxBoard = JSON.parse(JSON.stringify(this.boardMatrix));
    const elementHeightWithoutBottomDots = this.fallingElement.height - 1 - this.fallingElement.freeRowsFromBottom();
    const startingIndexOfTheColumn = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    const endingIndexOfTheColumn = this.fallingElement.freeColsFromLeft();
    for (let i = elementHeightWithoutBottomDots; i >= 0; i--) {
      for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
        if (
          i - this.freeTopSpaceDeducation() >= 0 &&
          row + i - this.freeTopSpaceDeducation() < this.height &&
          col + j < this.width &&
          this.fallingElement.shapeMatrix[i][j] === auxBoard[row + i - this.freeTopSpaceDeducation()][col + j]
        ) {
          auxBoard[row + i - this.freeTopSpaceDeducation()][col + j] = ".";
        }
      }
    }
    return auxBoard;
  }

  isHeightFree(col, colStart, height) {
    for (let i = colStart; i <= colStart + height - 1; i++) {
      if (i > 0 && this.boardMatrix[i][col] !== ".") return false;
    }
    return true;
  }

  isUpcomingHeightFree(colDirection) {
    const [col, row] = this.fallingElementTopLeftIndex;
    const elementHeightWithoutBottomDots = this.fallingElement.height - this.fallingElement.freeRowsFromBottom();
    if (colDirection === 1) {
      return this.isHeightFree(
        col + this.fallingElement.width - this.fallingElement.freeColsFromRight(),
        row - this.fallingElement.freeRowsFromTop(),
        elementHeightWithoutBottomDots
      );
    } else if (colDirection === -1) {
      return this.isHeightFree(
        col + this.fallingElement.freeColsFromLeft() - 1,
        row - this.fallingElement.freeRowsFromTop(),
        elementHeightWithoutBottomDots
      );
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
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();
    for (let i = this.fallingElement.height - 1; i >= 0; i--) {
      for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
        if (row + i < 0 || row + i + 1 >= this.height) continue;
        if (
          row + i + 1 < this.height &&
          "." === auxBoard[row + i + 1][col + j] &&
          this.fallingElement.shapeMatrix[i][j] !== "."
        ) {
          auxBoard[row + i + 1][col + j] = this.fallingElement.shapeMatrix[i][j];
        }
      }
    }
    this.boardMatrix = auxBoard;
  }

  #checkMoveTetromino(row, col) {
    const startingIndexOfTheColumn = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    const endingIndexOfTheColumn = this.fallingElement.freeColsFromLeft();
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();
    for (let i = this.fallingElement.height - this.fallingElement.freeRowsFromBottom() - 1; i >= 0; i--) {
      for (let j = startingIndexOfTheColumn; j >= endingIndexOfTheColumn; j--) {
        if (row + i < 0 || row + i + 1 >= this.height) continue;
        if ("." !== auxBoard[row + i + 1][col + j] && this.fallingElement.shapeMatrix[i][j] !== ".") {
          return false;
        }
      }
    }
    return true;
  }

  moveTetromino() {
    if (!this.fallingElement) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    const startingRow = row - this.freeTopSpaceDeducation();
    if (
      !this.#checkMoveTetromino(startingRow, col) ||
      startingRow + this.fallingElement.height - this.fallingElement.freeRowsFromBottom() === this.height
    ) {
      this.clearingLinesAlgo();
      this.fallingElement = undefined;
      this.fallingElementTopLeftIndex = undefined;
      return;
    }
    this.#moveTetromino(startingRow, col);
    // TODO: When moving logic should change, but also moving should be responsible for no deduction!!!!!!!!! aka set to 0
    if (row - this.freeTopSpaceDeducation() + 1 === 0) {
      this.fallingElementTopRowDeduction = false
      this.fallingElementTopLeftIndex = [col, 0];
    } else {
      this.fallingElementTopLeftIndex = [col, row + 1];
    }
  }

  tick() {
    if (!this.fallingElementTopLeftIndex) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (row + 1 === this.height || (this.boardMatrix[row + 1][col] !== "." && !this.fallingElement.width)) {
      this.clearingLinesAlgo();
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
    if (col + this.fallingElement.width - this.fallingElement.freeColsFromRight() === this.width) return;
    if (!this.isUpcomingHeightFree(1)) return;
    const rowWithoutTopDots = row - this.freeTopSpaceDeducation();
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();
    const colEndingWithoutFreeSpace = this.fallingElement.width - 1 - this.fallingElement.freeColsFromRight();
    for (let i = 0; i < this.fallingElement.height; i++) {
      for (let j = colEndingWithoutFreeSpace; j >= 0; j--) {
        if (rowWithoutTopDots + i < 0) continue;
        if (
          col + j + 1 < this.width &&
          rowWithoutTopDots + i < this.height &&
          "." === auxBoard[rowWithoutTopDots + i][col + j + 1] &&
          this.fallingElement.shapeMatrix[i][j] !== "."
        ) {
          auxBoard[rowWithoutTopDots + i][col + j + 1] = this.fallingElement.shapeMatrix[i][j];
        }
      }
    }
    this.fallingElementTopLeftIndex = [col + 1, row];
    this.boardMatrix = auxBoard;
  }

  moveLeft() {
    if (!this.fallingElement) return;
    const [col, row] = this.fallingElementTopLeftIndex;
    if (col + this.fallingElement.freeColsFromLeft() === 0) return;
    if (!this.isUpcomingHeightFree(-1)) return;
    const rowWithoutTopDots = row - this.freeTopSpaceDeducation();
    const auxBoard = this.createAuxBoardWithoutCurrentlyFallingElement();
    for (let i = 0; i < this.fallingElement.height; i++) {
      for (let j = 0; j < this.fallingElement.width; j++) {
        if (rowWithoutTopDots + i < 0) continue;
        if (col + j - 1 >= 0 && "." === auxBoard[rowWithoutTopDots + i][col + j - 1]) {
          auxBoard[rowWithoutTopDots + i][col + j - 1] = this.fallingElement.shapeMatrix[i][j];
        }
      }
    }
    this.fallingElementTopLeftIndex = [col - 1, row];
    this.boardMatrix = auxBoard;
  }

  moveDown() {
    this.tick();
  }

  clearingLinesAlgo() {
    for (let row = this.height - 1; row > 0; row--) {
      this.clearLine(row);
    }
  }

  clearingLinesPushItemsDown() {
    const lastRow = this.height - 1
    for (let col = 0; col < this.width - 1; col++) {
      if (this.boardMatrix[lastRow][col] === '.' && this.boardMatrix[lastRow - 1][col] !== '.') {
        this.boardMatrix[lastRow][col] = this.boardMatrix[lastRow - 1][col]
      }
    } 
  }

  clearLine(row) {
    if (this.checkForLineClear(row)) {
      this.boardMatrix[row] = ".".repeat(this.width).split("");
    }
  }

  checkForLineClear(row) {
    let rowFilled = true;
    for (let i = 0; i < this.width; i++) {
      if (this.boardMatrix[row][i] === ".") {
        rowFilled = false;
      }
    }
    return rowFilled;
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
