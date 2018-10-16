'use strict';

var TABLE_NAME = 'hljs-ln',
    LINE_NAME = 'hljs-ln-line',
    CODE_BLOCK_NAME = 'hljs-ln-code',
    NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
    NUMBER_LINE_NAME = 'hljs-ln-n',
    DATA_ATTR_NAME = 'data-line-number',
    BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

function addLineNumbersBlockFor (inputHtml, firstLineIndex) {

    // var html = h.value.split('\n').map(function (line, i) {
    //     return '<div class="hljs-line"><span class="hljs-line-number">'+(i+1)+'</span>'+line+'</div>'
    // }).join('\n');

    firstLineIndex = firstLineIndex?firstLineIndex:0;


    var lines = getLines(inputHtml);

    return lines.map(function (line, i) {
        return '<span class="hljs-line"><span class="hljs-line-number">'+(i+firstLineIndex)+'</span>'+line+'</span>'
    }).join('\n');



    // var lines = getLines(inputHtml);
    //
    // // if last line contains only carriage return remove it
    // if (lines[lines.length-1].trim() === '') {
    //     lines.pop();
    // }
    //
    // if (lines.length > firstLineIndex) {
    //     var html = '';
    //
    //     for (var i = 0, l = lines.length; i < l; i++) {
    //         html += format(
    //             '<tr>\
    //                 <td class="{0}">\
    //                     <div class="{1} {2}" {3}="{5}"></div>\
    //                 </td>\
    //                 <td class="{4}">\
    //                     <div class="{1}">{6}</div>\
    //                 </td>\
    //             </tr>',
    //             [
    //                 NUMBERS_BLOCK_NAME,
    //                 LINE_NAME,
    //                 NUMBER_LINE_NAME,
    //                 DATA_ATTR_NAME,
    //                 CODE_BLOCK_NAME,
    //                 i + 1,
    //                 lines[i].length > 0 ? lines[i] : ' '
    //             ]);
    //     }
    //
    //     return format('<table class="{0}">{1}</table>', [ TABLE_NAME, html ]);
    // }
    //
    // return inputHtml;
}

function getLines (text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

function getLinesCount (text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
}

function format (format, args) {
    return format.replace(/\{(\d+)\}/g, function(m, n){
        return args[n] ? args[n] : m;
    });
}

module.exports = {
    addLineNumbersBlockFor: addLineNumbersBlockFor
};