const { mermaid } = require('vremark-plugin-mermaid-libs');

require('./index.scss');

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    gantt: {}
});

var index = 0;

module.exports = {
    name: 'vremark-plugin-mermaid',
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            result: this.code || ''
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
        compile() {
            var self = this;
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
        self.compile();
    },
    destroyed(){
        var self = this;
    }
};