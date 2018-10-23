function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

var defaultModes = {

    'vue': {
        test: function (h) {
            return h && h.toString().indexOf('vm') > -1;
        },
        data: function (node, options) {

            var props = node.data || {};

            props.attrs = props.attrs || {};

            Object.assign(props.attrs, node.properties);

            if(node.hasOwnProperty('hash')) {
                options.hashid && Object.assign(props.attrs, {
                    id: node.hash
                });

                Object.assign(props, {
                    key: node.hash
                });
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

module.exports = function (node, h, mode) {

    if(mode) {
        if( isString(mode) && defaultModes.hasOwnProperty(mode) ) {
            return defaultModes[mode].data;
        }

        if( isFunction(mode) ) {
            return mode;
        }
    }

    var list = Object.keys(defaultModes);
    for (var i=0;i<list.length;i++) {
        var item = list[i];
        var m = defaultModes[item];
        if( m.test(h) ) {
            return m.data;
        }
    }

    return null;
};