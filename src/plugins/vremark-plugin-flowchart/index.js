require('./index.scss');

module.exports = {
    name: 'vremark-plugin-flowchart',
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    render(h) {
        return h('div', {
            'class': ['vremark-plugin-flowchart']
        });
    },
    methods:{
        compile(flowchart) {
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
        require.ensure([], function(){
            var flowchart = require('flowchart.js');
            self.compile(flowchart);
        }, 'vremark-plugin-flowchart-libs');
    },
    destroyed(){
        var self = this;
        self.diagram && self.diagram.clean();
    }
};

