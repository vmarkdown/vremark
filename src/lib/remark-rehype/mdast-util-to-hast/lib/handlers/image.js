'use strict'

var normalize = require('mdurl/encode')

module.exports = image

/* Transform an image. */
function image(h, node) {
    var props = {src: normalize(node.url), alt: node.alt}

    if (node.title !== null && node.title !== undefined) {
        props.title = node.title
    }

    if (node.align !== null && node.align !== undefined) {
        return h(null, 'p', {style:'text-align:'+node.align},[h(node, 'img', props)]);
    }

    //.mp4, .m4v, .mov, .webm, and .ogv.
    // var url = normalize(node.url);
    // var tagName = 'img';
    // if(url.endsWith('.mp4')) {
    //     props.controls = "true";
    //     tagName = 'video';
    // }

    return h(node, 'img', props)
}
