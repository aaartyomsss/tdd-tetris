export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let result = ''
    for (let i = 0; i < this.height; i++){
      const row = `.`.repeat(3).concat('\n')
      result += row
    }
    return result
  }
}
