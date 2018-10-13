const CodeMirrorEditor = require('../assets/vmarkdown-codemirror-editor');
const editor = new CodeMirrorEditor(document.getElementById('editor'), {

});

editor.setValue(
`# h1

----------


- 1
- 2
- 3

| Month    | Assignee | Backup |
| -------- | -------- | ------ |
| January  | Dave     | Steve  |
| February | Gregg    | Karen  |
| March    | Diane    | Jorge  |


\`\`\` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
\`\`\`

> Use block quotes to emulate reply text.
> This line is part of the same quote.



`);



module.exports = editor;