var Vue = require('vue');
var hljs = require('highlight.js');

module.exports = Vue.extend({
    name: 'highlight',
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
        setTimeout(function () {
            self.compile();
        }, 0);
    }
});