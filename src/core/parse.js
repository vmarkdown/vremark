const createProcessor = require('./create-processor.js');
const data = require('./data.js');

function detect() {

}

async function parse(markdown, option) {

    const processor = createProcessor(option);

    const mdast = processor.parse(markdown);

    data.parse(mdast, option);

    const hast = await processor.run(mdast);

    data.run(hast, option);

    const plugins = mdast.plugins || hast.plugins || {};

    return {mdast, hast, plugins};
}

module.exports = parse;

