import { definePlugin } from '../../../modules/util/definePlugin';

export default definePlugin({
    name: 'Settings Patcher',
    description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: 'fwefw',
    patches: [
        {
            match: /(FriendsUI ready to render after)/,
            replace: 'Steamed Gang for life $1',
        },
    ],
});
