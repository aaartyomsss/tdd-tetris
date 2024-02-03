

export class Tetromino {

    static get T_SHAPE() {
        return new Tetromino(`.T.
                              TTT
                              ...`)
    }

    constructor(shape) {
        const rows = shape.replaceAll(" ", '')
                          .split('\n')
        this.height = rows.length
        this.width = rows[0].length
        this.shapeMatrix = rows.map(row => row.split(""));
    }
    
    rotateRight() {
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