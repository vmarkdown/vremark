'use strict'

module.exports = component

function component(h, node) {
    // debugger
    // return h(node, 'h' + node.depth, all(h, node))

    // var _node = {
    //     component: node.component,
    //     children: [],
    //     position: node.position,
    //     properties: node.properties || {},
    //     tagName: "div",
    //     type: "component",
    // };
    //
    // return _node;
    return node;
}
