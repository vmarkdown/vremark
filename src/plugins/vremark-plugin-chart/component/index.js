const { Chart } = require('vremark-plugin-chart-libs');

require('./index.scss');

module.exports = {
    name: 'vremark-plugin-chart',
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
        return h('canvas',
            {'class': ['vremark-plugin-chart']}
        );
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {self.result = '';return;}
            try {
                var options = JSON.parse(self.code);
                self.chart = new Chart(self.$el, options);
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
        self.chart && self.chart.destroy();
    }
};