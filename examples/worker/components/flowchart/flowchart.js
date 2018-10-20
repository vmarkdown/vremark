// require('katex/dist/katex.css');
require('./flowchart.scss');
var flowchart = require('flowchart.js');
var Vue = require('vue');

module.exports = Vue.extend({
    name: 'flowchart',
    props: {
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
        return h('div', {
            'class': ['remark-flowchart']
        });
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {self.result = '';return;}
            try {
                var diagram = flowchart.parse(self.code);
                diagram.drawSVG(self.$el);
                self.diagram = diagram;
            } catch (e) {

            }
        }
    },
    mounted() {
        var self = this;
        setTimeout(function () {
            self.compile();
        }, 0);
    },
    destroyed(){
        var self = this;
        self.diagram && self.diagram.clean();
    }
});