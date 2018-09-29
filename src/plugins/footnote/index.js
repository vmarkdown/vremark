var visit = require('unist-util-visit');
var remove = require('unist-util-remove');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        visit(root, 'footnote', function (node) {
            var children = node.children;
            if(children.length>0) {
                children[0].value = '[^'+children[0].value+']';
            }
        });

        var index = 1;
        var fndefs = [];
        visit(root, 'footnoteReference', function (fnref) {
            fnref.ref = 'fnref:'+fnref.identifier;
            fnref.def = 'fndef:'+fnref.identifier;
            fnref.value = index++;

            var hasDef = false;

            visit(root, {type: 'footnoteDefinition', identifier: fnref.identifier} , function (fndef) {

                hasDef = true;

                fndef.ref = 'fnref:'+fndef.identifier;
                fndef.def = 'fndef:'+fndef.identifier;

                visit(fndef, 'paragraph', function (node) {

                    if( node.children.length === 0) {
                        return;
                    }

                    var children = node.children;
                    var position = children[0].position;

                    var reverseNode = {
                        url: '#' + fndef.ref,
                        type: 'link',
                        position: position,
                        children:[
                            {
                                type: 'text',
                                value: ' ↩',
                                position: position
                            }
                        ]
                    };

                    node.children.push(reverseNode);

                });

                fndefs.push(fndef);

            });

            if(!hasDef){
                fnref.type = 'text';
                fnref.value = '[^'+fnref.identifier+']';
            }
        });

        if( fndefs.length>0 ) {
            remove(root, 'footnoteDefinition');

            var children = [];
            fndefs.forEach(function (fndef) {
                children.push({
                    type: 'listItem',
                    children: [fndef],
                    position: fndef.position
                });
            });

            root.children.push({
                type: 'thematicBreak',
                position: children[0].position
            });

            root.children.push({
                ordered: true,
                type: 'list',
                properties: {
                    className: 'footnotes'
                },
                children: children,
                position: children[0].position
            });
        }

    };

};