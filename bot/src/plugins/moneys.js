exports.check_install = function() {
    db.check_column("moneys", db.acctable, "balance", "FLOAT")
}

exports.start = function() {

    db.create_args.push({ key: "balance", value: function() { return Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000; } })

    userclass.oop.getMoney = function() {
        return us.deValue(this.balance)
    }

}
