const { SwitchItem } = require('steamed/components');

module.exports = ({ settings }) => (
    <form className="DialogBody">
        <p>WELCOME TO STEAMED</p>

        <p>nothing here at the moment :( no where near done developing steamed HEHEH HA</p>

        <div className="SettingsGroup">
            <SwitchItem
                label="Is Cool?"
                description=""
                onChange={(val) => {
                    console.log(val);
                    settings.toggle('cool');
                }}
                checked={settings.get('cool', true)}
            />

            <button className="DialogButton _DialogLayout Secondary Focusable" onClick={() => window.reload()}>
                Reload Steamed
            </button>
        </div>
    </form>
);
