require('highlight.js/styles/github.css');
var hljs = require('highlight.js');

var Vue = require('vue');

var Component = Vue.extend({
    name: 'highlight',
    props: {
        'lang': {
            type: String,
            required: true
        },
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            result: ''
        }
    },
    render(h) {
        return h('pre', {}, [
            h('code', {
                'class': ['hljs', this.lang],
                domProps:{
                    innerHTML: this.result
                }
            })
        ]);
    },
    methods:{
        compile() {
            var self = this;
            if(!self.code) {
                self.result = '';
                return;
            }
            try {
                self.result = hljs.highlight(self.lang, self.code).value;
            }
            catch (e) {
                self.result = hljs.highlightAuto(self.code).value;
            }
        }
    },
    mounted() {
        var self = this;
        setTimeout(function () {
            self.compile();
        }, 0);
    }
});


var languages = require('./languages');
var languageKeys = {};
languages.forEach(function (language) {
    languageKeys[language] = true;
});

Component.hasLanguage = function(name) {
    return languageKeys[name];
};

module.exports = Component;
