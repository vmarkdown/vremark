const requirejs = require('./require');

function loader(plugin) {
    return new Promise(function (resolve, reject) {

        requirejs([plugin], function (m) {
            resolve(m);
        },function (e) {
            reject(e && e.message ? e.message : '');
        });

    });
}

loader.config = requirejs.config;

module.exports = loader;
