export class RotatingShape {
    shapeMatrix;

    constructor(shape) {
        this.shapeMatrix = shape.replaceAll(" ", '')
                                .split('\n')
                                .map(row => row.split(""));
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