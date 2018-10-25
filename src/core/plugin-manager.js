class PluginManager {

    constructor(options) {
        this.options = options || {
            paths: {},
            loader: function () {}
        };
        this.plugins = {};
    }

    has(plugin) {
        return this.plugins[plugin];
    }

    async _loadPlugin(plugin) {

        if(this.has(plugin)){
            return true;
        }

        try {
            await this.options.loader(plugin);
            this.plugins[plugin] = true;
        }
        catch (e) {
            return false;
        }

        return true;
    }

    async loadSync(plugins, callback) {

    }

    load(plugins, callback) {

        const self = this;

        const loads = Object.keys(plugins).map(function (plugin) {
            return self._loadPlugin(plugin);
        });

        Promise.all(loads).then(function () {
            callback && callback();
        });

    }

    unload(plugins) {

    }

}

module.exports = PluginManager;