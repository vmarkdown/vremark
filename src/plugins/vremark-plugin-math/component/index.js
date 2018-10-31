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
                    throwOnError: false,
                    displayMode: !this.inline,
                    macros: {}
                });
                self.result = renderedValue;
                // katex.render(self.code, self.$el);
                // katex.render("c = \\pm\\sqrt{a^2 + b^2}", element, {
                //     throwOnError: true
                // });
            } catch (e) {
                console.log(e);
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    }
};