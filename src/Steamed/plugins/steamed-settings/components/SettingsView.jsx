const { SwitchItem } = require('../../../../code_modules/components');

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
            ></SwitchItem>
        </div>
    </form>
);
