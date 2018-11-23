const markdown = require('vremark-parse');
const stringify = require('./lib/vrehype-stringify');
const unified = require('unified');
const processor = unified().use(markdown).use(stringify).freeze();

module.exports = async function parse(text, options) {
    console.time('parse');
    const file = await processor().data('settings', options).process(text);
    console.timeEnd('parse');
    // return file;
    return file.contents;
};
