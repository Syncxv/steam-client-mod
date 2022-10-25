import { definePlugin } from 'steamed/util';
import { Settings } from './components/Settings';

export default definePlugin({
    name: 'Themes',
    description: 'Idk Man Themes eh',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: '1.1.1',

    settingsComponent: {
        title: 'Themes',
        identifier: 'steamed-themes',
        content: () => window.React.createElement(Settings, { themes: Object.values(steamed.Themes.themes) }),
    },
});
