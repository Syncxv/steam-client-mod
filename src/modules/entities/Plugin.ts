import { SteamedPluginSettingsStore } from '../api/settings/SteamedPluginSettingsStore';

export class Plugin {
    public entityID: string;
    public settings: SteamedPluginSettingsStore;
    public ready: boolean;
    public styles: { [key: string]: HTMLStyleElement };
    public manifest: { name: string; authors: { name: string; discordId?: string }[]; description: string; version: string };
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

    public start() {}
    public stop() {}

    loadStylesheet(css: string, _document = window.document) {
        const id = `style-${this.entityID}-${Math.random().toString(36).slice(2)}`;
        const style = document.createElement('style');
        style.innerHTML = css;
        style.id = id;
        this.styles[id] = style;
        _document.head.appendChild(style);
    }
    async _load() {
        try {
            if (typeof this.start === 'function') {
                await this.start();
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
                document.getElementById(id)?.remove();
            }

            this.styles = {};
            if (typeof this.stop === 'function') {
                await this.stop();
            }

            this.log('Plugin unloaded');
        } catch (e) {
            this.error("An error occurred during shutting down! It's heavily recommended reloading Discord to ensure there are no conflicts.", e);
        } finally {
            this.ready = false;
        }
    }
    log(...data: any[]) {
        console.log(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    debug(...data: any[]) {
        console.debug(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    warn(...data: any[]) {
        console.warn(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }

    error(...data: any[]) {
        console.error(`%c[Steamed:Plugin:${this.constructor.name}]`, `color: ${this.color}`, ...data);
    }
}
