'use strict'

module.exports = all

var trim = require('trim')
var one = require('./one')

/* Transform the children of `parent`. */
function all(h, parent) {
    var nodes = parent.children || []
    var length = nodes.length
    var values = []
    var index = -1
    var result
    var head

    while (++index < length) {
        result = one(h, nodes[index], parent)

        if (result) {

            if(nodes[index] && nodes[index].hasOwnProperty('hash')) {
                result.hash = nodes[index].hash;
            }


            if (index && nodes[index - 1].type === 'break') {
                if (result.value) {
                    result.value = trim.left(result.value)
                }

                head = result.children && result.children[0]

                if (head && head.value) {
                    head.value = trim.left(head.value)
                }
            }

            values = values.concat(result)
        }
    }

    return values
}
