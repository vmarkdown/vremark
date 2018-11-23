// const PLUGIN_NAME = 'vremark-plugin-flowchart';
// const COMPONENT_NAME = 'vremark-component-flowchart';
// function isPlugin(node) {
//     return node.lang &&
//         (
//             node.lang === 'flow' || node.lang === 'flowchart'
//         )
//         && node.tagName === "pre" && node.type === "element";
// }

// async function component() {
//     const component = await import(
//             /* webpackChunkName: "vremark-component-flowchart" */
//             './component');
//     return component;
// }

/*
module.exports = {
    PLUGIN_NAME: PLUGIN_NAME,
    COMPONENT_NAME: COMPONENT_NAME,
    test: isPlugin,
    loader: function (node) {
        const data = node.data || {};
        const props = data.props || {};
        Object.assign(props, {
            code: node.value
        });
        data.props = props;
        node.data = data;
        node.tagName = COMPONENT_NAME;
        node.children = [];
    },
    component: component
};*/

const BasePlugin = require('../plugin');

class Plugin extends BasePlugin {

    static test(node) {
        return node.lang &&
            (
                node.lang === 'flow' || node.lang === 'flowchart'
            )
            && node.tagName === "pre" && node.type === "element";
    }

    static transformer(node) {
        const data = node.data || {};
        const props = data.props || {};
        Object.assign(props, {
            code: node.value
        });
        data.props = props;
        node.data = data;
        node.tagName = Plugin.COMPONENT_NAME;
        node.children = [];
    }

    static async getComponent() {
        return await import(
            /* webpackChunkName: "vremark-component-flowchart" */
            './component');
    }

}

Plugin.PLUGIN_NAME = 'vremark-plugin-flowchart';
Plugin.COMPONENT_NAME = 'vremark-component-flowchart';

module.exports = Plugin;





// module.exports = createPlugin({
//     isPlugin: isPlugin,
//     loadComponent: function () {
//         return new Promise(function (resolve, reject) {
//             require.ensure([], function(){
//                 const component = require('./component');
//                 resolve(component);
//             }, COMPONENT_NAME);
//         });
//     },
//     PLUGIN_NAME: PLUGIN_NAME,
//     COMPONENT_NAME: COMPONENT_NAME
// });

// var xtend = require('xtend');
// const visit = require('unist-util-visit');
// const PLUGIN_NAME = 'vremark-plugin-flowchart';
// const COMPONENT_NAME = 'vremark-component-flowchart';
//
// function isPlugin(node) {
//     return node.lang &&
//         (
//             node.lang === 'flow' || node.lang === 'flowchart'
//         )
//         && node.tagName === "pre" && node.type === "element";
// }
//
// function plugin(options = {}) {
//     var settings = xtend(options, this.data('settings'));
//
//     const register = settings.register;
//
//     let hasComponent = false;
//
//     return async function transformer(root, file, next) {
//
//         visit(root, function (node) {
//             return isPlugin(node);
//         }, function (node) {
//
//             const data = node.data || {};
//
//             Object.assign(data, {
//                 props: {
//                     code: node.value
//                 }
//             });
//
//             node.tagName = COMPONENT_NAME;
//
//             node.children = [];
//
//             hasComponent = true;
//
//         });
//
//
//         if(!hasComponent ){
//             next();
//             return root;
//         }
//
//         require.ensure([], function(){
//             const component = require('./component');
//             if(component && register){
//                 register(component);
//             }
//             next();
//         }, COMPONENT_NAME);
//
//         // const component = await import(
//         //     /* webpackChunkName: "vremark-component-flowchart" */
//         //     './component');
//         //
//         // if(register){
//         //     register(component.default || component);
//         // }
//
//
//
//     };
//
// }
//
// module.exports = plugin;