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