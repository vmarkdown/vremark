require('./vremark-highlight.scss');

module.exports = {
    name: 'vremark-component-highlight',
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
            lib: false,
            result: this.code || ''
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
        compile(hljs) {
            var self = this;
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
        require.ensure([], function(){
            require('highlight.js/styles/github.css');
            var hljs = require('highlight.js');
            self.compile(hljs);
        }, 'vremark-component-highlight');
    }
};
