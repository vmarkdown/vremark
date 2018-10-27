var hljs = require('highlight.js');

var languages = hljs.listLanguages();

// console.log( languages ) ;
var list = [];
languages.forEach(function (name) {
    var language = hljs.getLanguage(name);
    // console.log( name, language.aliases ) ;
    list.push(name);

    if(language.aliases) {
        list = list.concat(language.aliases);
    }

});
console.log( list ) ;


var fs = require('fs');

fs.writeFile('./languages.js', 'module.exports = '+JSON.stringify(list, null, 2)+';' , function(err) {
    if (err) {
        throw err;
    }

    console.log('Saved.');
});
