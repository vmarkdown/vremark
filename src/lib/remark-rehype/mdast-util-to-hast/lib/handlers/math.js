'use strict'

module.exports = function math(h, node) {
    // debugger
    // var r = h.augment(node, h('math', node.value));
    // return r;

    return {
        type: node.type,
        tagName: node.data.hName,
        position: node.position,
        properties: {} || node.data.hProperties,
        data: {
            'class': node.data.hProperties.className,
            props: {
                code: node.value
            }
        },
        children: []
    };
};



