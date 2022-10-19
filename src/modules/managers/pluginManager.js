export class PluginManager {
    constructor() {
        this.plugins = new Map();
    }
    static color = '#58579E';

    get(pluginID) {
        return this.plugins.get(pluginID);
    }

    initalize(client) {
        const pluginIDs = this.getPluginIds(client);
        console.log(pluginIDs);
        for (let pluginID of pluginIDs) {
            const pluginClass = require(`../../${client}/Steamed/plugins/${pluginID}`);
            try {
                const newPluginID = `${client}-${pluginID}`;
                Object.defineProperties(pluginClass.prototype, {
                    entityID: {
                        get: () => newPluginID,
                        set: () => {
                            throw new Error('Plugins cannot update their ID at runtime!');
                        },
                    },
                });
                this.plugins.set(newPluginID, new pluginClass());
            } catch (err) {
                console.error('welp', err);
                console.log(pluginClass);
            }
        }

        for (const plugin of [...this.plugins.values()]) {
            const disabled_plugins = JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]');
            if (disabled_plugins.includes(plugin.entityID)) continue;
            this.load(plugin.entityID);
        }
    }

    getPluginIds(client) {
        switch (client) {
            case 'LibraryClient':
                return [
                    ...new Set(
                        [...require.context('../../LibraryClient/Steamed/plugins', true, /\.js$/).keys()].map((item) => item.split('/').slice(1)[0])
                    ),
                ];
            case 'FriendClient':
                return [
                    ...new Set(
                        [...require.context('../../FriendClient/Steamed/plugins', true, /\.js$/).keys()].map((item) => item.split('/').slice(1)[0])
                    ),
                ];
        }
    }

    enable(pluginID) {
        if (!this.get(pluginID)) {
            throw new Error(`Tried to enable a non installed plugin (${pluginID})`);
        }
        localStorage.setItem(
            'steamed_disabled_plugins',
            JSON.stringify(...JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').filter((p) => p !== pluginID))
        );
        this.load(pluginID);
    }

    disable(pluginID) {
        const plugin = this.get(pluginID);

        if (!plugin) {
            throw new Error(`Tried to disable a non installed plugin (${pluginID})`);
        }

        localStorage.setItem(
            'steamed_disabled_plugins',
            JSON.stringify([...JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]'), pluginID])
        );

        this.unload(pluginID);
    }

    load(pluginID) {
        const plugin = this.get(pluginID);
        if (!plugin) {
            throw new Error(`Tried to load a non installed plugin (${plugin})`);
        }
        if (plugin.ready) {
            return this.error(`Tried to load an already loaded plugin (${pluginID})`);
        }

        plugin._load();
    }
    unload(pluginID) {
        const plugin = this.get(pluginID);
        if (!plugin) {
            throw new Error(`Tried to unload a non installed plugin (${plugin})`);
        }
        if (!plugin.ready) {
            return this.error(`Tried to unload a non loaded plugin (${plugin})`);
        }

        plugin._unload();
    }

    error(...args) {
        console.error('%c[Steamed:PluginManager]', 'color: ' + PluginManager.color, ...args);
    }
    log(...args) {
        console.log('%c[Steamed:PluginManager]', 'color: ' + PluginManager.color, ...args);
    }
}
