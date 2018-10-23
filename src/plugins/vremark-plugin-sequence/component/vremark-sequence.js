require('../../../lib/js-sequence-diagrams/sequence-diagram.css');
require('./vremark-sequence.scss');
var Diagram = require('imports-loader?_=underscore,Raphael=raphael!js-sequence-diagrams');

module.exports = ({
    name: 'vremark-component-sequence',
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
            'class': ['vremark-sequence']
        });
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {self.result = '';return;}
            try {
                var diagram = Diagram.parse(self.code);
                var options = {theme: 'simple'};
                diagram.drawSVG(self.$el, options);
            } catch (e) {

            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
        // require.ensure([], function(){
        //     var flowchart = require('flowchart.js');
        //     self.compile(flowchart);
        // }, 'vremark-component-flowchart');
    },
    destroyed(){
        var self = this;
        // self.diagram && self.diagram.clean();
    }
});