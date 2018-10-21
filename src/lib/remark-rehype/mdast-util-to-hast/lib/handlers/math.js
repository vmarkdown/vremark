'use strict'

module.exports = function math(h, node) {
    return {
        type: 'component' || node.type,
        tagName: node.data.hName,
        position: node.position,
        properties: {} || node.data.hProperties,
        data: {
            'class': node.data.hProperties.className,
            props: {
                code: node.value,
                inline: false
            }
        },
        children: []
    };
};



