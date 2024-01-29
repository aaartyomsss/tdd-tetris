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