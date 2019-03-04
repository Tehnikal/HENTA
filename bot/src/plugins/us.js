// STRING UTILS MODULE

exports.placeChar = function(string, char) { // Place Char : Вставляет указанный символ через каждые 3 символа
    return string.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1' + char);
}

exports.deValue = function(string) { // Divide Value : Вставляет в строку точку через каждые 3 символа
    return exports.placeChar(string, '.')
}
