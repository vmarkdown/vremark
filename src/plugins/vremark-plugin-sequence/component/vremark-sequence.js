require('./vremark-sequence.scss');
// var Diagram = require('js-sequence-diagrams');

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
            result: this.code
        }
    },
    render(h) {
        return h('div', {
            'class': ['vremark-sequence']
        });
    },
    methods:{
        compile(Diagram) {
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
        require.ensure([], function(){
            require('js-sequence-diagrams-css');
            var Diagram = require('js-sequence-diagrams');
            self.compile(Diagram);
        }, 'vremark-component-sequence');
    },
    destroyed(){
        var self = this;
        // self.diagram && self.diagram.clean();
    }
});