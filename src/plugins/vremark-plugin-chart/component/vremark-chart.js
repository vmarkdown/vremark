require('./vremark-chart.scss');

module.exports = ({
    name: 'vremark-component-chart',
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
            {'class': ['remark-chart']}
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
        }, 'vremark-component-chart');
    },
    destroyed(){
        var self = this;
        self.chart && self.chart.destroy();
    }
});