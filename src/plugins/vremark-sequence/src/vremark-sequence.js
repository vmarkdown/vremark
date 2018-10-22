require('../../../lib/js-sequence-diagrams/sequence-diagram.css');
require('./vremark-sequence.scss');
// var Diagram = require('./lib/sequence-diagram-min');

// var Diagram = require('../../../../bower_components/js-sequence-diagrams/dist/sequence-diagram-snap.js');

// var Diagram = require('imports-loader?_=underscore,Raphael=raphael!./lib/sequence-diagram');

var Diagram = require('imports-loader?_=underscore,Raphael=raphael!js-sequence-diagrams');

module.exports = ({
    name: 'vremark-sequence',
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
    },
    destroyed(){
        var self = this;
        // self.diagram && self.diagram.clean();
    }
});