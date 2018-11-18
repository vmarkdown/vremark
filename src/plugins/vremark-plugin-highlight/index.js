const themes = {
    'default':require('./themes/default.less'),
    'github':require('./themes/github.less'),
    'github-rouge':require('./themes/github-rouge.less'),
    'monokai-sublime':require('./themes/monokai-sublime.less'),
    'darcula':require('./themes/darcula.less')
};

// let style = themes['github-rouge'];
// style.use();
//
// const plugin = {
//     name: 'vremark-plugin-highlight',
//     component: require('./component/index'),
//     setTheme(theme) {
//
//         if( themes.hasOwnProperty(theme) ) {
//             if(style) {
//                 style.unuse();
//             }
//             style = themes[theme];
//             style.use();
//         }
//
//
//
//
//
//
//
//
//
//
//
//
//         // switch (theme) {
//         //     case 'default':
//         //     case 'github':
//         //     case 'darcula':
//         //     case 'monokai-sublime':
//         //     default:
//         // }
//
//
//
//
//         // console.log(theme);
//         // var self = this;
//         //
//         //
//         // // var container = document.getElementById('vremark-plugin-highlight');
//         // // if(!container){
//         // //     container = document.createElement('style');
//         // //     container.id = 'vremark-plugin-highlight';
//         // //     document.head.appendChild(container);
//         // // }
//         // // if(bgs[theme]){
//         // //     // container.innerHTML = 'pre.vremark-plugin-highlight{'+bgs[theme]+'}';
//         // //     container.innerHTML = bgs[theme];
//         // // }
//         // // else{
//         // //     container.innerHTML = '';
//         // // }
//         //
//         // if(self.style) {
//         //     self.style.unuse();
//         // }
//         //
//         // function getTheme(theme) {
//         //     switch (theme) {
//         //         case 'default':
//         //             return require('./themes/default.less');
//         //         case 'github':
//         //             return require('./themes/github.less');
//         //         case 'darcula':
//         //             return require('./themes/darcula.less');
//         //         case 'monokai-sublime':
//         //             return require('./themes/monokai-sublime.less');
//         //         default:
//         //             return require('./themes/github.less');
//         //     }
//         // }
//         // //
//         // var style = getTheme(theme);
//         // // debugger
//         // style.use();
//         //
//         // self.style = style;
//
//
//
//
//         // require.ensure([], function(){
//         //
//         //
//         //
//         //     //
//         //     // setTimeout(function () {
//         //     //     style.use();
//         //     // }, 1000);
//         //     //
//         //     //
//         //     // setTimeout(function () {
//         //     //     style.unuse();
//         //     // }, 5000);
//         //
//         // }, 'vremark-plugin-highlight-themes');
//
//     }
// };
//
// module.exports = plugin;



const BasePlugin = require('../plugin');

class Plugin extends BasePlugin {

    constructor() {
        super();
        const self = this;
        self.style = themes['github-rouge'];
    }

    install() {
        const self = this;
        self.style.use();
    }

    uninstall() {
        const self = this;
        self.style.unuse();
    }
}

Plugin.name = 'vremark-plugin-highlight';
Plugin.component = require('./component');

module.exports = Plugin;


