async function registerComponent(name, has, register) {
    if(has(name)){
        return true;
    }
    return new Promise(function (resolve, reject) {

        requirejs([name+'.plugin'], function (module) {
            const component = module.default || module;
            register && register(name, component);
            resolve(component);
        }, function (e) {
            // console.error(e);
            resolve();
        });



        // require.ensure(['../../src/plugins/vremark-plugin-highlight/component/vremark-highlight'], function(require) {
        //     var a = require("module-a");
        //     // ...
        // });

        // const path = '../../src/plugins/'+name+'/component/'+name+'.js';

        // require.ensure([path], function(require) {
        //     const component = require(path);
        //     resolve(component);
        // }, name);

        // debugger
        //
        // import(name).then(function (component) {
        //     debugger
        // });


    });

}


module.exports = async function registerComponents(components, has, register) {

    const loads = Object.keys(components).map(function (name) {
        return registerComponent(name, has, register);
    });

    return await Promise.all(loads);

};