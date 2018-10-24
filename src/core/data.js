var visit = require('unist-util-visit');
var defaultOptions = require('./defaultOptions.js');

module.exports = function data(root, options) {
    options.rootClassName = [defaultOptions.rootClassName].concat(options.rootClassName);
    options.rootTagName = options.rootTagName || defaultOptions.rootTagName;

    if(root.type === 'root') {
        if(options.rootTagName) {
            root.tagName = options.rootTagName;
        }
        var data = root.data || {};
        if(options.rootClassName) {
            data['class'] = options.rootClassName;
        }
        root.data = data;
    }

    visit(root, function (node) {

        var data = node.data || {};
        data.attrs = data.attrs || {};
        data.props = data.props || {};

        Object.assign(data.attrs, node.properties);

        if(node.hasOwnProperty('hash')) {

            options.hashid && Object.assign(data.attrs, {
                id: node.hash
            });

            Object.assign(data, {
                key: node.hash
            });
        }

        node.data = data;

    });


};
