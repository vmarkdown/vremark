const Vue = ((Module)=>Module.default||Module)(require('vue'));

const PLUGIN_NAME = 'vremark-g2';

function isPlugin(node) {
    return node.lang && node.lang === 'g2';
}

module.exports = function plugin(options = {}) {

    return async function transformer(root, file, next) {

        let needLoadPlugin = false;

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};

                //key Duplicate keys (hash + num)
                node.data.key = node.hashid; // || createKey(node);

                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });
                node.component = PLUGIN_NAME;
                node.type = 'component';

                needLoadPlugin = true;
            }
        }


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
            /* webpackChunkName: "vremark-g2.plugin" */
            /* webpackMode: "lazy" */
            './src/'+PLUGIN_NAME
        );
        module = module.default || module;

        Vue.component(PLUGIN_NAME, module);

        next();

    };

};