var Parser = require('./parser');

module.exports = function toDom(node, options) {
    var parser = new Parser(options);
    return parser.parse(node);
};