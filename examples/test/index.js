const vremark = require('../../src/index');


let md = require('../md/maxiang.md');

const app = new Vue({
    el: '#app',
    render(h) {
        // const vdom = vremark(md, {
        //     h: h,
        //     mode: 'vue',
        //     rootTagName: 'main',
        //     rootClassName: 'markdown-body',
        // });
        // return vdom;

        console.time('all');

        const hast = vremark.parse(md, {
            breaks: true
        });


        const vdom = vremark.render(hast, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        });

        console.timeEnd('all');

        console.log(hast);


        return vdom;

    }
});
