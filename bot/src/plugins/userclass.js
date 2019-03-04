exports.oop = {}

exports.user = class User {
    constructor(rows) {
        Object.assign(this, rows)
        Object.assign(this, exports.oop)
    }

    save() {
        console.log("ну что всосал?")
    }
}
