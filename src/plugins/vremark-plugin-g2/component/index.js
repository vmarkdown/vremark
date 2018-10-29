const { G2 } = require('vremark-plugin-g2-libs');

require('./index.scss');

module.exports = {
    name: 'vremark-plugin-g2',
    props: {
        code: {
            type: String,
            require: true
        }
    },
    render(h) {
        return h('div',{
            class: 'vremark-plugin-g2'
        })
    },
    methods:{
        compile() {
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
        }
    },
    mounted () {
        var self = this;
        self.compile();
        // require.ensure([], function(){
        //     var G2 = require('@antv/g2');
        //     G2.track(false);
        //     self.compile(G2);
        // }, 'vremark-plugin-g2-libs');
    },
    destroyed() {
        var self = this;
        self.chart && self.chart.destroy();
    }
};
