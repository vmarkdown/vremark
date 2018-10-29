const { katex } = require('vremark-plugin-math-libs');

require('./index.scss');

module.exports = {
    name: 'vremark-plugin-math',
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
            result: this.code || ''
        }
    },
    render(h) {
        return h(this.inline?'span':'p', {
            'class': ['vremark-plugin-math', this.inline?'vremark-katex-inlineMath':'vremark-katex-math'],
            domProps:{
                innerHTML: this.result
            }
        });
    },
    methods: {
        compile() {
            var self = this;
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
        self.compile();
    }
};