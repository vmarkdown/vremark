var visit = require('unist-util-visit');
const util = require('vremark-util');

const Vue = ((Module)=>Module.default||Module)(require('vue'));

const PLUGIN_NAME = 'vremark-math';

function isPlugin(node) {
    return (node.type === 'math' || node.type === 'inlineMath' )
}

module.exports = function plugin(options = {}) {

    return async function transformer(root, file, next) {

        let needLoadPlugin = false;

        visit(root, function (node) {
            return isPlugin(node);
        }, function (node) {

            node.data = node.data || {};
            // node.data.key = node.hash || util.createKey(node);

            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                inline: (node.type === "inlineMath"),
                code: node.value
            });
            node.component = PLUGIN_NAME;
            node.type = 'component';

            needLoadPlugin = true;
        });

        if(!needLoadPlugin) {
            next();
            return;
        }

        let component = Vue.component(PLUGIN_NAME);

        if(component) {
            next();
            return;
        }

        let module = await import(
            /* webpackChunkName: "vremark-math.plugin" */
            /* webpackMode: "lazy" */
            './src/'+PLUGIN_NAME
        );
        module = module.default || module;

        Vue.component(PLUGIN_NAME, module);

        next();

    };

};