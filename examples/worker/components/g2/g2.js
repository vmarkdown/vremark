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
        }
    },
    template: '<div class="remark-g2"></div>',
    mounted () {
        var self = this;
        var code = self.code;


        try {
            var container = self.$el;
            var func = new Function(
                'alert','prompt','window','document',
                'G2',
                'container',
                code);

            self.chart = func.apply({}, [
                function () {}, function () {}, {}, {},
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