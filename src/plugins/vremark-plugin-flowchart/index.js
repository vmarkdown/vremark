// const plugin = {
//     name: 'vremark-plugin-flowchart',
//     component: require('./component')
// };
//
// module.exports = plugin;


const BasePlugin = require('../plugin');

class Plugin extends BasePlugin {

    constructor() {
        super();
        const self = this;
    }

    install() {
        const self = this;
    }

    uninstall() {
        const self = this;
    }
}

Plugin.name = 'vremark-plugin-flowchart';
Plugin.component = require('./component');

module.exports = Plugin;


