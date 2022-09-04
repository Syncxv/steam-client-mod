const SteamedPluginSettingsStore = require('../settings');

class Plugin {
    constructor() {
        this.settings = new SteamedPluginSettingsStore(this.entityID);
        this.ready = false;
        this.styles = {};
    }
    get color() {
        return '#5756A7';
    }
    get isInternal() {
        return this.entityID.startsWith('steamed-');
    }

    get dependencies() {
        return this.manifest.dependencies;
    }

    get optionalDependencies() {
        return this.manifest.optionalDependencies;
    }
    loadStylesheet(css, _document = window.document) {
        const id = `style-${this.entityID}-${Math.random().toString(36).slice(2)}`;
        const style = document.createElement('style');
        style.innerHTML = css;
        style.id = id;
        this.styles[id] = style;
        _document.head.appendChild(style);
    }
    async _load() {
        try {
            if (typeof this.startPlugin === 'function') {
                await this.startPlugin();
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.ready = true;
        }
    }
    async _unload() {
        try {
            for (const id in this.styles) {
                document.getElementById(id).remove();
            }

            this.styles = {};
            if (typeof this.unloadPlugin === 'function') {
                await this.unloadPlugin();
            }

            this.log('Plugin unloaded');
        } catch (e) {
            this.error("An error occurred during shutting down! It's heavily recommended reloading Discord to ensure there are no conflicts.", e);
        } finally {
            this.ready = false;
        }
    }
    log(...data) {
        console.log(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    debug(...data) {
        console.debug(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    warn(...data) {
        console.warn(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    error(...data) {
        console.error(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }
}

module.exports = Plugin;
