const visit = require('unist-util-visit');
// var toc = require('mdast-util-toc');


function toc(root) {

    var headings = [];

    visit(root, 'heading', function (node) {
        headings.push(node);
    });

    // console.log(headings)

    var contents = [

    ];

    var lastIndex = -1;
    var lastDepth = 99;

    headings.forEach(function (node) {

        if(node.depth > lastDepth){
            contents[lastIndex].children.push({
                node: node,
                depth: node.depth,
                children: []
            });
        }
        else{
            lastIndex = contents.length;
            contents.push({
                node: node,
                depth: node.depth,
                children: []
            });

        }

        lastDepth = node.depth;

    });

}


module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        visit(root, 'linkReference', function (node) {

            console.log(node);

            if(node.identifier === 'toc' && node.referenceType === 'shortcut') {

                // debugger

                var result = toc(root);
                console.log(result);
                // node.children.push(result.map);

                // node.type = 'list';
                // node.children = result.map.children;

            }

        });

    };

};

// 'use strict';
//
// var slug = require('remark-slug');
// var util = require('mdast-util-toc');
//
// module.exports = toc;
//
// // var DEFAULT_HEADING = '\\[toc\\]|table[ -]of[ -]contents?';
// var DEFAULT_HEADING = 'toc|table[ -]of[ -]contents?';
//
// function toc(options) {
//     var settings = options || {};
//     var heading = settings.heading || DEFAULT_HEADING;
//     var depth = settings.maxDepth || 6;
//     var tight = settings.tight;
//
//     this.use(slug);
//
//     return function transformer(node) {
//
//         var result = util(node, {
//             heading: heading,
//             maxDepth: depth,
//             tight: tight
//         });
//
//         if (result.index === null || result.index === -1 || !result.map) {
//             return;
//         }
//
//         /* Replace markdown. */
//         node.children = [].concat(
//             node.children.slice(0, result.index),
//             result.map,
//             node.children.slice(result.endIndex)
//         );
//     }
//
// }
