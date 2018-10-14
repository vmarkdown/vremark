// var visit = require('unist-util-visit');
var remove = require('unist-util-remove');

module.exports = function plugin(options = {}) {
    return function transformer(root) {
        remove(root, function (node) {
            return node.type === 'text' && node.value && node.value.charCodeAt(0) === 10;
        });
    };
};