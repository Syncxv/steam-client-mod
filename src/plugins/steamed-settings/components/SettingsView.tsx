import { SwitchItem } from 'steamed/components';

export const Settings: React.FC<{ settings: any }> = ({ settings }) => (
    <form className="DialogBody">
        <p>WELCOME TO STEAMED</p>

        <p>nothing here at the moment :( no where near done developing steamed HEHEH HA</p>

        <div className="SettingsGroup">
            <SwitchItem
                label="Is Cool?"
                description=""
                onChange={(val: boolean) => {
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
