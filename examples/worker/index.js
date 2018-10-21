require('github-markdown-css');

import Vue from 'vue';

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const stringify = require('rehype-stringify');

const processor = unified()
    .use(markdown, {
        footnotes: true,
        pedantic: true // fix md error
    })
    .use(remark2rehype)
    .use(function (options) {
        return function transformer(root, file, next) {
            setTimeout(function () {
                next();
            }, 3000);
        }
    })
    .use(stringify);

// console.log( processor.parse('# h1') );

(async () => {


    const file = await processor.process('# h1');

    console.log(file);

    const app = new Vue({
        el: '#app',
        data :{
            vdom: null
        },
        render(h) {

            return this.vdom || h('div', {
                'class': ['markdown-body']
            },'loading...');

        }
    });







})();

