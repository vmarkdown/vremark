var visit = require('unist-util-visit');
var util = require('vremark-util');
// const Hashids = ((Module)=>Module.default||Module)(require('hashids'));
// var hashids = new Hashids("vremark");

function all1(nodes, map) {
    if(!nodes || nodes.length ===0 ) return 0;

    var hashs = [];

    nodes.map(function (node) {


        if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
            var value = node.value || node.url;

            var hash = util.hash(String(value));

            if(!map[hash]) {
                map[hash] = 1;
            }
            else {
                map[hash] = map[hash] + 1;
                hash = util.hash(map[hash]+'-'+value);
            }

            // node.hash = hash;
            hashs.push(hash);
        }
        // if(node.hasOwnProperty('hash')) {
        //     hashs.push(node.hash);
        // }
        if(node.children && node.children.length>0){
            var _hashs = all(node.children, map);
            hashs.push(_hashs);
            // _hashs && _hashs.length>0 && _hashs.forEach(function (h) {
            //     if(h && h.length > 0){
            //         h.forEach(function (i) {
            //             hashs.push(i);
            //         });
            //     }
            //     else {
            //         hashs.push(h);
            //     }
            // });
        }


    });

    var hash = hashs.length === 1?hashs[0]:util.hash(hashs.join(''));
    // node.hash = hash;
    return hash;
}

function all(nodes, map) {
    var hashs = [];

    for(var i=0;i<nodes.length;i++) {

        var node = nodes[i];

        var h = one(node, map);

        hashs.push(h);

    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    return hash;
}


function one(node, map) {

    var hashs = [];

    if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
        var value0 = node.value || node.url;
        var hash0 = util.hash(String(value0));
        hashs.push(hash0);
    }

    if(node.children && node.children.length>0){
        var hash1 = all(node.children, map);
        hashs.push(hash1);
    }

    if(hashs.length === 0) {
        var value2 =
            node.position.start.line + ':' + node.position.start.column
            + '-'
            + node.position.end.line + ':' + node.position.end.column;
        var hash2 = util.hash(value2);
        hashs.push(hash2);
    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    if(!map[hash]) {
        map[hash] = 1;
    }
    else{
        while (map[hash]) {
            map[hash] = map[hash] + 1;
            hash = hash + map[hash];
        }
    }

    node.hash = hash;

    return hash;

}

module.exports = function hashid(options = {}) {

    return function transformer(root) {

        console.time('hash');

        var map = {};
        one(root, map);

        console.timeEnd('hash');

    };

};