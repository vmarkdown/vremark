require('./vremark-flowchart.plugin.scss');
import Vue from 'vue';
var flowchart = require('flowchart.js');

Vue.component('vremark-flowchart', {
    name: 'vremark-flowchart',
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    render(h) {
        return h('div', {
            'class': ['vremark-flowchart']
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
});

