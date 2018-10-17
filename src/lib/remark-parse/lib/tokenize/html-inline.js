'use strict';

var alphabetical = require('is-alphabetical');
var locate = require('../locate/tag');
var tag = require('../util/html').tag;

module.exports = inlineHTML;
inlineHTML.locator = locate;

var EXPRESSION_HTML_LINK_OPEN = /^<a /i;
var EXPRESSION_HTML_LINK_CLOSE = /^<\/a>/i;

function inlineHTML(eat, value, silent) {
    var self = this;
    var length = value.length;
    var character;
    var subvalue;

    if (value.charAt(0) !== '<' || length < 3) {
        return;
    }

    character = value.charAt(1);

    if (
        !alphabetical(character) &&
        character !== '?' &&
        character !== '!' &&
        character !== '/'
    ) {
        return;
    }

    subvalue = value.match(tag);

    if (!subvalue) {
        return;
    }

    /* istanbul ignore if - not used yet. */
    if (silent) {
        return true;
    }

    subvalue = subvalue[0];

    // old start
    // old end
    // new start
    var lastCloseTag = value.lastIndexOf('>');
    if(lastCloseTag > -1 && lastCloseTag+1 > subvalue.length ) {
        subvalue = value.substring(0, lastCloseTag + 1)
    }
    // new end


    if (!self.inLink && EXPRESSION_HTML_LINK_OPEN.test(subvalue)) {
        self.inLink = true;
    } else if (self.inLink && EXPRESSION_HTML_LINK_CLOSE.test(subvalue)) {
        self.inLink = false;
    }

    return eat(subvalue)({type: 'html', value: subvalue});
}
