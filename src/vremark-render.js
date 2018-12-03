const unified = require('unified');
const vremarkRender = require('vremark-render');
// const plugins = require('../packages/vremark-plugins');
// const processor = unified().use(plugins).use(render).freeze();
module.exports = async function render(hast, plugins, options) {
    console.time('render');
    // const file = await processor().data('settings', options).process(hast);
    // if( arguments.length === 2) {
    //     options = plugins;
    //     plugins = [];
    // }
    const file = await unified().use(plugins).use(vremarkRender).data('settings', options).process(hast);
    console.timeEnd('render');
    return file.contents;
};
