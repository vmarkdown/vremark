var visit = require('unist-util-visit');
var util = require('vremark-util');
const Hashids = ((Module)=>Module.default||Module)(require('hashids'));
var hashids = new Hashids("vremark");

function all(nodes) {
    if(!nodes || nodes.length ===0 ) return 0;
    return nodes.map(function (node) {
        var hashs = [];
        if(node.hasOwnProperty('hash')) {
            hashs.push(node.hash);
        }
        if(node.children && node.children.length>0){
            var _hashs = all(node.children);
            _hashs && _hashs.length>0 && _hashs.forEach(function (h) {
                if(h && h.length > 0){
                    h.forEach(function (i) {
                        hashs.push(i);
                    });
                }
                else {
                    hashs.push(h);
                }
            });
        }
        node.hashid = hashids.encode(hashs);
        return hashs;
    });
}

function one(node) {
    var hashs = all(node.children);
    node.hashid = 'root';
}

module.exports = function hashid(options = {}) {

    return function transformer(root) {

        console.time('hashid');

        var hashs = {};

        visit(root, function (node) {
            return node.hasOwnProperty('value') || node.hasOwnProperty('url');
        }, function (node) {

            var value = node.value || node.url;

            var hash = util.hash(value);

            if(!hashs[hash]) {
                hashs[hash] = 1;
            }
            else {
                hashs[hash] = hashs[hash] + 1;
                hash = util.hash(hashs[hash]+'->'+value);
            }

            node.hash = hash;

        });

        one(root);


        console.timeEnd('hashid');

    };

};