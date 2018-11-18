const { hljs } = require('vremark-plugin-highlight-libs');

require('./index.scss');

var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

function getLines (text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

function getLinesCount (text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
}


function format(html) {
    var lines = getLines(html);

    if (lines[lines.length-1].trim() === '') {
        lines.pop();
    }

    return lines.map(function (line, index) {
        return ['<div class="vremark-hljs-line">', '<span class="vremark-hljs-line-number">'+(index+1)+'</span>',line, '</div>'].join('');
    }).join('');
}


module.exports = {
    name: 'vremark-component-highlight',
    props: {
        'lang': {
            type: String,
            required: true
        },
        'code': {
            type: String,
            required: true
        },
        'lineNumbers': {
            type: Boolean,
            default: false
        },
        'theme': {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            result: this.code || ''
        }
    },
    render(h) {
        return h('pre', {
            'class': ['vremark-component-highlight']
        }, [
            h('code', {
                'class': ['hljs', this.lang],
                domProps:{
                    innerHTML: this.result
                }
            })
        ]);
    },
    methods:{
        compile() {
            var self = this;

            try {
                var value = hljs.highlight(self.lang, self.code).value;
                var result = self.lineNumbers?format(value):value;
                self.result = result;
            }
            catch (e) {
                e && e.message && (self.result = e.message);
            }

            // try {
            //     var value = hljs.highlight(self.lang, self.code).value;
            //     var result = format(value);
            //     // debugger
            //     self.result = result;
            // }
            // catch (e) {
            //     self.result = hljs.highlightAuto(self.code).value;
            // }
        }
    },
    mounted() {
        var self = this;

        self.compile();

        // require(['highlight.js'], function (hljs) {
        //     self.compile(hljs);
        // });




        // plugin.setTheme('github');



        // require.ensure([], function(){
        //
        //     // function getTheme(theme) {
        //     //     switch (theme) {
        //     //         case 'github':
        //     //             return require('./themes/github.less');
        //     //         case 'monokai-sublime':
        //     //             return require('./themes/monokai-sublime.less');
        //     //         default:
        //     //             return require('./themes/github.less');
        //     //     }
        //     // }
        //     //
        //     // var style = getTheme(self.theme);
        //     //
        //     // setTimeout(function () {
        //     //     style.use();
        //     // }, 1000);
        //     //
        //     //
        //     // setTimeout(function () {
        //     //     style.unuse();
        //     // }, 5000);
        //
        //     // plugin.setTheme('monokai-sublime');
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');




//         require.ensure(["highlight.js/styles/a11y-dark.css", "highlight.js/styles/a11y-light.css", "highlight.js/styles/agate.css", "highlight.js/styles/an-old-hope.css", "highlight.js/styles/androidstudio.css", "highlight.js/styles/arduino-light.css", "highlight.js/styles/arta.css", "highlight.js/styles/ascetic.css", "highlight.js/styles/atelier-cave-dark.css", "highlight.js/styles/atelier-cave-light.css", "highlight.js/styles/atelier-dune-dark.css", "highlight.js/styles/atelier-dune-light.css", "highlight.js/styles/atelier-estuary-dark.css", "highlight.js/styles/atelier-estuary-light.css", "highlight.js/styles/atelier-forest-dark.css", "highlight.js/styles/atelier-forest-light.css", "highlight.js/styles/atelier-heath-dark.css", "highlight.js/styles/atelier-heath-light.css", "highlight.js/styles/atelier-lakeside-dark.css", "highlight.js/styles/atelier-lakeside-light.css", "highlight.js/styles/atelier-plateau-dark.css", "highlight.js/styles/atelier-plateau-light.css", "highlight.js/styles/atelier-savanna-dark.css", "highlight.js/styles/atelier-savanna-light.css", "highlight.js/styles/atelier-seaside-dark.css", "highlight.js/styles/atelier-seaside-light.css", "highlight.js/styles/atelier-sulphurpool-dark.css", "highlight.js/styles/atelier-sulphurpool-light.css", "highlight.js/styles/atom-one-dark.css", "highlight.js/styles/atom-one-dark-reasonable.css", "highlight.js/styles/atom-one-light.css", "highlight.js/styles/brown-paper.css", "highlight.js/styles/brown-papersq.png", "highlight.js/styles/codepen-embed.css", "highlight.js/styles/color-brewer.css", "highlight.js/styles/darcula.css", "highlight.js/styles/dark.css", "highlight.js/styles/darkula.css", "highlight.js/styles/default.css", "highlight.js/styles/docco.css", "highlight.js/styles/dracula.css", "highlight.js/styles/far.css", "highlight.js/styles/foundation.css", "highlight.js/styles/github.css", "highlight.js/styles/github-gist.css", "highlight.js/styles/gml.css", "highlight.js/styles/googlecode.css", "highlight.js/styles/grayscale.css", "highlight.js/styles/gruvbox-dark.css", "highlight.js/styles/gruvbox-light.css", "highlight.js/styles/hopscotch.css", "highlight.js/styles/hybrid.css", "highlight.js/styles/idea.css", "highlight.js/styles/ir-black.css", "highlight.js/styles/isbl-editor-dark.css", "highlight.js/styles/isbl-editor-light.css", "highlight.js/styles/kimbie.dark.css", "highlight.js/styles/kimbie.light.css", "highlight.js/styles/lightfair.css", "highlight.js/styles/magula.css", "highlight.js/styles/mono-blue.css", "highlight.js/styles/monokai.css", "highlight.js/styles/monokai-sublime.css", "highlight.js/styles/nord.css", "highlight.js/styles/obsidian.css", "highlight.js/styles/ocean.css", "highlight.js/styles/paraiso-dark.css", "highlight.js/styles/paraiso-light.css", "highlight.js/styles/pojoaque.css", "highlight.js/styles/pojoaque.jpg", "highlight.js/styles/purebasic.css", "highlight.js/styles/qtcreator_dark.css", "highlight.js/styles/qtcreator_light.css", "highlight.js/styles/railscasts.css", "highlight.js/styles/rainbow.css", "highlight.js/styles/routeros.css", "highlight.js/styles/school-book.css", "highlight.js/styles/school-book.png", "highlight.js/styles/shades-of-purple.css", "highlight.js/styles/solarized-dark.css", "highlight.js/styles/solarized-light.css", "highlight.js/styles/sunburst.css", "highlight.js/styles/tomorrow.css", "highlight.js/styles/tomorrow-night.css", "highlight.js/styles/tomorrow-night-blue.css", "highlight.js/styles/tomorrow-night-bright.css", "highlight.js/styles/tomorrow-night-eighties.css", "highlight.js/styles/vs.css", "highlight.js/styles/vs2015.css", "highlight.js/styles/xcode.css", "highlight.js/styles/xt256.css", "highlight.js/styles/zenburn.css"], function(){
//             require('./index.scss');
//             var hljs = require('highlight.js');
//
//
//             require('highlight.js/styles/github.css');
//
//             setTimeout(function () {
//                 require('highlight.js/styles/atelier-cave-dark.css');
//
//             }, 3000);
//
//             // var style = require('style-loader/useable!highlight.js/styles/arduino-light.css');
//             // style.unuse();
// // debugger
//
//             self.compile(hljs);
//         }, 'vremark-plugin-highlight-libs');



        // require.ensure([], function(){
        //     // require('highlight.js/styles/github.css');
        //     // require('highlight.js/styles/monokai-sublime.css');
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');


        // require('highlight.js/styles/monokai-sublime.css');
        // var hljs = require('highlight.js');
        // self.compile(hljs);

        // await import(
        //     'highlight.js/styles/monokai-sublime.css'
        // );

        // const hljs = await import(
        //     'highlight.js'
        // );
        // self.compile(hljs.default);




        // require.ensure([], function(){
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');








    }
};