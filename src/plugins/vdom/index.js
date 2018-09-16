const Parser = require('./parser');

module.exports = function plugin(options) {
    const parser = new Parser(options);
    this.Compiler = function compiler(node, file) {
        return parser.parse(node, file);
    }
};


