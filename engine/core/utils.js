exports.typeOf = function (value) {
    return Array.isArray(value) ? "array" : typeof value;
}

exports.checkTypes = function (argList, typeList) {
    for (var i = 0; i < typeList.length; i++) {
        if (typeOf(argList[i]) !== typeList[i]) {
            throw 'wrong type: expecting ' + typeList[i] + ", found " + typeOf(argList[i]);
        }
    }
}
