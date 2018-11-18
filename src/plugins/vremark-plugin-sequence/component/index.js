const { Diagram } = require('vremark-plugin-sequence-libs');
const COMPONENT_NAME = 'vremark-component-sequence';

require('./index.scss');

module.exports = ({
    name: COMPONENT_NAME,
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            result: this.code
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
                var diagram = Diagram.parse(self.code);
                var options = {theme: 'simple'};
                diagram.drawSVG(self.$el, options);
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
        // self.diagram && self.diagram.clean();
    }
});