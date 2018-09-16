(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vremarkPluginKatex"));
	else if(typeof define === 'function' && define.amd)
		define(["vremarkPluginKatex"], factory);
	else if(typeof exports === 'object')
		exports["main"] = factory(require("vremarkPluginKatex"));
	else
		root["main"] = factory(root["vremarkPluginKatex"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__) {
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

// console.log(vremark);

const md = __webpack_require__(1);

const vremarkPluginKatex = __webpack_require__(2);

const processor = vremark({h: React.createElement})
    .use(vremarkPluginKatex);

const file = processor.processSync(md);
const vdom = file.contents;

ReactDOM.render(
    vdom,
    document.getElementById('app')
);

// console.time('parse');

// const processor = vremark({}).use(vremarkPluginVdom, {
//     h: React.createElement
// });


// const file = processor.processSync(md);
//
// console.timeEnd('parse');
//
// const ast = processor.parse(md);
// console.log(ast);
//
// console.log(file);
//
// const vdom = file.contents;
//


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "# Dillinger\n\n[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n\nDillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\n\n  - Type some Markdown on the left\n  - See HTML in the right\n  - Magic\n\n# New Features!\n\n  - Import a HTML file and watch it magically convert to Markdown\n  - Drag and drop images (requires your Dropbox account be linked)\n\n\nYou can also:\n  - Import and save files from GitHub, Dropbox, Google Drive and One Drive\n  - Drag and drop markdown and HTML files into Dillinger\n  - Export documents as Markdown, HTML and PDF\n\nMarkdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nThis text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.\n\n### Tech\n\nDillinger uses a number of open source projects to work properly:\n\n* [AngularJS] - HTML enhanced for web apps!\n* [Ace Editor] - awesome web-based text editor\n* [markdown-it] - Markdown parser done right. Fast and easy to extend.\n* [Twitter Bootstrap] - great UI boilerplate for modern web apps\n* [node.js] - evented I/O for the backend\n* [Express] - fast node.js network app framework [@tjholowaychuk]\n* [Gulp] - the streaming build system\n* [Breakdance](http://breakdance.io) - HTML to Markdown converter\n* [jQuery] - duh\n\nAnd of course Dillinger itself is open source with a [public repository][dill]\n on GitHub.\n\n### Installation\n\nDillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n\nInstall the dependencies and devDependencies and start the server.\n\n```sh\n$ cd dillinger\n$ npm install -d\n$ node app\n```\n\nFor production environments...\n\n```sh\n$ npm install --production\n$ NODE_ENV=production node app\n```\n\n### Plugins\n\nDillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.\n\n| Plugin | README |\n| ------ | ------ |\n| Dropbox | [plugins/dropbox/README.md][PlDb] |\n| Github | [plugins/github/README.md][PlGh] |\n| Google Drive | [plugins/googledrive/README.md][PlGd] |\n| OneDrive | [plugins/onedrive/README.md][PlOd] |\n| Medium | [plugins/medium/README.md][PlMe] |\n| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |\n\n\n### Development\n\nWant to contribute? Great!\n\nDillinger uses Gulp + Webpack for fast developing.\nMake a change in your file and instantanously see your updates!\n\nOpen your favorite Terminal and run these commands.\n\nFirst Tab:\n```sh\n$ node app\n```\n\nSecond Tab:\n```sh\n$ gulp watch\n```\n\n(optional) Third:\n```sh\n$ karma test\n```\n#### Building for source\nFor production release:\n```sh\n$ gulp build --prod\n```\nGenerating pre-built zip archives for distribution:\n```sh\n$ gulp build dist --prod\n```\n### Docker\nDillinger is very easy to install and deploy in a Docker container.\n\nBy default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.\n\n```sh\ncd dillinger\ndocker build -t joemccann/dillinger:${package.json.version}\n```\nThis will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.\n\nOnce done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):\n\n```sh\ndocker run -d -p 8000:8080 --restart=\"always\" <youruser>/dillinger:${package.json.version}\n```\n\nVerify the deployment by navigating to your server address in your preferred browser.\n\n```sh\n127.0.0.1:8000\n```\n\n#### Kubernetes + Google Cloud\n\nSee [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)\n\n\n### Todos\n\n - Write MORE Tests\n - Add Night Mode\n\nLicense\n----\n\nMIT\n\n\n**Free Software, Hell Yeah!**\n\n[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)\n\n\n   [dill]: <https://github.com/joemccann/dillinger>\n   [git-repo-url]: <https://github.com/joemccann/dillinger.git>\n   [john gruber]: <http://daringfireball.net>\n   [df1]: <http://daringfireball.net/projects/markdown/>\n   [markdown-it]: <https://github.com/markdown-it/markdown-it>\n   [Ace Editor]: <http://ace.ajax.org>\n   [node.js]: <http://nodejs.org>\n   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>\n   [jQuery]: <http://jquery.com>\n   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>\n   [express]: <http://expressjs.com>\n   [AngularJS]: <http://angularjs.org>\n   [Gulp]: <http://gulpjs.com>\n\n   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>\n   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>\n   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>\n   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>\n   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>\n   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>\n"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ })
/******/ ]);
});