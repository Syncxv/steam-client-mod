const getReactInstance = require('../../../code_modules/util/getReactInstance');
const Plugin = require('../../../code_modules/entities/Plugin');

module.exports = class CommandsPlugin extends Plugin {
    manifest = { name: 'Commands', description: 'adds commands HEHHE HA', author: 'Aria' };

    get _this() {
        return getReactInstance(g_PopupManager.m_mapPopups.get('chat_ChatWindow_0')?.window?.document?.querySelector('.displayColumn.fullWidth'))
            ?.child?.sibling?.stateNode;
    }

    startPlugin() {
        window.testing_gang = this;
        this.monkey();
    }

    monkey() {
        const MessageManagerClass = steamed.webpack.getModule((m) => m?.prototype?.SendChatMessage, true);
        const MessageClass = steamed.webpack.getModule((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'), true);
        this.unpatch = steamed.patcher.instead('moment', MessageManagerClass.prototype, 'SendChatMessage', async (thisObject, args, original) => {
            console.log(thisObject, args, original);
            let [message] = args;

            if (!message.startsWith(steamed.api.commands.prefix)) {
                return original(...args);
            }

            const [cmd, ...cmdArgs] = message.slice(steamed.api.commands.prefix.length).split(' ');
            const command = steamed.api.commands.find((c) =>
                [c.name.toLowerCase(), ...(c.aliases?.map((alias) => alias.toLowerCase()) || [])].includes(cmd.toLowerCase())
            );

            console.log(command);

            if (!command) {
                return original(...args);
            }

            let result;
            try {
                result = await command.execute(cmdArgs, this);
            } catch (e) {
                result = {
                    send: false,
                    result: `An error occurred while executing the command: ${e.message}.\nCheck the console for more details.`,
                };

                console.error('An error occurred while executing command %s: %o', command.name, e);
            }

            if (!result || !result.result) {
                return;
            }

            if (result.send) {
                args[0] = result.result;
            } else {
                const msg = new MessageClass(-1, g_FriendsUIApp.m_CMInterface.GetServerRTime32(), result.result);
                //idk how to change avatar and stuff
                return thisObject.InternalAppendChatMsg(msg);
            }
            return original(...args);
        });
    }

    unloadPlugin() {
        this.unpatch();
    }
};
