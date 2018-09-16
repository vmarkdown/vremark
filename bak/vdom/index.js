const Parser = require('./parser');

module.exports = function vdom(options = {}) {
    const parser = new Parser(options);
    return function transformer(root) {
        return parser.parse(root);
    };
};