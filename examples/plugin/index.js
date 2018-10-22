require('github-markdown-css');

import Vue from 'vue';
const vremark = require('../../src/index');

const md = require('../md/test.md');

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time || 1000);
    });
}

(async ()=>{

    async function compile(h, md) {
        console.time('compile');
        const vdom = await vremark(md, {
            mode: 'vue',
            h: h,
            rootClassName: 'markdown-body',
            rootTagName: 'main'
        });
        console.timeEnd('compile');
        console.log(vdom);
        // await sleep(3000);
        return vdom;
    }

    const app = new Vue({
        el: '#app',
        data :function () {
            return {
                md: md
            }
        },
        beforeCreate(){
            const self = this;
            self.result = {
                change: false,
                compiling: false,
                vdom: null
            };
            self.result.change = true;
        },
        methods:{
            setValue(md) {
                const self = this;
                self.result.change = true;
                Vue.set(app, 'md', md);
                app.$forceUpdate();
            }
        },
        render(h) {
            // debugger
            const self = this;

            if(self.result.compiling){
                return self.result.vdom;
            }

            if(self.result.change) {
                self.result.compiling = true;
                compile(h, self.md).then( (vdom) => {
                    self.result.vdom = vdom;
                    self.result.compiling = false;
                    self.result.change = false;
                    self.$forceUpdate();
                });
            }

            return self.result.vdom || h('div', {}, 'loading');
        }
    });

    // setTimeout(function () {
    //     app.setValue(require('../md/test.md'));
    // }, 5000);

    // for(var i=0;i<10;i++){
    //     await sleep(3000);
    //     app.setValue(require('../md/test.md'));
    // }

})();













// const visit = require('unist-util-visit');
//
//
// import Vue from 'vue';
// const unified = require('unified');
// const markdown = require('remark-parse');
// const remark2rehype = require('remark-rehype');
// const stringify = require('rehype-stringify');
//
// const flowchart = require('../../src/plugins/vremark-flowchart/vremark-flowchart.plugin');
//
//
// let md = require('../md/test.md');
//
// (async () => {
//
//
//     const processor = unified()
//         .use(markdown, {
//             footnotes: true,
//             pedantic: true // fix md error
//         })
//         .use(flowchart)
//         .use(remark2rehype)
//         .use(stringify);
//
//
//     const file = await processor.process(md);
//
//     console.log(file);
//
//     const app = new Vue({
//         el: '#app',
//         // data :{
//         //     vdom: null
//         // },
//         render(h) {
//
//             return h('div', {
//                 class: 'markdown-body',
//                 domProps: {
//                     // innerHTML: file.contents
//                 }
//             }, [
//
//                 h('vremark-flowchart', {
//                     props:{
//                         code: `flow
// st=>start: Start
// e=>end
// op=>operation: My Operation
// cond=>condition: Yes or No?
//
// st->op->cond
// cond(yes)->e
// cond(no)->op`
//                     }
//                 })
//
//
//             ]);
//             // return this.vdom || h('div', {
//             //     'class': ['markdown-body']
//             // },'loading...');
//
//         }
//     });
//
//
//
//
//
//
//
// })();

