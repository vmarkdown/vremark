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

            // breaks: false,
            // hashid: false,
            // highlight: false,
            //
            // math: {
            //     katex: false,
            // },
            //
            // flowchart: false,
            // sequence: false,
            // mermaid: false,
            // plantuml: false,
            // html2hast: false

        });
        console.timeEnd('parse');

        console.time('render');
        const vdom = vremark.render(hast, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body',
            mode1: function (node) {

                // debugger
                var props = {
                    attrs: {},
                    domProps: {}
                };

                if(node.properties){

                    if(node.properties.className) {
                        props['class'] = node.properties.className;
                    }

                    if(node.properties.innerHTML) {
                        props.domProps.innerHTML = node.properties.innerHTML;
                    }

                    Object.keys(node.properties).forEach(function (key) {
                        if( key ==='className' || key==='innerHTML' ){
                            return;
                        }
                        props.attrs[key] = node.properties[key];
                    });

                }

                if(node.type === "raw"){
                    node.tagName = node.tagName || 'div';
                    props.domProps.innerHTML = node.value;
                }

                return props;

                // return node.properties;
                // if(!node.properties) return {};
                // var props = {
                //     attrs: node.properties,
                //     domProps: {}
                // };
                // if(node.properties.className) {
                //     props['class'] = node.properties.className;
                //     delete props.attrs.className;
                // }
                // if(node.properties.innerHTML) {
                //     props.domProps.innerHTML = node.properties.innerHTML;
                //     delete props.attrs.innerHTML;
                // }
                // return props;
            }
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
