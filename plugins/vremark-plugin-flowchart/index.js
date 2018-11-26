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

        if( node.children && node.children[0]
            && node.children[0].children
            && node.children[0].children[0].value) {
            Object.assign(props, {
                code: node.children[0].children[0].value
            });
        }
        // if(node.value){
        //     Object.assign(props, {
        //         code: node.value
        //     });
        // }
        // else{
        //     Object.assign(props, {
        //         code: node.children[0].children[0].value
        //     });
        // }

        data.props = props;
        node.data = data;
        node.type = 'component';
        node.component = Plugin.COMPONENT_NAME;
        node.children = [];
    }

    static async getComponent() {
        return await import(
            /* webpackChunkName: "vremark-component-flowchart" */
            './component');
    }

}

Plugin.PLUGIN_NAME    = 'vremark-plugin-flowchart';
Plugin.COMPONENT_NAME = 'vremark-component-flowchart';

module.exports = Plugin;