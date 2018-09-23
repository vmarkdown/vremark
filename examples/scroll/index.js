const vremark = require('../../src/index');
const renderer = require('remark-preact-renderer');
const { h, render } = preact;

const processor = vremark()
    .data({
        'settings': {
            'h': h,
            'renderer': renderer,
            'rootClassName': 'markdown-body'
        }
    });

const mdText = require('../md/large.md');

console.time('parse');
const file = processor.processSync(mdText);
console.timeEnd('parse');

const vdom = file.contents;
console.log(vdom);

console.time('render');
render(vdom, document.getElementById('preview'));

console.timeEnd('render');





///////////////////=================================


function getLines (text) {
    var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

function buildMarkdownCode() {

    var mds = getLines(mdText);

    var codes = mds.map(function (md, i) {
        var line = $('<div></div>');
        var index = i+1;
        line.attr('data-line', index);
        line.html(index+' '+md);
        return line;
    });

    codes.forEach(function (code) {
        $('#markdown').append(code);
    });


    // $('#markdown').innerHTML = '';

}

buildMarkdownCode();






function findFirstLine(lines, top) {
    var offsetTop = 50;
    top = top + offsetTop;
    for(var i=0;i<lines.length-1;i++) {
        if(top>lines[i].top && top<=lines[i+1].top){
            return lines[i];
        }
    }
    return null;
}

function buildPostionMap() {
    var lines = [];

    var containerPosition = $('.markdown-body').position();

    $('.markdown-body').children().each(function (i, node) {
        //console.log($(node).position());
        var nodePosition = $(node).position();

        var top = nodePosition.top - containerPosition.top;
        // var top = $(node).offset().top;
        var line = $(node).data('line');
        lines.push({
            top: top,
            line: line
        });
    });
    return lines;
}

console.time('position');
var lines = buildPostionMap();
console.timeEnd('position');
console.log(lines);

function activeLine(top){
    var line = findFirstLine(lines, top);
    console.log(line);
    if(!line) {
        return;
    }
    $('#preview .line-active').removeClass('line-active');

    var visibeLine = line.line;
    $('#preview [data-line='+(visibeLine)+']').addClass('line-active');






    $('#markdown .line-active').removeClass('line-active');
    $('#markdown [data-line='+(visibeLine)+']').addClass('line-active');


    $('#markdown [data-line='+(visibeLine)+']')[0].scrollIntoView();





}
// activeLine(1);

var markdownContainer = $('#preview .markdown-body');
var markdownContainerPosition = $('#preview .markdown-body').position();

$('#preview').scroll(function () {

    var containerPosition = markdownContainer.position();

    var scrollDistance = markdownContainerPosition.top - containerPosition.top;
    console.log(scrollDistance);


    // var top = $('#preview').scrollTop();
    // var containerTop = $('#preview .markdown-body').position().top;
    // console.log(top, containerTop);
    activeLine(scrollDistance);
});


/*
var lines = [];

$('.wysiwyg').children().each(function (i, node) {

    console.log(node);
    console.log();

    var top = $(node).offset().top;
    var line = $(node).data('line');
    lines.push({
        top: top,
        line: line
    });

});





$(window).scroll(function () {

    var top = $(window).scrollTop();

    console.log(top);
    console.log(findLine(top));
});*/