

export class ShuffleBag {

    constructor(items) {
        this.items = items
        this.currentIndex = items.length - 1
    }

    next() {
        return this.items[0]
    }

}