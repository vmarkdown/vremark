const xtend = require('xtend');
const visitChildren = require('unist-util-visit-children');
const COMPONENT_NAME = 'vremark-component-flowchart';
const SETTINGS_NAME = 'flowchart';

function test(node) {
    return node.lang &&
        (
            node.lang === 'flow' || node.lang === 'flowchart'
        )
        && node.tagName === "pre" && node.type === "element";
}

async function loadComponent() {
    // const component = await import(
    //     /* webpackChunkName: "vremark-component-flowchart" */
    //     './component');
    // return component;

    // require.ensure([], function () {
    //     const component = require('./component');
    //     return component;
    // }, COMPONENT_NAME);

    return await import(
        /* webpackChunkName: "vremark-component-flowchart" */
        './component');
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

async function main(root, file, settings) {
    var isLoadComponent = false;

    visitChildren(function (node) {
        if(!test(node)){
            return;
        }
        isLoadComponent = true;
        process(node);
    })(root);

    const register = settings.register;

    if(isLoadComponent){
        const component = await loadComponent();
        if(register){
            register(component.default || component);
        }
    }
}

module.exports = function plugin(options = {}) {

    const settings = xtend(options, this.data('settings'));

    return async function transformer(root, file, next) {

        if(!settings.hasOwnProperty(SETTINGS_NAME) || !settings[SETTINGS_NAME] ) {
            next();
            return root;
        }

        try {
            await main(root, file, settings);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            next();
        }
    };

};
