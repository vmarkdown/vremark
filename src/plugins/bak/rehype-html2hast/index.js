var visit = require('unist-util-visit');
// var remove = require('unist-util-remove');

var unified = require('unified');
var parse = require('rehype-parse');
function parseHTML(html) {
    return unified()
    .use(parse, {
        fragment: true,
        position: false
    })
    .parse(html);
}

// var regx = /<([a-z]+)(\s*\w*?\s*=\s*".+?")*(\s*?>[\s\S]*?(<\/\1>)+|\s*\/>)/i;

module.exports = function plugin(options = {}) {

    function transform(node) {
        
    }
    
    return function transformer(root) {

        visit(root, {
            type: 'raw1',
        }, function (node) {

            // if( !(regx.test(node.value) || !/^<\//.test(node.value)) ) {
            //     remove(node);
            // }

            var hast = parseHTML(node.value);


            var children = hast.children;

            if(children && children.length>0){
                var item = children[0];
                node.type = item.type;
                node.tagName = item.tagName;
                node.properties = item.properties;
                node.children = item.children;
            }

            // node.type = 'paragraph';
            // node.properties = node.properties?node.properties:{};
            // node.properties.className = 'rehype-html2hast';
            // node.properties.innerHTML = node.value;

        });

    };

};