import { Devs } from '@utils/constants';
import { definePlugin } from '@utils/definePlugin';

import { Settings } from './components/Settings';

export default definePlugin({
    name: 'Plugins',
    description: 'Idk Man Themes eh',
    authors: [Devs.Aria],
    version: '1.1.1',
    type: 'all',
    settingsComponent: {
        title: 'Plugins',
        identifier: 'steamed-plugins',
        content: () => <Settings />
    }
});
