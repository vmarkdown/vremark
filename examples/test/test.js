var tag = (function () {


    var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
var singleQuoted = '\'[^\']*\'';
var doubleQuoted = '"[^"]*"';
var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing = '<[?].*?[?]>';
var declaration = '<![A-Za-z]+\\s+[^>]*>';
var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');

var tag = new RegExp('^(?:' +
    openTag + '|' +
    closeTag + '|' +
    comment + '|' +
    processing + '|' +
    declaration + '|' +
    cdata +
    ')');

return tag;
}
)();



var value = '<span>=======<i class="fab fa-accessible-icon"></i> <span>  </span>  <span style="color:red;">=======<i class="fab fa-accessible-icon"></i> </span>    <i class="fab fa-accessible-icon"></i>';


function getFirstHTML(value) {


    var subvalue = value.match(tag);

    if(!subvalue) {
        return null;
    }

    subvalue = subvalue[0];
    console.log(subvalue);

    // var tagname = subvalue.match(/^<[A-Za-z][A-Za-z0-9\-]+/);
    // console.log(tagname);

    var tagname = /^<[A-Za-z][A-Za-z0-9\-]+/.exec(subvalue);
    tagname = tagname[0].substring(1);
    // console.log(tagname);

    var closeTag = '</'+tagname+'>';
    console.log(closeTag);

    var closeTagIndex = value.indexOf(closeTag);

    console.log(closeTagIndex);

    if(closeTagIndex > -1){

        subvalue = value.substring(0, closeTagIndex + closeTag.length);

    }
    else{
        // subvalue =
    }

    console.log(subvalue);





}

getFirstHTML(value);
