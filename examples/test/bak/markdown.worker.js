const vremark = require('../../src/index');
const registerPromiseWorker = require('promise-worker/register');


function parse(markdown, options) {
    return vremark.parse(markdown, options);
}

registerPromiseWorker(function (message) {
    return parse(message.markdown, message.options);
});












// registerPromiseWorker(function (message) {
//     return 'pong';
// });



// function run(mdast, options) {
//     return vremark.run(mdast, options);
// }
//
// registerPromiseWorker(function (message) {
//     if (message.type === 'parse') {
//         return parse(message.data.markdown, message.data.options);
//     } else if (message.type === 'run') {
//         return run(message.data.mdast, message.data.options);
//     }
//     return null;
// });












// function sendMessage(id, data) {
//     self.postMessage({
//         id: id,
//         data: data
//     });
// }
//
// self.addEventListener('message', function (e) {
//     const data = e.data;
//     console.log(data);
//
//     const id = data.id;
//     var markdown = data.markdown;
//     const mdast = vremark.parse(markdown);
//     sendMessage(id, mdast);
// });