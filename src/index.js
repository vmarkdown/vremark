const parse = require('./core/parse');
const render = require('./core/render');

async function vremark(markdown, options) {

}

vremark.parse = parse;
vremark.render = render;

module.exports = vremark;

