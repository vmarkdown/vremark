(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vremarkPluginKatex"));
	else if(typeof define === 'function' && define.amd)
		define(["vremarkPluginKatex"], factory);
	else if(typeof exports === 'object')
		exports["example-react-main"] = factory(require("vremarkPluginKatex"));
	else
		root["example-react-main"] = factory(root["vremarkPluginKatex"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Renderer = __webpack_require__(1);

const h = React.createElement;
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = __webpack_require__(3);
// const mdText = require('../md/test.txt');

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

// const previewIframe = document.getElementById('preview');

function parse(md) {
    const file = processor.processSync(md);
    const vdom = file.contents;
    return vdom;
}

class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            md: __webpack_require__(4)
        };
    }

    componentDidMount() {
        // const vdom = parse(mdText);
        // this.setState({
        //     md: '# h1\n##h2 \n'+ new Date().getTime()
        // });
        // this.refresh();
        // setInterval(()=>{
        //     this.refresh();
        // }, 3000);
    }

    refresh() {
        // const vdom = parse('# h1\n##h2 \n'+ new Date().getTime());
        // this.setState({
        //     md: '# h1\n## h2  \n'+ new Date().getTime()
        // });

        const md = '# h1';
        this.setState({
            md: md
        });
    }

    render() {
        const vdom = parse(this.state.md);

        console.log(vdom);

        return vdom;
        // return h('div', {
        //     className: 'preview-container'
        // }, vdom,
        //     h('div',{style:{textAlign:'center'}},[
        //         h('button', {
        //             key: 'div_refresh',
        //             className:'refresh-btn',
        //             onClick: ()=>{
        //                 this.refresh();
        //             }
        //         }, 'refresh'),
        //     ])
        // );
    }
}

// previewIframe.onload = function () {
//     ReactDOM.render(
//         h(Preview),
//         document.getElementById('preview')
//     );
// };

ReactDOM.render(
    h(Preview),
    document.getElementById('preview')
);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Renderer
 */

const Renderer = __webpack_require__(2);

Renderer.prototype.root = function(h, node, index, children) {
    return h('div', {
        key: index,
        className: this.options.rootClassName || 'markdown-body'
    }, children);
};

Renderer.prototype.inlineCode = function(h, node, index, children) {
    return h('code', {
        key: index,
    }, node.value);
};

Renderer.prototype.math = function(h, node, index, children) {
    return h('p', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.renderedValue
        }
    });
};

Renderer.prototype.inlineMath = function(h, node, index, children) {
    return h('span', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.renderedValue
        }
    });
};

Renderer.prototype.code = function(h, node, index, children) {
    return h('pre', {
        key: index
    }, h('code', {
        className: node.lang?'language-'+node.lang:''
    }, node.value));
};

Renderer.prototype.blockquote = function(h, node, index, children) {
    return h('blockquote', {
        key: index
    }, children);
};

Renderer.prototype.html = function(h, node, index, children) {
    return h('div', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    });
};

Renderer.prototype.heading = function(h, node, index, children) {
    return h('h'+node.depth, {
        key: index
    }, children);
};

Renderer.prototype.thematicBreak = function(h, node, index, children) {
    return h('hr', {
        key: index
    });
};

Renderer.prototype.list = function(h, node, index, children) {
    return h(node.ordered?'ol':'ul', {
        key: index
    }, children);
};

Renderer.prototype.listItem = function(h, node, index, children) {
    return h('li', {
        key: index
    }, children);
};

Renderer.prototype.checkbox = function(h, node, index, children) {
    return h('input', {
        key: index,
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    });
};

Renderer.prototype.paragraph = function(h, node, index, children) {
    return h('p', {
        key: index
    }, children);
};

Renderer.prototype.table = function(h, node, index, children) {
    return h('table', {
            key: index
        },
        h('tbody',{key:0}, children)
    );
};

Renderer.prototype.tableRow = function(h, node, index, children) {
    return h('tr', {
        key: index
    }, children);
};

Renderer.prototype.tableCell = function(h, node, index, children) {
    return h('td', {
        key: index,
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(h, node, index, children) {
    return h('strong', {
        key: index
    }, children);
};

Renderer.prototype.emphasis = function(h, node, index, children) {
    return h('em', {
        key: index
    }, children);
};

Renderer.prototype.break = function(h, node, index, children) {
    return h('br', {
        key: index
    });
};

Renderer.prototype.delete = function(h, node, index, children) {
    return h('del', {
        key: index
    }, children);
};

Renderer.prototype.link = function(h, node, index, children) {
    return h('a', {
        key: index,
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.linkReference = function(h, node, index, children) {
    return h('a', {
        key: index,
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.definition = function(h, node, index, children) {
    return h('div', {
            key: index,
            style: {
                height: 0,
                visibility: 'hidden'
            }
        },
        h('a', {
            key: 0,
            href: node.url,
            'data-identifier': node.identifier
        }, [
            '['+node.identifier+']: ',
            node.url
        ])
    );
};

Renderer.prototype.image = function(h, node, index, children) {
    return h('img', {
        key: index,
        src: node.url,
        alt: node.alt,
        title: node.title
    });
};

Renderer.prototype.text = function(h, node, index, children) {
    return h('span', {
        key: index
    }, node.value);
};

module.exports = Renderer;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this._h = options.h;
}

Renderer.prototype.h = function(h) {
    if(h) {
        this._h = h;
    }
    return this._h;
};

Renderer.prototype.root = function(h, node, index, children) {};

Renderer.prototype.inlineCode = function(h, node, index, children) {};

Renderer.prototype.math = function(h, node, index, children) {};

Renderer.prototype.inlineMath = function(h, node, index, children) {};

Renderer.prototype.code = function(h, node, index, children) {};

Renderer.prototype.blockquote = function(h, node, index, children) {};

Renderer.prototype.html = function(h, node, index, children) {};

Renderer.prototype.heading = function(h, node, index, children) {};

Renderer.prototype.thematicBreak = function(h, node, index, children) {};

Renderer.prototype.list = function(h, node, index, children) {};

Renderer.prototype.listItem = function(h, node, index, children) {};

Renderer.prototype.checkbox = function(h, node, index, children) {};

Renderer.prototype.paragraph = function(h, node, index, children) {};

Renderer.prototype.table = function(h, node, index, children) {};

Renderer.prototype.tableRow = function(h, node, index, children) {};

Renderer.prototype.tableCell = function(h, node, index, children) {};

Renderer.prototype.strong = function(h, node, index, children) {};

Renderer.prototype.emphasis = function(h, node, index, children) {};

Renderer.prototype.break = function(h, node, index, children) {};

Renderer.prototype.delete = function(h, node, index, children) {};

Renderer.prototype.link = function(h, node, index, children) {};

Renderer.prototype.linkReference = function(h, node, index, children) {};

Renderer.prototype.definition = function(h, node, index, children) {};

Renderer.prototype.image = function(h, node, index, children) {};

Renderer.prototype.text = function(h, node, index, children) {};

module.exports = Renderer;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "# Alpha\n\n-------\n\n\n## TOC\n\n\n## Bravo\n\n### Charlie\n\n## Delta\n\n\n-------\n\n\n\n"

/***/ })
/******/ ]);
});