module.exports =
/******/ (function(modules) { // webpackBootstrap
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

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(2);

module.exports = function toDom(node, options) {
    var parser = new Parser(options);
    return parser.parse(node);
};

// module.exports = function plugin(options) {
//     var parser = new Parser(options);
//     var self = this;
//     return function toVdom(root) {
//         var h = self.data('h');
//         if(h) {parser.h = h;}
//         return parser.parse(root);
//     }
// };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// var renderer = require('./rehype-vue-renderer.js');
var mode = __webpack_require__(3);
var renderer = __webpack_require__(4);

function Parser(options) {
    this.options = options || {};
    this.renderer = this.options.renderer;
    this.h = this.options.h;
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        node.index = i;
        node.parent = parent;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, parent) {
    if(!node) return null;
    var children = this.parseNodes(node.children, node);
    var h = this.h;
    // var renderer = this.renderer;
    // var properties = this.options.data?this.options.data(node):node.properties;
    // var properties = mode(node, h, this.options.mode);
    var data = mode(node, h, this.options.mode);
    var properties = data?data(node):{};
    return renderer[node.type].apply(null, [h, node, properties, children, this.options]);
};

Parser.prototype.parse = function(root) {
    try {
        root.properties = root.properties || {};
        root.tagName = this.options.rootTagName?this.options.rootTagName:'div';
        if( this.options.rootClassName ){
            root.properties.className = this.options.rootClassName || '';
        }
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var modes = {

    'vue': {
        test: function (h) {
            return h && h.toString().indexOf('vm') > -1;
        },
        data: function (node) {
            if(!node.properties) return {};
            var props = {
                attrs: node.properties,
            };
            if(node.properties.className) {
                props['class'] = node.properties.className;
                delete props.attrs.className;
            }
            return props;
        }
    },

    'preact': {
        test: function () {
            return false;
        },
        data: function (node) {
            return node.properties;
        }
    }

};

function isFunction(obj){
    return Object.prototype.toString.call(obj)==='object Function';
}

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

module.exports = function (node, h, mode) {

    if(mode) {
        if( isString(mode) && modes.hasOwnProperty(mode) ) {
            return modes[mode].data;
        }

        if( isFunction(mode) ) {
            return mode;
        }
    }

    var list = Object.keys(modes);
    for (var i=0;i<list.length;i++) {
        var item = list[i];
        var _mode = modes[item];
        if( _mode.test(h) ) {
            return _mode.data;
        }
    }

    return null;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {

    root: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    element: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    text: function(h, node) {
        return node.value;
    }

};


/***/ })
/******/ ]);