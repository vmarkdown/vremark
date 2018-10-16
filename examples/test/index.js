const vremark = require('../../src/index');

// vremark.parse('# h1');

let md = require('../md/test.md');

const timer = Vue.extend({
    name: 'timer',
    data: function () {
        return {
            time: ''
        }
    },
    template: '<div>{{time}}</div>',
    mounted () {
        const self = this;
        self.interval = setInterval(() => {
            this.time = new Date;
        }, 1000);
    },
    destroyed() {
        const self = this;
        self.interval && clearInterval(self.interval);
    }
});

const app = new Vue({
    el: '#app',
    render(h) {

        console.time('all');

        console.time('parse');
        const hast = vremark.parse(md, {
            breaks: true,
            hashid: true,
            highlight: true,

            math: {
                katex: true,
            },

        });
        console.timeEnd('parse');

        console.time('render');
        const vdom = vremark.render(hast, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        });
        console.timeEnd('render');

        console.timeEnd('all');

        console.log(hast);

        // vdom.children.push(h(timer));
        return vdom;

    }
});

// for(let i=0;i<10;i++){
//     setTimeout(function () {
//         app.$forceUpdate();
//     }, i*1000);
// }
