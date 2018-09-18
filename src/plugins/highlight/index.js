'use strict';

exports.__esModule = true;
exports.default = attacher;

var hljs = require('highlight.js')

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attacher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        include = _ref.include,
        exclude = _ref.exclude;

    function visitor(node) {
        var lang = node.lang;

        if (!lang || include && !~include.indexOf(lang) || exclude && ~exclude.indexOf(lang)) {
            return;
        }

        var language = hljs.getLanguage(lang);
        if (language) {
            var h = hljs.highlight(lang, node.value);
            node.type = 'html';
            node.value = '<pre class="highlight-code"><code class="hljs hljs-dark '+h.language+'">'+h.value +'</code></pre>';
        }
    }

    return function (ast) {
        return (0, _unistUtilVisit2.default)(ast, 'code', visitor);
    };
}
module.exports = exports['default'];