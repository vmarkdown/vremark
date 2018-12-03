const xtend = require('xtend');

const COMPONENT_NAME = 'vremark-component-flowchart';

function test(node) {
    return node.lang &&
        (
            node.lang === 'flow' || node.lang === 'flowchart'
        )
        && node.tagName === "pre" && node.type === "element";
}

function process(node) {
    const data = node.data || {};
    const props = data.props || {};

    if( node.children && node.children[0]
        && node.children[0].children
        && node.children[0].children[0].value) {
        Object.assign(props, {
            code: node.children[0].children[0].value
        });
    }

    data.props = props;
    node.data = data;
    node.type = 'component';
    node.component = COMPONENT_NAME;
    node.children = [];
}

module.exports = function plugin(options = {}) {

    const settings = xtend(options, this.data('settings'));
    const register = settings.register;

    return async function transformer(root, file, next) {

        var isLoadPlugin = false;

        var children = root.children;

        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if(test(node)){
                isLoadPlugin = true;
                process(node);
            }
        }


        if(!isLoadPlugin){
            next();
        }

        const component = await import(
            /* webpackChunkName: "vremark-component-flowchart" */
        './component');

        if(register){
            register(component.default || component);
        }

        next();



    };
};
