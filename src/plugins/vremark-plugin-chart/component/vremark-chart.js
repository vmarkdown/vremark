require('./vremark-chart.scss');

module.exports = {
    name: 'vremark-chart',
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
            {'class': ['vremark-chart']}
        );
    },
    methods:{
        compile(Chart) {
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
        require.ensure([], function(){
            var Chart = require('chart.js');
            self.compile(Chart);
        }, 'vremark-chart-libs');
    },
    destroyed(){
        var self = this;
        self.chart && self.chart.destroy();
    }
};