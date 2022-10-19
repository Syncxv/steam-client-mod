const { SwitchItem } = require('steamed/components');

module.exports = () => {
    return (
        <form className="DialogBody">
            <div className="SettingsGroup">
                {[...steamed.pluginManager.plugins.values()].map((plugin) => (
                    <SwitchItem
                        label={plugin.manifest.name}
                        description={plugin.manifest.description}
                        onChange={(val) => (val ? steamed.pluginManager.enable(plugin.entityID) : steamed.pluginManager.disable(plugin.entityID))}
                        checked={plugin.ready}
                    />
                ))}
            </div>
        </form>
    );
};

const Plugin = (manifest) => {
    return <div className="plugin"></div>;
};
