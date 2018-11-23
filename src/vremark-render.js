const unified = require('unified');
const render = require('vremark-render');
const plugins = require('../packages/vremark-plugins');
const processor = unified().use(plugins).use(render).freeze();

module.exports = async function render(hast, options) {
    console.time('render');
    const file = await processor().data('settings', options).process(hast);
    console.timeEnd('render');
    return file.contents;
};
