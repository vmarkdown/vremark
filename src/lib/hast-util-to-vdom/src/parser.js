var mode = require('./mode');
var renderer = require('./renderer');

function Parser(options) {
    this.options = options || {};
    this.dataFuc = null;
    this.h = this.options.h || function (tagName, properties, value) {
        return value;
    };
    // this.renderer = this.options.renderer || renderer;
    this.renderer = Object.assign(renderer, this.options.renderer || {});
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        node.index = i;
        node.parent = parent;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, parent) {
    if(!node) return null;
    var children = this.parseNodes(node.children, node);
    var h = this.h;

    var properties = {};
    if(!this.dataFuc){
        var data = mode(node, h, this.options.mode);
        if(data) {
            this.dataFuc = data;
        }
    }
    if(this.dataFuc){
        properties = this.dataFuc(node);
    }
    return this.renderer[node.type].apply(null, [h, node, properties, children, this.options]);
};

Parser.prototype.parse = function(root) {
    try {
        root.data = root.data || {};
        root.data.class = ['vremark-body'].concat(this.options.rootClassName || '');
        root.tagName = this.options.rootTagName || 'div';

        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;