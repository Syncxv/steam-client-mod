import { SwitchItem } from '../../../modules/components';
import { Theme } from '../../../types';

export const Settings: React.FC<{ themes: Theme[] }> = ({ themes }) => {
    console.log(themes);
    return (
        <form className="DialogBody">
            <div className="SettingsGroup">
                {themes.map((t) => (
                    <Theme theme={t} />
                ))}
            </div>
        </form>
    );
};

const Theme: React.FC<{ theme: Theme }> = ({ theme }) => {
    return (
        <button className="DialogButton _DialogLayout Secondary Focusable" onClick={() => console.log('well')}>
            <SwitchItem
                label={theme.name}
                description={theme.description}
                onChange={(enable: boolean) => (enable ? steamed.Themes.startTheme(theme) : steamed.Themes.stopTheme(theme))}
                checked={theme.started}
            />
        </button>
    );
};
