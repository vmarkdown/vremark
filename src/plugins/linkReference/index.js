const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        const definitions = {};

        visit(root, 'definition', function (_definition) {

            definitions[_definition.identifier] = _definition;

            visit(root, 'linkReference', function (node) {

                if(node.referenceType === 'full' ){
                    let identifier = node.identifier;
                    let definition = definitions[identifier];
                    if(definition){
                        node.url = definition.url;
                    }
                }


            });

        });



    };

};