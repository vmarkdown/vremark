// let styles = require('text-loader!./styles.txt');
// require('./index.scss');


// console.log(getLines(styles));
// styles = getLines(styles).map(function (style) {
//     return 'highlight.js/styles/'+style;
// });

// const bgs = {
//     'default': 'pre.vremark-plugin-highlight{background: #F0F0F0;}',
//     'github': 'pre.vremark-plugin-highlight{background: #f8f8f8;}',
//     'monokai-sublime': 'pre.vremark-plugin-highlight{background: #23241f;}',
//     'darcula': 'pre.vremark-plugin-highlight{background: #2b2b2b;}',
// };


// const style = require('style-loader/useable?singleton=true&id=1111!css-loader!sass-loader!./index.less');
// style.use();
//
// const style1 = require('style-loader/useable?singleton=true!css-loader!sass-loader!./other.less');
// setTimeout(function () {
//     style1.use();
// }, 10000);



// setTimeout(function () {
//     const style = require('style-loader/useable?singleton=true!css-loader!sass-loader!./index.less');
//     style.use();
//
//     setTimeout(function () {
//         style.unuse();
//     }, 4000);
//
// }, 1000);
//
//
// setTimeout(function () {
//     const style = require('style-loader/useable?singleton=true!css-loader!sass-loader!./other.less');
//     style.use();
// }, 5000);



// debugger


const themes = {
    'default':require('./themes/default.less'),
    'github':require('./themes/github.less'),
    'monokai-sublime':require('./themes/monokai-sublime.less'),
    'darcula':require('./themes/darcula.less')
};

let style = themes.default;
style.use();

const plugin = {
    name: 'vremark-plugin-highlight',
    // parse: require('./parse'),
    component: require('./component/index'),
    setTheme(theme) {

        if( themes.hasOwnProperty(theme) ) {
            if(style) {
                style.unuse();
            }
            style = themes[theme];
            style.use();
        }












        // switch (theme) {
        //     case 'default':
        //     case 'github':
        //     case 'darcula':
        //     case 'monokai-sublime':
        //     default:
        // }




        // console.log(theme);
        // var self = this;
        //
        //
        // // var container = document.getElementById('vremark-plugin-highlight');
        // // if(!container){
        // //     container = document.createElement('style');
        // //     container.id = 'vremark-plugin-highlight';
        // //     document.head.appendChild(container);
        // // }
        // // if(bgs[theme]){
        // //     // container.innerHTML = 'pre.vremark-plugin-highlight{'+bgs[theme]+'}';
        // //     container.innerHTML = bgs[theme];
        // // }
        // // else{
        // //     container.innerHTML = '';
        // // }
        //
        // if(self.style) {
        //     self.style.unuse();
        // }
        //
        // function getTheme(theme) {
        //     switch (theme) {
        //         case 'default':
        //             return require('./themes/default.less');
        //         case 'github':
        //             return require('./themes/github.less');
        //         case 'darcula':
        //             return require('./themes/darcula.less');
        //         case 'monokai-sublime':
        //             return require('./themes/monokai-sublime.less');
        //         default:
        //             return require('./themes/github.less');
        //     }
        // }
        // //
        // var style = getTheme(theme);
        // // debugger
        // style.use();
        //
        // self.style = style;




        // require.ensure([], function(){
        //
        //
        //
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
        // }, 'vremark-plugin-highlight-themes');

    }
};

module.exports = plugin;

