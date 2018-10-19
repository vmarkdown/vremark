require('katex/dist/katex.css');
var katex = require('katex');
var Vue = require('vue');

module.exports = Vue.extend({
    name: 'math',
    props: {
        'inline': {
            type: Boolean,
            default: false
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
        return h(this.inline?'span':'p', {
            'class': ['vremark-katex-inlineMath'],
            domProps:{
                innerHTML: this.result
            }
        });
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {
                self.result = '';
                return;
            }
            try {
                var renderedValue = katex.renderToString(self.code, {
                    displayMode: !this.inline,
                    macros: {}
                });
                self.result = renderedValue;
            } catch (e) {

            }
        }
    },
    mounted() {
        var self = this;
        setTimeout(function () {
            self.compile();
        }, 0);
    }
});