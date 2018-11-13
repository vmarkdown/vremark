const Prism = require('../prism');

/*

prism.css
prism-coy.css
prism-dark.css
prism-funky.css
prism-okaidia.css
prism-solarizedlight.css
prism-tomorrow.css
prism-twilight.css

* */
// require('prismjs/themes/prism-twilight.css');
require('../themes/prism-github.css');
require('./index.scss');

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
        },
        'theme': {
            type: String,
            default: 'default'
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
        compile() {
            var self = this;

            Prism.highlightElement(self.$el.querySelector('.hljs'));

            // var language = Prism.languages[self.lang] || loadLanguages.languages[self.lang];
            // if(language){
            //     var html = Prism.highlight(self.code, language, self.lang);
            //     self.result = html;
            // }

            // try {
            //     var value = hljs.highlight(self.lang, self.code).value;
            //     var result = self.lineNumbers?format(value):value;
            //     self.result = result;
            // }
            // catch (e) {
            //     e && e.message && (self.result = e.message);
            // }

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
        self.compile();
    }
};