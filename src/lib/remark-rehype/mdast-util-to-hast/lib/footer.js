'use strict'

module.exports = generateFootnotes

var thematicBreak = require('./handlers/thematic-break')
var list = require('./handlers/list')
var wrap = require('./wrap')

/* Transform all footnote definitions, if any. */
function generateFootnotes(h) {

    var footnotes = h.footnotes
    var length = footnotes.length
    var index = -1
    var listItems = []
    var def

    if (!length) {
        return null
    }

    while (++index < length) {
        def = footnotes[index]

        // if(def.children.length>0 && def.children[0].type === "paragraph") {
        //     // debugger
        //     def.children[0].tagName = 'span';
        // }

        listItems[index] = {
            type: 'listItem',
            data: {hProperties: {id: 'fn-' + def.identifier}},
            children: def.children.concat({
                type: 'link',
                url: '#fnref-' + def.identifier,
                target: '_self',
                data: {hProperties: {className: ['footnote-backref']}},
                children: [{type: 'text', value: '↩'}]
            }),
            position: def.position
        }
    }



    var footnoteList = list(h, {
        type: 'list',
        ordered: true,
        children: listItems
    });

    footnoteList.children && footnoteList.children.forEach(function (listItem) {
        if(listItem.type === "element"
            && listItem.tagName === "li"
            && listItem.children.length > 0 ) {
            var item = listItem.children[0];
            item.tagName = 'span';
        }
    });

    return h(
        null,
        'div',
        {className: ['footnotes']},
        wrap(
            [
                thematicBreak(h),
                footnoteList
            ],
            true
        )
    );


}
