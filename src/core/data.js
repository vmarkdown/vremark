var visit = require('unist-util-visit');
var defaultOptions = require('./defaultOptions.js');
var Hashids = require('hashids').default;
var hashids = new Hashids("vremark", 0, '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}');

module.exports = {
    parse: function (root, options) {
        // console.time('data parse');
        visit(root, function (node) {
            var data = node.data || {};
            data.attrs = data.attrs || {};
            data.props = data.props || {};
            data.class = data.class || [];

            Object.assign(data.attrs, node.properties);

            if(options.data && options.data.hasOwnProperty(node.type)) {

                var settings = options.data[node.type];

                if(settings.hasOwnProperty('class')) {
                    var classNames = settings['class'];
                    if(node.type === 'root') {
                        data.class = [].concat(data.class).concat(defaultOptions.rootClassName);
                    }
                    data.class = [].concat(data.class).concat(classNames);
                }

                if(settings.hasOwnProperty('attrs')) {
                    var attrs = settings['attrs'];
                    data.attrs = Object.assign({}, attrs, data.attrs);
                }

                if(settings.hasOwnProperty('props')) {
                    var props = settings['props'];
                    data.props = Object.assign({}, props, data.props);
                }

                if(settings.hasOwnProperty('tagName')) {
                    var tagName = settings['tagName'];
                    node.tagName = tagName;
                }
            }

            node.data = data;
        });
        // console.timeEnd('data parse');
    },
    run: function (root, options) {
        // console.time('data run');
        visit(root, function (node) {

            var data = node.data || {};
            data.attrs = data.attrs || {};
            data.props = data.props || {};
            data.class = (data.class && data.class.length === 0) ? null: data.class;

            Object.assign(data.attrs, node.properties);

            if(node.type !== 'root' && node.hasOwnProperty('hash')) {

                // if(options.hashid) {
                //
                //     if(data.attrs.hasOwnProperty('id')){
                //         Object.assign(data.attrs, {
                //             'data-id': node.hash
                //         });
                //     }else{
                //         Object.assign(data.attrs, {
                //             id: node.hash
                //         });
                //     }
                // }
                // var id = data.attrs.id || node.hash;
                //
                var id = data.attrs.id || hashids.encode(node.hash);
                if(options.hashid && id) {
                    Object.assign(data.attrs, {
                        'id': id
                    });
                }

                // if(options.hashid) {
                //     var id = hashids.encode(node.hash);
                //     options.hashid && Object.assign(data.attrs, {
                //         'data-anchor-id': id
                //     });
                // }

                Object.assign(data, {
                    key: node.hash
                });
            }

            node.data = data;

        });
        // console.timeEnd('data run');
    }
};
