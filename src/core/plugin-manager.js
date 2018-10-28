const loader = require('./loader');

var languages = (function () {
    var languages = require('./languages');
    var keys = {};
    languages.forEach(function (language) {
        keys[language] = true;
    });
    return keys;
})();

function isHighlightPlugin(node) {
    return node.lang && languages[node.lang];
}

function detectTree(root, pluginManager) {
    const plugins = {};

    var children = root.children;
    for(var i=0;i<children.length;i++) {
        var node = children[i];
        if( node.type === 'code' ){

            if( !pluginManager.has('vremark-plugin-highlight') && isHighlightPlugin(node) ){
                // plugins.push('vremark-plugin-highlight');
                plugins['vremark-plugin-highlight'] = true;
            }

        }
    }

    return plugins;
}

class PluginManager {

    constructor(options) {
        this.options = options || {
            config: {},
            paths: {},
            loaded: function () {}
        };
        this.plugins = {};

        if(this.options.config) {
            loader.config(this.options.config);
        }
    }

    has(plugin) {
        return !!this.plugins[plugin];
    }

    get(name) {
        return this.plugins[name];
    }

    async _loadPlugin(name) {

        if(this.has(name)){
            return this.get(name);
        }

        try {
            // const component = await this.options.loader(plugin);
            // this.plugins[plugin] = component;
            // const plugin = await loader(name);
            // const plugin = loader(name);
            // this.options.onOneLoaded && this.options.onOneLoaded(plugin);

            const plugin = await loader(name);
            // debugger

            this.options.onOneLoaded && this.options.onOneLoaded(plugin);

            // this.plugins[name] = plugin;
            return plugin;
        }
        catch (e) {
            return null;
        }

    }

    async loadSync(plugins, callback) {

    }

    async load(plugins, callback) {

        const self = this;

        const loads = Object.keys(plugins).map(function (plugin) {
            return self._loadPlugin(plugin);
        });

        // Promise.all(loads).then(function (_plugins) {
        //     callback && callback(_plugins);
        // });

        const _plugins = await Promise.all(loads);
        // debugger
        // Object.assign(self.plugins, _plugins);
        _plugins.forEach(function (p) {
            // debugger
            // Object.assign(self.plugins, p);
            self.plugins[p.name] = p;
        });

        return _plugins;
    }

    unload(plugins) {

    }

    async detect(mdast, hast) {
        const self = this;

        if(mdast) {
            const plugins = detectTree(mdast, self);
            const length = Object.keys(plugins).length;
            if(length > 0) {
                await self.load(plugins);
            }

            return length > 0;
            // debugger
        }

        return false;

    }
}

module.exports = PluginManager;