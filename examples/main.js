const md = require('./md/test.txt');

const vremarkPluginKatex = require('vremark-plugin-katex');

const processor = vremark({h: React.createElement})
    .use(vremarkPluginKatex);

const file = processor.processSync(md);
const vdom = file.contents;

const previewIframe = document.getElementById('preview');

previewIframe.onload = function () {

    ReactDOM.render(
        vdom,
        previewIframe.contentDocument.body
    );

};

