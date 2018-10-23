require('katex/dist/katex.css');
var katex = require('katex');

module.exports = ({
    name: 'vremark-math',
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
            'class': [this.inline?'vremark-katex-inlineMath':'vremark-katex-math'],
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
        self.compile();
    }
});