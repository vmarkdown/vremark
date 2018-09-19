'use strict';

var slug = require('remark-slug');
// var util = require('mdast-util-toc');
var util = require('./lib/index');

module.exports = toc;

var DEFAULT_HEADING = 'toc|table[ -]of[ -]contents?';

function toc(options) {


    console.dir(options);

    var settings = options || {};
    var heading = settings.heading || DEFAULT_HEADING;
    var depth = settings.maxDepth || 6;
    var tight = settings.tight;

    this.use(slug);

    return transformer;

    /* Adds an example section based on a valid example
     * JavaScript document to a `Usage` section. */
    function transformer(node) {
        var result = util(node, {
            heading: heading,
            maxDepth: depth,
            tight: tight
        });

        if (result.index === null || result.index === -1 || !result.map || !result.toc) {
            return;
        }

        // console.log(result);

        // result.toc.type = '';
        var toc = result.toc;
        toc.props = toc.props?toc.props:{};
        toc.props.className = 'vremark-toc';
        toc.children = [ result.map ];

        /* Replace markdown. */
        // node.children = [].concat(
        //   node.children.slice(0, result.index),
        //   result.map,
        //   node.children.slice(result.endIndex)
        // );
        // debugger


    }
}
