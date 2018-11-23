const unified = require('unified');
const render = require('vremark-render');
const processor = unified().use(render).freeze();

module.exports = async function render(hast, options) {
    const file = await processor().data('settings', options).process(hast);
    return file.contents;
};
