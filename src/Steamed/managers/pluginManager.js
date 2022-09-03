module.exports = class PluginManager {
    constructor() {
        this.plugins = new Map();
    }
    getAllPlugins() {
        const pluginIDs = [...require.context('../plugins', true, /\.js$/).keys()].map((item) => item.split('/').slice(1)[0]);
        for (let pluginID of pluginIDs) {
            const pluginClass = require(`../plugins/${pluginID}`);
            try {
                this.plugins.set(pluginID, new pluginClass());
            } catch (err) {
                console.error('welp', err);
            }
        }
    }
};
