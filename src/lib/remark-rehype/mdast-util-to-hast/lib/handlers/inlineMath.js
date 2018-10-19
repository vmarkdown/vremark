'use strict'

module.exports = function inlineMath(h, node) {
    return {
        type: node.type,
        tagName: node.data.hName,
        position: node.position,
        properties: {} || node.data.hProperties,
        data: {
            'class': node.data.hProperties.className,
            props: {
                code: node.value,
                inline: true
            }
        },
        children: []
    };
};



