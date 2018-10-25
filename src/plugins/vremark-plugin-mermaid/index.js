require('./index.scss');
// var mermaid = require('mermaid');
//
// mermaid.initialize({
//     startOnLoad: false,
//     theme: 'default',
//     gantt: {}
// });

var index = 0;
module.exports = ({
    name: 'vremark-plugin-mermaid',
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
            {'class': ['vremark-plugin-mermaid', 'mermaid']},
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
        compile(mermaid) {
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
        require.ensure([], function(){
            var mermaid = require('mermaid');
            mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                gantt: {}
            });
            self.compile(mermaid);
        }, 'vremark-plugin-mermaid-libs');
    },
    destroyed(){
        var self = this;
    }
});