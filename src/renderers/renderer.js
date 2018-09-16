/**
 * Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

Renderer.prototype.h = function(h) {
    if(h) {
        this.h = h;
    }
    return this.h;
};

Renderer.prototype.root = function(h, node, index, children) {};

Renderer.prototype.inlineCode = function(h, node, index, children) {};

Renderer.prototype.math = function(h, node, index, children) {};

Renderer.prototype.inlineMath = function(h, node, index, children) {};

Renderer.prototype.code = function(h, node, index, children) {};

Renderer.prototype.blockquote = function(h, node, index, children) {};

Renderer.prototype.html = function(h, node, index, children) {};

Renderer.prototype.heading = function(h, node, index, children) {};

Renderer.prototype.thematicBreak = function(h, node, index, children) {};

Renderer.prototype.list = function(h, node, index, children) {};

Renderer.prototype.listItem = function(h, node, index, children) {};

Renderer.prototype.checkbox = function(h, node, index, children) {};

Renderer.prototype.paragraph = function(h, node, index, children) {};

Renderer.prototype.table = function(h, node, index, children) {};

Renderer.prototype.tableRow = function(h, node, index, children) {};

Renderer.prototype.tableCell = function(h, node, index, children) {};

Renderer.prototype.strong = function(h, node, index, children) {};

Renderer.prototype.emphasis = function(h, node, index, children) {};

Renderer.prototype.break = function(h, node, index, children) {};

Renderer.prototype.delete = function(h, node, index, children) {};

Renderer.prototype.link = function(h, node, index, children) {};

Renderer.prototype.linkReference = function(h, node, index, children) {};

Renderer.prototype.definition = function(h, node, index, children) {};

Renderer.prototype.image = function(h, node, index, children) {};

Renderer.prototype.text = function(h, node, index, children) {};

module.exports = Renderer;
