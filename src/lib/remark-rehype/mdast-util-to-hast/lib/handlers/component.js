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


    var n = {
        type: node.type,
        component: node.component,
        position: node.position,
        properties: node.properties || {},
        data: node.data,
        children: []
    };


    return n;
}
