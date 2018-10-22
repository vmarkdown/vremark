const vremark = require('./index');
const registerPromiseWorker = require('promise-worker/register');


function parse(markdown, options) {
    console.time('parse');
    var r = vremark.parse(markdown, options);
    console.timeEnd('parse');
    return r;
}

registerPromiseWorker(function (message) {
    return parse(message.markdown, message.options);
});
