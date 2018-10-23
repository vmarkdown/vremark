var Parser = require('./parser');
// var data = require('./data');
module.exports = function toDom(node, options) {
    // data(node, options);
    var parser = new Parser(options);
    return parser.parse(node);
};