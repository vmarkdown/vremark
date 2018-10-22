require('./vremark-sequence.scss');
var Diagram = require('./lib/sequence-diagram-min');

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