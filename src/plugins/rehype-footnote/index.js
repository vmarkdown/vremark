var visit = require('unist-util-visit');

function fix(root) {
    visit(root, function (node) {
        return node.type === "element" && node.tagName === "li";
    }, function (node) {
        var children = node.children;
        if(children.length>0) {
            children[0].tagName = 'span';
        }
    });
}

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        var children = root.children;

        for(var i=children.length-1;i>=0;i--) {
            var node = children[i];
            if(
                node.tagName === 'div' && node.type === "element"
                && node.properties.className && node.properties.className.length>0
                && node.properties.className.indexOf("footnotes") > -1
            ) {
                fix(node);
                break;
            }
        }

    };

};