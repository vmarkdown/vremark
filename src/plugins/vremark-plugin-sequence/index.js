require('./index.scss');
// var Diagram = require('js-sequence-diagrams');

module.exports = ({
    name: 'vremark-plugin-sequence',
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
            'class': ['vremark-plugin-sequence']
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
        }, 'vremark-plugin-sequence-libs');
    },
    destroyed(){
        var self = this;
        // self.diagram && self.diagram.clean();
    }
});