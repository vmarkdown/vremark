'use strict'
//
module.exports = html

var u = require('unist-builder')

var inlineTags = ['aa','abbr','acronym','b','big','br','cite','code','dfn','em','font','i','img','input','kbd','label','q','samp','select','small','span','s','del','strike','strong','sub','sup','textarea','tt','u','varabbr','acronym','b','big','br','cite','code','dfn','em','font','i','img','input','kbd','label','q','samp','select','small','span','s','del','strike','strong','sub','sup','textarea','tt','u','var'];

function isInlineTag(tag) {
    // return tag && tag.indexOf(inlineTags) > -1;
}

/* Return either a `raw` node, in dangerous mode, or
 * nothing. */
function html(h, node) {
  // return h.dangerous ? h.augment(node, u('raw', node.value)) : null

    debugger
    // var tag = getTag(node.value);
    // var tagName = isInlineTag(tag)?'span':'div';

    var tagName =
    node.tagName = tagName;
    node.properties = node.properties?node.properties:{};
    node.properties.innerHTML = node.value;

    return h.dangerous ? h.augment(node, u('raw', {tagName: node.tagName,properties:node.properties,position: node.position}, node.value)) : null


}






// module.exports = html
//
// var u = require('unist-builder')
//
// /* Return either a `raw` node, in dangerous mode, or
//  * nothing. */
// function html(h, node) {
//
//   if(!h.dangerous) return null;
//
//
//
//
//
// }
//
//
//
//
// const unified = require('unified');
// const parse = require('rehype-parse');
//
// function parseHtml (html) {
//     return unified()
//         .use(parse, {
//             fragment: true,
//             position: false
//         })
//         .parse(html)
// }