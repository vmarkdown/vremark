var visit = require('unist-util-visit');
var katex = require('katex');

module.exports = function plugin(opts = {}) {

    if (opts.throwOnError == null) opts.throwOnError = false;

    function renderContent(node, displayMode) {
        try {
            var html = katex.renderToString(node.value, {
                displayMode: displayMode,
                throwOnError: false
            });
            if(!displayMode){
                html = html.replace('<span class="katex">','<span class="katex vremark-katex">');
            }
            else{
                html = html.replace('<span class="katex-display">','<span class="katex-display vremark-katex-display">');
            }
            node.value = html;

        } catch (e) {
            if (e instanceof katex.ParseError) {
                // KaTeX can't parse the expression
                var html = ("Error in LaTeX '" + texString + "': " + e.message)
                    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                node.value = html;
            } else {
                // throw e;  // other error
            }
        }
    }

    return function transform(root) {

        visit(root, 'inlineMath', function (node) {
            renderContent(node, false);
        });

        visit(root, 'math', function (node) {
            renderContent(node, true);
        });

        return root;
    }

};
