require('./index.scss');


const flowchart = require('flowchart.js');
const COMPONENT_NAME = 'vremark-component-flowchart';

module.exports = {
    name: COMPONENT_NAME,
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    render(h) {
        return h('div', {
            'class': [COMPONENT_NAME]
        });
    },
    methods:{
        compile() {
            var self = this;
            try {
                var diagram = flowchart.parse(self.code);
                diagram.drawSVG(self.$el);
                self.diagram = diagram;
            } catch (e) {
                console.error(e);
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    },
    destroyed(){
        var self = this;
        self.diagram && self.diagram.clean();
    }
};

