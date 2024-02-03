const SHAPE_TYPES = {
    T: 'T',
    I: 'I',
    O: 'O'
}

export class Tetromino {
    shapeType;

    static get T_SHAPE() {
        return new Tetromino(`.T.
                              TTT
                              ...`, SHAPE_TYPES.T)
    }

    static get I_SHAPE() {
        return new Tetromino(`.....
                              .....
                              IIII.
                              .....
                              .....`, SHAPE_TYPES.I)
    }

    constructor(shape, shapeType) {
        const rows = shape.replaceAll(" ", '')
                          .split('\n')
        this.height = rows.length
        this.width = rows[0].length
        this.shapeMatrix = rows.map(row => row.split(""));
        this.shapeType = shapeType
    }

    rotateShapeIRight() {
        if (this.shapeMatrix[2][0] === 'I') {
            return new Tetromino(`..I..
                                  ..I..
                                  ..I..
                                  ..I..
                                  .....`, SHAPE_TYPES.I)
        } else {
            return new Tetromino(`.....
                                  .....
                                  IIII.
                                  .....
                                  .....`, SHAPE_TYPES.I)
        }
    }

    rotateRight() {
        if (this.shapeType === SHAPE_TYPES.I) {
            return this.rotateShapeIRight()
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