/*
const { h, render, Component } = preact;
const processor = require('./processor');


class MarkownPreview extends Component {

    constructor() {
        super();
        this.state.markdown = '';
    }

    render({}, {markdown}) {
        console.time('parse');
        const file = processor.processSync(markdown);
        const vdom = file.contents;
        console.log('vdom====================');
        console.log(vdom);
        console.timeEnd('parse');
        return vdom;
    }
}

function setValue() {
    const value = editor.getValue();
    preview.setState({
        markdown: value
    });
}

const preview = render(h(MarkownPreview, {
}), document.getElementById('preview'))._component;


const editor = new CodeMirrorEditor(document.getElementById('editor'), {

});

// editor.on("change",  function () {
//     setValue();
// });
// setValue();

*/

// const { h, render, Component } = preact;


const h = React.createElement;

var dom0 = h('div',{className: "markdown-body",key: 0},[
    h('h3',{key: 0},[
        h('span',{key: 0}, "======0-=90-=90-=90-=90-=90-=90-=2341")
    ]),
    h('div',{
        key: 1,
        dangerouslySetInnerHTML:{
            __html: `<pre class="highlight-code highlight-code-line-numbers"><code class="hljs hljs-dark python"><span class="hljs-meta">@requires_authorization</span>↵<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">''</span>, param2=<span class="hljs-number">0</span>)</span>:</span>↵    <span class="hljs-string">'''A docstring'''</span>↵    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>↵<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>↵    <span class="hljs-keyword">pass</span>↵<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">'''interpreter↵↵<span class="hljs-meta">... </span>prompt'''</span>===<span class="hljs-number">234</span></code></pre>`
        }
    })
]);

var dom1 = h('div',{className: "markdown-body",key: 0},[
    h('h3',{key: 0},[
        h('span',{key: 0}, "======0-=90-=90-=90-=90-=90-=90-=2341")
    ]),
    h('p',{key: 1},[
        h('span',{key: 0}, "1")
    ]),
    h('div',{
        key: 2,
        dangerouslySetInnerHTML:{
            __html: `<pre class="highlight-code highlight-code-line-numbers"><code class="hljs hljs-dark python"><span class="hljs-meta">@requires_authorization</span>↵<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">''</span>, param2=<span class="hljs-number">0</span>)</span>:</span>↵    <span class="hljs-string">'''A docstring'''</span>↵    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>↵<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>↵    <span class="hljs-keyword">pass</span>↵<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">'''interpreter↵↵<span class="hljs-meta">... </span>prompt'''</span>===<span class="hljs-number">234</span></code></pre>`
        }
    })
]);

class Preview extends React.Component {

    constructor() {
        super();
        this.state = {
            vdom: dom0
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                vdom: dom1
            });
        }, 3000);
    }

    render() {
        return this.state.vdom;
    }
}

ReactDOM.render(
    h(Preview),
    document.getElementById('preview')
);

// render(h(Preview), document.getElementById('preview'));
