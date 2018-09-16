(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vremarkPluginKatex"));
	else if(typeof define === 'function' && define.amd)
		define(["vremarkPluginKatex"], factory);
	else if(typeof exports === 'object')
		exports["example-vue-main"] = factory(require("vremarkPluginKatex"));
	else
		root["example-vue-main"] = factory(root["vremarkPluginKatex"]);
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

const renderer = new Renderer({
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = __webpack_require__(3);

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

function parse(md) {
    const file = processor.processSync(md);
    return file.contents;
}

const app = new Vue({
    el: '#app',
    render(h) {
        renderer.h(h);

        const vdom = parse(__webpack_require__(4));
        console.log(vdom);
        return vdom;


        // var el = h('div',{
        //     'class': {
        //         'markdown-body': true
        //     }
        // },vnodes);
        // //
        // console.log(el);
        //
        // return el
    }
});

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
        'class': [this.options.rootClassName || 'markdown-body']
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
        domProps:{
            "innerHTML": node.renderedValue
        }
    });
};

Renderer.prototype.inlineMath = function(h, node, index, children) {
    return h('span', {
        key: index,
        domProps:{
            "innerHTML": node.renderedValue
        }
    });
};

Renderer.prototype.html = function(h, node, index, children) {
    return h('div', {
        key: index,
        domProps:{
            "innerHTML": node.value
        }
    });
};

Renderer.prototype.code = function(h, node, index, children) {
    return h('pre', {
        key: index
    }, [
        h('code', {
            'class': [node.lang?'language-'+node.lang:'']
        }, node.value)
    ]);
};

Renderer.prototype.blockquote = function(h, node, index, children) {
    return h('blockquote', {
        key: index
    }, children);
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
        attrs: {
            type: 'checkbox',
            checked: node.checked,
            disabled: true
        }
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
        [h('tbody',{key:0}, children)]
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
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.linkReference = function(h, node, index, children) {
    return h('a', {
        key: index,
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.definition = function(h, node, index, children) {
    return h('div', {
            key: index,
            style: {
                // height: 0,
                // visibility: 'hidden'
                'word-break': 'break-all'
            }
        },[
            h('a', {
                key: 0,
                attrs: {
                    target: '_blank',
                    href: node.url,
                    'data-identifier': node.identifier
                }
            }, [
                '['+node.identifier+']: ',
                node.url
            ])
        ]
    );
};

Renderer.prototype.image = function(h, node, index, children) {
    return h('img', {
        key: index,
        attrs: {
            src: node.url,
            alt: node.alt,
            title: node.title
        }
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

module.exports = "# 欢迎使用马克飞象\n\n\n----------\n\n----------\n\n\n@(示例笔记本)[马克飞象|帮助|Markdown]\n\n**马克飞象**是一款专为印象笔记（Evernote）打造的Markdown编辑器，通过精心的设计与技术实现，配合印象笔记强大的存储和同步功能，带来前所未有的书写体验。特点概述：\n\n- **功能丰富** ：支持高亮代码块、*LaTeX* 公式、流程图，本地图片以及附件上传，甚至截图粘贴，工作学习好帮手；\n- **得心应手** ：简洁高效的编辑器，提供[桌面客户端][1]以及[离线Chrome App][2]，支持移动端 Web；\n- **深度整合** ：支持选择笔记本和添加标签，支持从印象笔记跳转编辑，轻松管理。\n\n-------------------\n\n[TOC]\n\n## Markdown简介\n\n> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)\n\n正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.example.com)或一个脚注[^demo]。下面列举了几个高级功能，更多语法请按`Cmd + /`查看帮助。\n\n### 代码块\n``` python\n@requires_authorization\ndef somefunc(param1='', param2=0):\n    '''A docstring'''\n    if param1 > param2: # interesting\n        print 'Greater'\n    return (param2 - param1 + 1) or None\nclass SomeClass:\n    pass\n>>> message = '''interpreter\n... prompt'''\n```\n### LaTeX 公式\n\n可以创建行内公式，例如 $\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$。或者块级公式：\n\n$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$\n\n$$\n% \\f is defined as f(#1) using the macro\n\\f{x} = \\int_{-\\infty}^\\infty\n    \\hat \\f\\xi\\,e^{2 \\pi i \\xi x}\n    \\,d\\xi\n$$\n\n\n### 表格\n| Item      |    Value | Qty  |\n| :-------- | --------:| :--: |\n| Computer  | 1600 USD |  5   |\n| Phone     |   12 USD |  12  |\n| Pipe      |    1 USD | 234  |\n\n### 流程图\n```flow\nst=>start: Start\ne=>end\nop=>operation: My Operation\ncond=>condition: Yes or No?\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n\n以及时序图:\n\n```sequence\nAlice->Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->Alice: I am good thanks!\n```\n\n> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。\n\n### 复选框\n\n使用 `- [ ]` 和 `- [x]` 语法可以创建复选框，实现 todo-list 等功能。例如：\n\n- [x] 已完成事项\n- [ ] 待办事项1\n- [ ] 待办事项2\n\n> **注意：**目前支持尚不完全，在印象笔记中勾选复选框是无效、不能同步的，所以必须在**马克飞象**中修改 Markdown 原文才可生效。下个版本将会全面支持。\n\n\n## 印象笔记相关\n\n### 笔记本和标签\n**马克飞象**增加了`@(笔记本)[标签A|标签B]`语法, 以选择笔记本和添加标签。 **绑定账号后**， 输入`(`自动会出现笔记本列表，请从中选择。\n\n### 笔记标题\n**马克飞象**会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 `欢迎使用马克飞象`。\n\n### 快捷编辑\n保存在印象笔记中的笔记，右上角会有一个红色的编辑按钮，点击后会回到**马克飞象**中打开并编辑该笔记。\n>**注意：**目前用户在印象笔记中单方面做的任何修改，马克飞象是无法自动感知和更新的。所以请务必回到马克飞象编辑。\n\n### 数据同步\n**马克飞象**通过**将Markdown原文以隐藏内容保存在笔记中**的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对印象笔记 API调用和数据转换之用。\n\n >**隐私声明：用户所有的笔记数据，均保存在印象笔记中。马克飞象不存储用户的任何笔记数据。**\n\n### 离线存储\n**马克飞象**使用浏览器离线存储将内容实时保存在本地，不必担心网络断掉或浏览器崩溃。为了节省空间和避免冲突，已同步至印象笔记并且不再修改的笔记将删除部分本地缓存，不过依然可以随时通过`文档管理`打开。\n\n> **注意：**虽然浏览器存储大部分时候都比较可靠，但印象笔记作为专业云存储，更值得信赖。以防万一，**请务必经常及时同步到印象笔记**。\n\n## 编辑器相关\n### 设置\n右侧系统菜单（快捷键`Cmd + M`）的`设置`中，提供了界面字体、字号、自定义CSS、vim/emacs 键盘模式等高级选项。\n\n### 快捷键\n\n帮助    `Cmd + /`\n同步文档    `Cmd + S`\n创建文档    `Cmd + Opt + N`\n最大化编辑器    `Cmd + Enter`\n预览文档 `Cmd + Opt + Enter`\n文档管理    `Cmd + O`\n系统菜单    `Cmd + M`\n\n加粗    `Cmd + B`\n插入图片    `Cmd + G`\n插入链接    `Cmd + L`\n提升标题    `Cmd + H`\n\n## 关于收费\n\n**马克飞象**为新用户提供 10 天的试用期，试用期过后需要[续费](maxiang.info/vip.html)才能继续使用。未购买或者未及时续费，将不能同步新的笔记。之前保存过的笔记依然可以编辑。\n\n\n## 反馈与建议\n- 微博：[@马克飞象](http://weibo.com/u/2788354117)，[@GGock](http://weibo.com/ggock \"开发者个人账号\")\n- 邮箱：<hustgock@gmail.com>\n\n---------\n感谢阅读这份帮助文档。请点击右上角，绑定印象笔记账号，开启全新的记录与分享体验吧。\n\n\n\n\n[^demo]: 这是一个示例脚注。请查阅 [MultiMarkdown 文档](https://github.com/fletcher/MultiMarkdown/wiki/MultiMarkdown-Syntax-Guide#footnotes) 关于脚注的说明。 **限制：** 印象笔记的笔记内容使用 [ENML][5] 格式，基于 HTML，但是不支持某些标签和属性，例如id，这就导致`脚注`和`TOC`无法正常点击。\n\n\n  [1]: http://maxiang.info/client_zh\n  [2]: https://chrome.google.com/webstore/detail/kidnkfckhbdkfgbicccmdggmpgogehop\n  [3]: http://adrai.github.io/flowchart.js/\n  [4]: http://bramp.github.io/js-sequence-diagrams/\n  [5]: https://dev.yinxiang.com/doc/articles/enml.php\n\n"

/***/ })
/******/ ]);
});