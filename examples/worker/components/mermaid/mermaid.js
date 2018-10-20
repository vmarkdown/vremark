require('./mermaid.scss');
// var Vue = require('vue');
var mermaid = require('mermaid');

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    gantt: {}
});

var index = 0;
module.exports = ({
    name: 'mermaid',
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
        return h('pre',
            {'class': ['remark-mermaid', 'mermaid']},
            [
                h('code', {
                    'class': ['lang-mermaid'],
                    domProps:{
                        innerHTML: this.result
                    }
                })
            ]
        );
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {self.result = '';return;}
            try {
                var id = 'mermaid' + index++;
                mermaid.render(id, self.code, function (svgGraph) {
                    self.result = svgGraph;
                });
            } catch (e) {
                console.error(e);
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
    }
});