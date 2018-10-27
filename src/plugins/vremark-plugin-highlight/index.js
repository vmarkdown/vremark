// require('./index.scss');

var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

function getLines (text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

function getLinesCount (text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
}


function format(html) {
    var lines = getLines(html);

    if (lines[lines.length-1].trim() === '') {
        lines.pop();
    }

    // for(var i=0;i<lines.length;i++) {
    // }

    return lines.map(function (line, index) {
        return ['<div class="vremark-hljs-line">', '<span class="vremark-hljs-line-number">'+(index+1)+'</span>',line, '</div>'].join('');
    }).join('');
}


module.exports = {
    name: 'vremark-plugin-highlight',
    props: {
        'lang': {
            type: String,
            required: true
        },
        'code': {
            type: String,
            required: true
        },
        'lineNumbers': {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            result: this.code || ''
        }
    },
    render(h) {
        return h('pre', {
            'class': ['vremark-plugin-highlight']
        }, [
            h('code', {
                'class': ['hljs', this.lang],
                domProps:{
                    innerHTML: this.result
                }
            })
        ]);
    },
    methods:{
        compile(hljs) {
            var self = this;

            try {
                var value = hljs.highlight(self.lang, self.code).value;
                var result = self.lineNumbers?format(value):value;
                self.result = result;
            }
            catch (e) {
                e && e.message && (self.result = e.message);
            }

            // try {
            //     var value = hljs.highlight(self.lang, self.code).value;
            //     var result = format(value);
            //     // debugger
            //     self.result = result;
            // }
            // catch (e) {
            //     self.result = hljs.highlightAuto(self.code).value;
            // }
        }
    },
    mounted() {
        var self = this;
        require.ensure([], function(){
            require('./index.scss');

            require('highlight.js/styles/github.css');
            // require('highlight.js/styles/monokai-sublime.css');
            var hljs = require('highlight.js');
            self.compile(hljs);
        }, 'vremark-plugin-highlight-libs');
    }
};

