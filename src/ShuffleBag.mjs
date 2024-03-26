

export class ShuffleBag {

    constructor(items) {
        this.items = items
        this.currentIndex = items.length - 1
    }

    next() {
        if (this.currentIndex < 1) {
            this.currentIndex = this.items.length - 1
            return this.items[0]
        }

        const randomI = Math.floor(Math.random() * (this.currentIndex + 1))
        const item = this.items[randomI]
        this.items[randomI] = this.items[this.currentIndex]
        this.items[this.currentIndex] = item
        this.currentIndex--
        return item
    }

}