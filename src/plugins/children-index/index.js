const visit = require('unist-util-visit');

module.exports = function paragraphHTML(options = {}) {

    // function transform(node, tag) {
    //     visit(node, tag, function (node) {
    //         visit(node, 'html', function (html) {
    //             html.type = 'text';
    //         });
    //     });
    // }

    return function transformer(root) {
        // transform(root, 'heading');
        // transform(root, 'paragraph');
    };

};