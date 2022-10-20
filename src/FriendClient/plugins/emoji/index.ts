import { definePlugin } from '../../../modules/util/definePlugin';
import { emojiObj } from './emojiObjs';

export default definePlugin({
    name: 'EmojiStuff',
    description: 'this plugin adds unicode emoji gg ez',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: '1.1.1',
    patches: [
        {
            match: /(static GetEmoticonURL\(.{1,4}\){)/,
            replace: '$1console.log("hi", e, t);\n',
        },
        {
            match: /(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img".{1,250}\),)/,
            // match: /(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img",.{1,50}className:(\(.{1,50}\))).{1,250}\)\),/,
            replace: '$1emojiObj[e] != null ?  steamed.Webpack.Common.React.createElement("div", {className:"cool"}, emojiObj[e].emoji) : $2',
        },

        {
            match: /(OnEmoticonSuggestionSelected\(.{1,4}\){)/,
            replace:
                '$1if(arguments[1] && emojiObj[arguments[1]]) { return t || this.FocusTextInput(), this.ReplaceSuggestedText(":", emojiObj[arguments[1]].emoji) };',
        },
        {
            match: /(OnEmoticonSelected\(.{1,6}\){)/,
            replace: '$1if(emojiObj[e]) {  return this.InsertAtCursor(emojiObj[e].emoji) };',
        },
    ],

    async start() {
        window.emojiObj = emojiObj;
        function wait(): any {
            if (!g_FriendsUIApp.ChatStore.EmoticonStore.BInitialized() || !g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.length) {
                return setTimeout(wait, 1);
            }
            console.log('READY?', g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons);
            g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons = g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.concat(
                Object.values(emojiObj).map((e) => ({ name: e.name, last_used: 1663606897, use_count: 1, is_steamed: true }))
            );
        }
        wait();
    },

    stop() {
        g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons = g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.filter((e: any) => !e.is_steamed);
    },
});
