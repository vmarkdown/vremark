require('highlight.js/styles/github.css');
require('./vremark-highlight.scss');

var hljs = require('highlight.js');



var Component = ({
    name: 'vremark-highlight',
    props: {
        'lang': {
            type: String,
            required: true
        },
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            result: ''
        }
    },
    render(h) {
        return h('pre', {}, [
            h('code', {
                'class': ['hljs', this.lang],
                domProps:{
                    innerHTML: this.result
                }
            })
        ]);
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {
                self.result = '';
                return;
            }
            try {
                self.result = hljs.highlight(self.lang, self.code).value;
            }
            catch (e) {
                self.result = hljs.highlightAuto(self.code).value;
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    }
});

module.exports = Component;
