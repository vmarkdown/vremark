var Hashids = require('hashids');
Hashids = Hashids.default?Hashids.default:Hashids;
var hashids = new Hashids();

function createHashids(children) {
    if(!children || children.length===0) {
        return;
    }
    for(var i=0;i<children.length;i++) {
        var node = children[i];
        createHashid(node);
    }
}

function createHashid(node) {
    var position = node.position;
    // node.properties = node.properties?node.properties:{};
    // node.properties.id = hashids.encode(
    //     position.start.line, position.start.column,
    //     position.end.line, position.end.column
    // );
    node.data = node.data?node.data:{};
    node.data.hProperties = node.data.hProperties?node.data.hProperties:{};
    node.data.hProperties.id = hashids.encode(
        position.start.line, position.start.column,
        position.end.line, position.end.column
    );
    createHashids(node.children);
}


module.exports = function plugin(options = {}) {
    return function transformer(root) {
        createHashid(root);
    };
};