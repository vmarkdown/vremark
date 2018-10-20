const G2 = require('@antv/g2');

function settings(chart, dimension, options) {

    if(!options) {
        return null;
    }

    var c = dimension();

    if(options.position){
        c = c.position(options.position);
    }
    if(options.color){
        c = c.color(options.color);
    }
    if(options.label && options.label.field){
        c = c.label(options.label.field, options.label.cfg || {});
    }
    if(options.style){
        c = c.style(options.style);
    }
    if(options.size){
        c = c.size(options.size);
    }

    return c;
}

const G2Component = Vue.extend({
    name: 'G2',
    props: {
        code: {
            type: String,
            require: true
        },
        //
        // type: {
        //     default: 'Chart'
        // },
        // legend: {
        //     type: [Object, Boolean, String],
        //     default: null
        // },
        // width: {
        //     type: Number,
        //     default: 0
        // },
        // height: {
        //     type: Number,
        //     default: 300
        // },
        // data: {
        //     type: Array,
        //     default: function () {
        //         return null
        //     }
        // },
        // scaleConfig: {
        //     type: Object,
        //     default: function () {
        //         return null
        //     }
        // },
        // source: {
        //     type: Object,
        //     default: function () {
        //         return null
        //     }
        // },
        // renderer: {
        //     type: String,
        //     default: 'canvas'
        // },
        // theme: {
        //     type: [String, Object],
        //     default: 'default'
        // },
        // forceFit: {
        //     type: Boolean,
        //     default: false
        // },
        // padding: {
        //     type: [Array, Number],
        //     default: function () {
        //         return null;
        //     }
        // },
        // coord: {
        //     type: String,
        //     default: null
        // },
        // position: {
        //     type: String,
        //     default: null
        // },
        // color: {
        //     type: String,
        //     default: null
        // },
        // interval: {
        //     type: Object,
        //     default: function () {
        //         return null
        //     }
        // },
        // area: {
        //     type: Object,
        //     default: function () {
        //         return null
        //     }
        // },
        // line: {
        //     type: Object,
        //     default: function () {
        //         return null
        //     }
        // },
        // label: {
        //     type: [Object],
        //     default: null
        // },
        // axis: {
        //     type: [Boolean, Array],
        //     default: function () {
        //         return null
        //     }
        // },
        // scale: {
        //     type: Object,
        //     default: function () {
        //         return null;
        //     }
        // },
        // tooltip: {
        //     type: Object,
        //     default: function () {
        //         return null;
        //     }
        // },
    },
    computed: {
        options() {
            var code = this.code;
            var options = {};
            try {
                // var code = node.children[0];
                // var type = code.properties.className[0].replace('language-G2.', '');
                // options.type = 'Chart';
                // var item = code.children[0];
                // node.key = hash(item.value);
                var func = new Function('return '+code);
                var _options = func();
                Object.assign(options, _options);
            }
            catch (e) {
                options = {};
            }
            return options;
        }
    },
    template: '<div class="remark-g2"></div>',
    mounted () {

        var options = this.options;

        var self = this;

        var config = {
            container: self.$el,
            height : options.height,
            theme : options.theme,
            forceFit : options.forceFit,
            renderer : options.renderer,
        };

        if(options.padding) {
            config.padding = options.padding;
        }
        if(options.width > 0) {
            config.width = options.width;
        }

        var chart = new G2.Chart(config);

        self.chart = chart;

        //field, legendConfig
        if(options.legend || options.legend === false) {
            if(typeof options.legend === 'boolean'){
                chart.legend(options.legend);
            }
            else if(typeof options.legend === 'object' && options.legend.field){
                chart.legend(options.legend.field, options.legend.legendConfig || {});
            }
        }

        if(options.source && options.source.data) {
            chart.source(options.source.data, options.source.scaleConfig || {});
        }
        else if(options.data){
            chart.source(options.data, options.scaleConfig || {});
        }

        if(options.axis || options.axis === false) {
            if(typeof options.axis === 'boolean') {
                chart.axis(options.axis);
            }
            else if(options.axis && options.axis.length > 0){
                this.axis.forEach(function (ax) {
                    chart.axis(ax.field, (ax.axisConfig || ax.axisConfig === false)?ax.axisConfig:{});
                });
            }
        }

        if(options.scale){
            chart.scale(options.scale);
        }

        if(options.coord){
            chart.coord(options.coord);
        }

        if(this.tooltip){
            chart.tooltip(options.tooltip);
        }

        settings(chart, chart.interval, options.interval);
        settings(chart, chart.area, options.area);
        settings(chart, chart.line, options.line);

        try {
            chart.render();
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