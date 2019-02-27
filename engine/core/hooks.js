const actions = {}
exports.actions = actions

exports.addAction = function(tag, func, priority = 500) {
    actions[tag] = actions[tag] || [];
    actions[tag].push({ func, priority })
    actions[tag].sort((a, b) => b.priority - a.priority)
}

exports.doAction = function(tag, ...args) {
    if (!actions[tag]) return true;
    for (let value of actions[tag]) {
        if (value.func(...args) == false) return false;
    }

    return true;
}
