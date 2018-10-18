var latexBlock = /[ \t]*\$\$\n?(?:[^\n]+\n)*(?:[^\n]*[^\\\n])?\$\$(?:[ \t]*\([ \t]*\S+[ \t]*\))?[ \t]*(?:\n|$)/;


var trim = require('trim-trailing-lines')

var C_NEWLINE = '\n'
var C_TAB = '\t'
var C_SPACE = ' '
var C_DOLLAR = '$'

var MIN_FENCE_COUNT = 2
var CODE_INDENT_COUNT = 4

module.exports = function blockPlugin(opts) {

    function blockTokenizer(eat, value, silent) {

        var length = value.length + 1;
        var index = 0;
        var subvalue = '';
        var character;

        /* Eat initial spacing. */
        while (index < length) {
            character = value.charAt(index)

            if (character !== C_SPACE && character !== C_TAB) {
                break
            }

            subvalue += character
            index++
        }

        /* Eat the fence. */
        character = value.charAt(index);

        if (character !== C_DOLLAR) {
            return
        }

        subvalue = value.match(latexBlock);

        if (!subvalue) {
            return;
        }

        if (silent) {
            return true;
        }

        subvalue = subvalue[0];

        var trimmedContent = trim(subvalue);
        if(trimmedContent) {
            var fromIndex = trimmedContent.startsWith('$$')?2:0;
            var toIndex = trimmedContent.endsWith('$$')?trimmedContent.length-2:trimmedContent.length;
            trimmedContent = trimmedContent.substring(fromIndex , toIndex);
        }

        return eat(subvalue)({
            type: 'math',
            value: trimmedContent,
            data: {
                hName: 'div',
                hProperties: {
                    className: 'math'
                },
                hChildren: [
                    {
                        type: 'text',
                        value: trimmedContent
                    }
                ]
            }
        })
    }

    const Parser = this.Parser

    // Inject blockTokenizer
    const blockTokenizers = Parser.prototype.blockTokenizers
    const blockMethods = Parser.prototype.blockMethods
    blockTokenizers.math = blockTokenizer
    blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'math')

    // Inject math to interrupt rules
    const interruptParagraph = Parser.prototype.interruptParagraph
    const interruptList = Parser.prototype.interruptList
    const interruptBlockquote = Parser.prototype.interruptBlockquote
    interruptParagraph.splice(interruptParagraph.indexOf('fencedCode') + 1, 0, ['math'])
    interruptList.splice(interruptList.indexOf('fencedCode') + 1, 0, ['math'])
    interruptBlockquote.splice(interruptBlockquote.indexOf('fencedCode') + 1, 0, ['math'])

    const Compiler = this.Compiler

    // Stringify for math block
    if (Compiler != null) {
        const visitors = Compiler.prototype.visitors
        visitors.math = function (node) {
            return '$$\n' + node.value + '\n$$'
        }
    }
}
