'use strict'

var normalize = require('mdurl/encode')
var all = require('../all')

module.exports = link

/* Transform a link. */
function link(h, node) {//console.log(node)
  var props = {href: normalize(node.url), target: node.target || '_blank'}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'a', props, all(h, node))
}
