const toVdom = require('./lib/hast-util-to-vdom');

function render(hast, options) {
    // if(options.rootClassName) {
    //     options.rootClassName = ['vremark-body'].concat(options.rootClassName);
    // }
    return toVdom(hast, options);
}


module.exports = render;