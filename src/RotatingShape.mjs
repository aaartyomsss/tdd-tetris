export class RotatingShape {
    shapeMatrix;
    height;
    width;

    constructor(shape) {
        const rows = shape.replaceAll(" ", '')
                          .split('\n')
        this.height = rows.length
        this.width = rows[0].length
        this.shapeMatrix = rows.map(row => row.split(""));
    }

    rotateRight() {
        for (let i = 0; i < parseInt(this.height / 2); i++) {
            for (let j = i; j < this.height - i - 1; j++) {
                const temp = this.shapeMatrix[i][j]
                this.shapeMatrix[i][j] = this.shapeMatrix[this.height - 1 - j][i];
                this.shapeMatrix[this.height - 1 - j][i] = this.shapeMatrix[this.height - 1 - i][this.height - 1 - j];
                this.shapeMatrix[this.height - 1 - i][this.height - 1 - j] = this.shapeMatrix[j][this.height - 1 - i];
                this.shapeMatrix[j][this.height - 1 - i] = temp;
            }
        }
        return this
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