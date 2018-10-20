require('./chart.scss');
// var Vue = require('vue');
var Chart = require('chart.js');

module.exports = ({
    name: 'chart',
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
        compile() {
            var self = this;
            if(!self.code) {self.result = '';return;}
            try {
                var options = JSON.parse(self.code);
                var chart = new Chart(self.$el, options);
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