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




    const app = new Vue({
        el: '#app',
        data :{
            md: '',
            vdom: null
        },
        render() {
            return this.vdom;
        },
        methods: {
            async compile() {
                const h = this.$createElement;

                console.time('compile');
                const vdom = await vremark(md.replace('马克飞象', +new Date), {
                    mode: 'vue',
                    h: h,
                    rootClassName: 'markdown-body',
                    rootTagName: 'main'
                });
                console.timeEnd('compile');

                console.log(vdom);
                this.vdom = vdom;
            }
        },
        async mounted(){
            await this.compile();
            // for(let i=0;i<10;i++) {
            //     await this.compile();
            //     await sleep(2000);
            // }
        }
    });


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

