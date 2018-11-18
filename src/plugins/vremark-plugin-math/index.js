// const component = require('./component/index');
//
// const plugin = {
//     name: component.name,
//     component: component
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

Plugin.name = 'vremark-plugin-math';
Plugin.component = require('./component');

module.exports = Plugin;