'use strict';

var slug = require('remark-slug');
var util = require('./lib/index');

module.exports = toc;

var DEFAULT_HEADING = 'toc|table[ -]of[ -]contents?';

function toc(options) {

    var self = this;

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

        var toc = result.toc;
        toc.properties = toc.properties?toc.properties:{};
        toc.properties.className = 'vremark-toc';
        toc.children = [ result.map ];
        toc.tagName = 'div';

        // self.data('toc', toc);
    }
}
