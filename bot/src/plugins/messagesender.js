exports.messageSender = class MessageSender {
    constructor(args) {
        Object.assign(this, args)
    };

    line(text) {
      this.message.push(text);
    };

    lines(lines) {
        lines.map(item => {
            this.message.push(item)
        })
    };

    build() {
        this.message = typeof(this.message) == "object" ? this.message.join('\n') : this.message;
        return this
    }
}
