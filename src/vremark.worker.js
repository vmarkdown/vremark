// const parse = require('./core/parse');
const parse = require('vremark-parse');
const unified = require('unified');
const processor = unified().use(parse);
const registerPromiseWorker = require('promise-worker/register');

async function run(markdown, options) {
    const mdast = processor.parse(markdown);
    const hast = await processor.run(mdast);
    return {mdast, hast};
}

registerPromiseWorker(function (message) {
    console.time('parse');
    // const r = parse(message.markdown || '', message.options || {});
    const r = run(message.markdown || '', message.options || {});
    console.timeEnd('parse');
    return r;
});