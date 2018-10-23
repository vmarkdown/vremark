const parse = require('./src/parse');
const render = require('./src/render');

async function vremark(markdown, options) {

}

vremark.parse = parse;
vremark.render = render;

module.exports = vremark;

