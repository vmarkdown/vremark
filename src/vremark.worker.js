const registerPromiseWorker = require('promise-worker/register');
const parse = require('./vremark-parse');
registerPromiseWorker(function (message) {
     return parse(message.markdown || '', message.options || {});
});