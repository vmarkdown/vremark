const xtend = require('xtend');
const visit = require('unist-util-visit');

// const components = {};


function plugin(options = {}) {

    const settings = xtend(options, this.data('settings'));
    const plugins = settings.plugins || [];
    const register = settings.register;

    return function transformer(root, file, next) {

        const tasks = [];

        visit(root, function (node) {

            plugins.forEach(function (plugin) {

                const Plugin = plugin.constructor;

                if(!plugin.isActive() || !Plugin.test(node)){
                    return;
                }

                Plugin.transformer && Plugin.transformer(node);

                if(!Plugin.component && Plugin.getComponent) {
                    tasks.push(Plugin.getComponent());
                }

                // if(component)
                // Plugin.component && Plugin.transformer(node);

                // if(components[plugin.COMPONENT_NAME]) {
                //     return;
                // }
                //
                // if(!components[plugin.COMPONENT_NAME] && plugin.component) {
                //     tasks.push(plugin.component());
                // }
            });



            // plugins.forEach(function (plugin) {
            //     if(!plugin.test(node)){
            //         return;
            //     }
            //
            //     plugin.loader(node);
            //
            //     if(components[plugin.COMPONENT_NAME]) {
            //         return;
            //     }
            //
            //     if(!components[plugin.COMPONENT_NAME] && plugin.component) {
            //         tasks.push(plugin.component());
            //     }
            // });

        });

        if(tasks.length === 0){
            next();
            return root;
        }

        Promise.all(tasks).then(function (cs) {

            cs && (cs.length>0) && cs.forEach(function (component) {

                if(register){
                    register(component.default || component);
                }

                // components[component.name] = component;
            });

        }).catch(function (e) {
            console.error(e);
        }).finally(function () {
            next();
        });


    }
}


module.exports = plugin;
