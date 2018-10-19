'use strict'

module.exports = function highlight(h, node) {
    return {
        type: node.type,
        tagName: node.type,
        position: node.position,
        properties: node.properties,
        data: node.data,
        children: []
    };
};



