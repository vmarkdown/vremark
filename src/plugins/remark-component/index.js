var visit = require('unist-util-visit');

module.exports = function plugin(options = {}) {

    return function transformer(root) {




        var children = root.children;

        for(var i=0;i<children.length;i++) {
            var node = children[i];


            if( node.type === 'code' && node.lang ) {

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.type = 'component';

            }


        }


        // visit(root, {
        //     type: 'code',
        //     lang: "flow"
        // }, function (node) {
        //
        //     node.data = node.data || {};
        //     node.data.props = node.data.props || {};
        //     Object.assign(node.data.props, {
        //         lang: 'flow',
        //         code: node.value
        //     });
        //
        //     node.type = 'flowchart';
        //
        // });

        // visit(root, {
        //     type: 'code',
        //     lang: "flow"
        // }, function (node) {
        //
        //     node.data = node.data || {};
        //     node.data.props = node.data.props || {};
        //     Object.assign(node.data.props, {
        //         lang: 'flow',
        //         code: node.value
        //     });
        //
        //     node.type = 'flowchart';
        //
        // });

    };

};