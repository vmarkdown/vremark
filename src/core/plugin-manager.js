const loader = require('./loader');

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

    push(plugin) {
        this.plugins[plugin.name] = plugin;
    }

    getPlugins() {
        var plugins = {};
        Object.keys(this.plugins).forEach(function (p) {
            plugins[p] = true;
        });
        return plugins;
    }

    async _loadPlugin(name) {

        if(this.has(name)){
            return this.get(name);
        }

        try {
            const plugin = await loader(name);

            this.options.onOneLoaded && this.options.onOneLoaded(plugin);

            this.push(plugin);

            return plugin;
        }
        catch (e) {
            console.error(e);
            return null;
        }

    }

    async loadSync(plugins, callback) {

    }

    async load(plugins, callback) {

        const self = this;

        const loads = plugins.map(function (plugin) {
            if(self.has(plugin)){
                return null;
            }
            return self._loadPlugin(plugin);
        }).filter(function (p) {
            return p !== null;
        });

        return await Promise.all(loads);
    }

    unload(plugins) {

    }

}

module.exports = PluginManager;