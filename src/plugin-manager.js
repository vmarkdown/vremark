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


// function loadPlugin(plugin, has, register) {
//
//     if(!has) return false;
//
//     // const plguin
//     if(has(plugin)){
//         return true;
//     }
//
//     // const component = await load(plugin);
//     //
//     // if(!component) {
//     //     return false;
//     // }
//
//     register && register(plugin);
//
//
//
// }
//
// module.exports = async function loadPlugins(plugins, has, register) {
//
//     const loads = Object.keys(plugins).map(function (name) {
//         // const plugin = plugins[name];
//         const plugin = name;
//         return loadPlugin(plugin, has, register);
//     });
//
//     Promise.all(loads);
//
//     // return await Promise.all(loads);
//
// };