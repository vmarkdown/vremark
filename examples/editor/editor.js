const CodeMirrorEditor = require('../assets/vmarkdown-codemirror-editor');
const editor = new CodeMirrorEditor(document.getElementById('editor'), {

});

editor.setValue(
    `# h1

hello[^hello]  
hello[^hello]  

这是一个链接到谷歌的[^脚注]。

[^脚注]: http://www.google.com
[^hello]: hello
`);



module.exports = editor;