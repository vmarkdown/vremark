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
        type: {
            default: 'Chart'
        },
        legend: {
            type: [Object, Boolean, String],
            default: null
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 300
        },
        data: {
            type: Array,
            default: function () {
                return null
            }
        },
        scaleConfig: {
            type: Object,
            default: function () {
                return null
            }
        },
        source: {
            type: Object,
            default: function () {
                return null
            }
        },
        renderer: {
            type: String,
            default: 'canvas'
        },
        theme: {
            type: [String, Object],
            default: 'default'
        },
        forceFit: {
            type: Boolean,
            default: false
        },
        padding: {
            type: [Array, Number],
            default: function () {
                return null;
            }
        },
        coord: {
            type: String,
            default: null
        },
        position: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: null
        },
        interval: {
            type: Object,
            default: function () {
                return null
            }
        },
        area: {
            type: Object,
            default: function () {
                return null
            }
        },
        line: {
            type: Object,
            default: function () {
                return null
            }
        },
        label: {
            type: [Object],
            default: null
        },
        axis: {
            type: [Boolean, Array],
            default: function () {
                return null
            }
        },
        scale: {
            type: Object,
            default: function () {
                return null;
            }
        },
        tooltip: {
            type: Object,
            default: function () {
                return null;
            }
        },
    },
    template: '<div class="remark-g2"></div>',
    mounted () {

        var self = this;

        var options = {
            container: self.$el,
            height : this.height,
            theme : this.theme,
            forceFit : this.forceFit,
            renderer : this.renderer,
        };

        if(this.padding) {
            options.padding = this.padding;
        }
        if(this.width > 0) {
            options.width = this.width;
        }

        var chart = new G2.Chart(options);

        self.chart = chart;

        //field, legendConfig
        if(this.legend || this.legend === false) {
            if(typeof this.legend === 'boolean'){
                chart.legend(this.legend);
            }
            else if(typeof this.legend === 'object' && this.legend.field){
                chart.legend(this.legend.field, this.legend.legendConfig || {});
            }
        }

        if(this.source && this.source.data) {
            chart.source(this.source.data, this.source.scaleConfig || {});
        }
        else if(this.data){
            chart.source(this.data, this.scaleConfig || {});
        }

        if(this.axis || this.axis === false) {
            if(typeof this.axis === 'boolean') {
                chart.axis(this.axis);
            }
            else if(this.axis && this.axis.length > 0){
                this.axis.forEach(function (ax) {
                    chart.axis(ax.field, (ax.axisConfig || ax.axisConfig === false)?ax.axisConfig:{});
                });
            }
        }

        if(this.scale){
            chart.scale(this.scale);
        }

        if(this.coord){
            chart.coord(this.coord);
        }

        if(this.tooltip){
            chart.tooltip(this.tooltip);
        }

        settings(chart, chart.interval, this.interval);
        settings(chart, chart.area, this.area);
        settings(chart, chart.line, this.line);

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