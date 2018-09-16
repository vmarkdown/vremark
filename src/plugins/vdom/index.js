const Parser = require('./parser');

module.exports = function plugin(options) {
    const renderer = options.renderer;
    // const h = options.h || this.data('h');
    // const h = this.data('h');
    const parser = new Parser({
        // h: h,
        renderer: renderer
    });
    this.Compiler = function compiler(node) {
        return parser.parse(node, 0);
    }
};


