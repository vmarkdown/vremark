require('./vremark-g2.scss');
var G2 = require('@antv/g2');
G2.track(false);

const G2Component = ({
    name: 'G2',
    props: {
        code: {
            type: String,
            require: true
        }
    },
    // template: '<div class="remark-g2"></div>',
    render(h) {
        return h('div',{
            class: 'remark-g2'
        })
    },
    mounted () {
        var self = this;
        var code = self.code;


        try {
            var container = self.$el;
            var func = new Function(
                'alert','prompt',
                'window','parent','document',
                'G2',
                'container',
                code);

            self.chart = func.apply({}, [
                function () {}, function () {},
                {}, {}, {},
                G2,
                container
            ]);

            // var chart = func(container, G2);
            // self.chart = chart;
        }
        catch (e) {
            console.error(e);
        }

    },
    destroyed() {
        var self = this;
        self.chart && self.chart.destroy();
    }
});

// Vue.component('g2', timer);

module.exports = G2Component;