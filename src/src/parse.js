const createProcessor = require('./create-processor.js');
const data = require('./data.js');

async function parse(markdown, option) {

    const processor = createProcessor(option);

    const mdast = processor.parse(markdown);

    const hast = await processor.run(mdast);

    data(hast, option);

    const components = mdast.components || {};

    return {mdast, hast, components};
}

module.exports = parse;

