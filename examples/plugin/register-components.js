async function registerComponent(name, register) {

    return new Promise(function (resolve, reject) {
        requirejs([name+'.plugin'], function (module) {
            const component = module.default || module;
            register && register(name, component);
            resolve();
        }, function (e) {
            console.error(e);
            resolve();
        })
    });

}


module.exports = async function registerComponents(components, register) {

    const loads = Object.keys(components).map(function (name) {
        return registerComponent(name, register)
    });

    return await Promise.all(loads);

};