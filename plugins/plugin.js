class BasePlugin {
    constructor() {
        this._active = true;
    }

    isActive() {
        return this._active;
    }

    enable() {
        this._active = true;
    }

    disable() {
        this._active = false;
    }
}

BasePlugin.component = null;

module.exports = BasePlugin;