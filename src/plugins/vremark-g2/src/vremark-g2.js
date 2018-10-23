require('./vremark-g2.scss');
var G2 = require('@antv/g2');
G2.track(false);

module.exports = {
    name: 'G2',
    props: {
        code: {
            type: String,
            require: true
        }
    },
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

        }
        catch (e) {
            console.error(e);
        }

    },
    destroyed() {
        var self = this;
        self.chart && self.chart.destroy();
    }
};
