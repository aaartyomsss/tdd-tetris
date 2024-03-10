const SHAPE_TYPES = {
    T: 'T',
    I: 'I',
    O: 'O',
    T_ARIKA_SHAPE: 'T_ARIKA_SHAPE'
}

export class Tetromino {
    shapeType;
    currentOrientation

    static get T_SHAPE() {
        return new Tetromino(`.T.
                              TTT
                              ...`, SHAPE_TYPES.T)
    }

    static get I_SHAPE() {
        return new Tetromino(`....
                              IIII
                              ....
                              ....`, SHAPE_TYPES.I)
    }

    static get O_SHAPE() {
        return new Tetromino(`.OO
                              .OO
                              ...`, SHAPE_TYPES.O)
    }

    static get T_ARIKA_SHAPE() {
        return new Tetromino(`....
                              TTT.
                              .T..
                              ....`, SHAPE_TYPES.T_ARIKA_SHAPE)
    }

    constructor(shape, shapeType, currentOriantation = 0) {
        const rows = shape.replaceAll(" ", '')
                          .split('\n')
        this.height = rows.length
        this.width = rows[0].length
        this.shapeMatrix = rows.map(row => row.split(""));
        this.shapeType = shapeType
        this.currentOriantation = currentOriantation
    }

    rotateShapeI() {
        if (this.shapeMatrix[1][0] === 'I') {
            return new Tetromino(`..I.
                                  ..I.
                                  ..I.
                                  ..I.`, SHAPE_TYPES.I)
        } else {
            return new Tetromino(`....
                                  IIII
                                  ....
                                  ....`, SHAPE_TYPES.I)
        }
    }

    returnNewOShapeOnRotation() {
        return new Tetromino(`.OO
                              .OO
                              ...`, SHAPE_TYPES.O)
    }

    rotateTArikaShapeRight() {
        if (this.currentOriantation === 0) {
            return new Tetromino(`.T..
                                  TT..
                                  .T..
                                  ....`, SHAPE_TYPES.T_ARIKA_SHAPE, 1)
        } else if (this.currentOriantation === 1) {
            return new Tetromino(`....
                                  .T..
                                  TTT.
                                  ....`, SHAPE_TYPES.T_ARIKA_SHAPE, 2)
        }
    }   

    rotateRight() {
        if (this.shapeType === SHAPE_TYPES.I) {
            return this.rotateShapeI()
        } 
        if (this.shapeType === SHAPE_TYPES.O) {
            return this.returnNewOShapeOnRotation()
        }
        if (this.shapeType === SHAPE_TYPES.T_ARIKA_SHAPE) {
            return this.rotateTArikaShapeRight()
        }
        let a = JSON.parse(JSON.stringify(this.shapeMatrix))
        for (let i = 0; i < parseInt(this.height / 2); i++) {
            for (let j = i; j < this.height - i - 1; j++) {const temp = a[i][j] 
                a[i][j] = a[this.height - 1 - j][i];
                a[this.height - 1 - j][i] = a[this.height - 1 - i][this.height - 1 - j];
                a[this.height - 1 - i][this.height - 1 - j] = a[j][this.height - 1 - i];
                a[j][this.height - 1 - i] = temp;
            }
        }
        return new Tetromino(a.map(row => row.join('')).join('\n'))
        
    }

    rotateLeft() {
        if (this.shapeType === SHAPE_TYPES.I) {
            return this.rotateShapeI()
        } 
        if (this.shapeType === SHAPE_TYPES.O) {
            return this.returnNewOShapeOnRotation()
        }
        let a = JSON.parse(JSON.stringify(this.shapeMatrix))
        for (let i = 0; i < parseInt(this.height / 2); i++) {
            for (let j = i; j < this.height - i - 1; j++) {
                const temp = a[i][j]
                a[i][j] = a[j][this.height - 1 - i];
                a[j][this.height - 1 - i] = a[this.height - 1 - i][this.height - 1 - j];
                a[this.height - 1 - i][this.height - 1 - j] = a[this.height - 1 - j][i];
                a[this.height - 1 - j][i] = temp;
            }
        }
        return new Tetromino(a.map(row => row.join('')).join('\n'))
    }

    rowIsCompletelyFree(row) {
        for (const i in row) {
            if (row[i] !== '.') {
                return false
            }
        }
        return true
    }

    freeRowsFromBottom(){
        let count = 0
        for (let i = this.height - 1; i >= 0; i--) {
            if (this.rowIsCompletelyFree(this.shapeMatrix[i])) count++
            else {
                break
            }
        }
        return count
    }

    freeRowsFromTop(){
        let count = 0
        for (let i = 0; i < this.height; i++) {
            if (this.rowIsCompletelyFree(this.shapeMatrix[i])) count++
            else {
                break
            }
        }
        return count
    }

    isColumnFree(colIndex) {
        for (let i = 0; i < this.height; i++) {
            if (this.shapeMatrix[i][colIndex] !== '.') return false
        }
        return true
    }

    freeColsFromLeft() {
        let count = 0
        for (let i = 0; i < this.width; i++) {
            if (this.isColumnFree(i)) count++
            else break
        }
        return count
    }

    freeColsFromRight() {
        let count = 0
        for (let i = this.width - 1; i >= 0; i--) {
            if (this.isColumnFree(i)) count++
            else break
        }
        return count
    }

    toString() {
        let result = ''
        for (let i = 0; i < this.shapeMatrix.length; i++){
            const matrixRow = this.shapeMatrix[i]
            const row = matrixRow.join('').concat('\n')
            result += row
        }
        return result
    }
}