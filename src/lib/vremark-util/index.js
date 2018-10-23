function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
}

function hash(string) {
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
        hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
}

function createKey(node) {
    if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
        var value0 = node.value || node.url;
        var hash0 = hash(String(value0));
        return hash0;
    }
    var value1 =
        node.position.start.line + ':' + node.position.start.column
        + '-'
        + node.position.end.line + ':' + node.position.end.column;
    return hash(value1);
}

module.exports = {
    hash: hash,
    createKey: createKey
};
