require('./sequence.scss');
// var Vue = require('vue');
var Diagram = require('./lib/sequence-diagram-min');

module.exports = ({
    name: 'sequence',
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
            'class': ['remark-sequence']
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
        setTimeout(function () {
            self.compile();
        }, 0);
    },
    destroyed(){
        var self = this;
        // self.diagram && self.diagram.clean();
    }
});