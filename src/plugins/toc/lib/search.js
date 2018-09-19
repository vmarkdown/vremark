/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = search;

/* Dependencies */
var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();
var isClosingHeading = require('./is-closing-heading');
var isOpeningHeading = require('./is-opening-heading');

/* Constants. */
var HEADING = 'heading';

/**
 * Search a node for a location.
 *
 * @param {Node} root - Parent to search in.
 * @param {RegExp} expression - Heading-content to search
 *   for.
 * @param {number} maxDepth - Maximum-depth to include.
 * @return {Object} - Results.
 */
function search(root, expression, maxDepth) {
    var length = root.children.length;
    var depth = null;
    var lookingForToc = expression !== null;
    var map = [];
    var headingIndex;
    var closingIndex;

    if (!lookingForToc) {
        headingIndex = -1;
    }

    slugs.reset();


    function parse(child, index, parent) {
        var value = toString(child);
        var id =
            child.data && child.data.hProperties && child.data.hProperties.id;
        id = slugs.slug(id || value);

        if ( child.identifier !== 'toc' && parent !== root) {
            return;
        }


        if (lookingForToc) {
            if (isOpeningHeading(child, depth, expression)) {

                closingIndex = index;
                lookingForToc = false;

                headingIndex = index + 1;
                depth = child.depth;
            }
        }

        if (!lookingForToc && value && child.depth <= maxDepth) {
            map.push({
                depth: child.depth,
                value: value,
                id: id
            });

            child.props = child.props?child.props:{};
            child.props.id = id;
        }
    }

    var tocNode = null;
    var nodes = [];

    visit(root, 'linkReference', function (child, index, parent) {
        // nodes.push([child, index, parent]);
        if(child.identifier === 'toc'){
            tocNode = [child, index, parent];
        }
    });

    if(tocNode){

        visit(root, HEADING, function(child, index, parent) {
            nodes.push([child, index, parent]);
        });

        if(tocNode){
            parse.apply(this, tocNode);
            nodes.forEach(function (item) {
                parse.apply(this, item);
            });
        }

    }








    if (headingIndex && !closingIndex) {
        closingIndex = length + 1;
    }

    if (headingIndex === undefined) {
        headingIndex = -1;
        closingIndex = -1;
        map = [];
    }


    return {
        index: headingIndex,
        endIndex: closingIndex,
        map: map,
        toc: tocNode?tocNode[2]:null
    };
}
