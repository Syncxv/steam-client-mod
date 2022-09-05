const { getReactInstance, findInReactTree } = require('steamed/util');
const { Plugin } = require('steamed/entities');
const commands = require('./commands');

const AutocompeteBruh = require('./components/Autocomplete');
const sleep = require('steamed/util/sleep');
module.exports = class CommandsPlugin extends Plugin {
    manifest = { name: 'Commands', description: 'adds commands HEHHE HA', author: 'Aria' };
    unpatches = [];
    constructor(shit) {
        super(shit);
    }
    get _this() {
        return getReactInstance(
            [...g_PopupManager.m_mapPopups.entries]
                .find((p) => p.m_strName.startsWith('chat_'))
                ?.window?.document?.querySelector('.displayColumn.fullWidth')
        )?.child?.sibling?.stateNode;
    }

    startPlugin() {
        window.testing_gang = this;
        Object.values(commands).forEach((command) => steamed.api.commands.new(command));
        this.monkey();
        this.autoComplete();
    }

    createContainer() {
        const CONTAINER_ELEM = document.createElement('div');
        CONTAINER_ELEM.classList.add('popoutContianerGang');
        return CONTAINER_ELEM;
    }

    autoComplete() {
        this.chatViewObserver = new MutationObserver(([e]) => {
            console.log('new chat view :O', e.target.lastChild);
            let chatElem = this.window.document.querySelector('[data-activechat="true"]');
            console.log(chatElem);
            // chatElem.id = 'ADDING AUTO COMPLETE MUTATION OBSERVER';
            chatElem.appendChild(this.createContainer());
            ReactDOM.render(<AutocompeteBruh chatElem={chatElem} window={this.window} />, document.createElement('div'));
        });
        // this.textAreaObserver = new MutationObserver((e) => {
        //     if (e.length > 3) {
        //         console.log('chat loaded', e);
        //     }
        // });
        g_PopupManager.m_rgPopupCreatedCallbacks.push((popup) => {
            if (popup.m_strName.startsWith('chat_')) {
                console.log('cool auto complete', popup);
                this.window = popup.window;
                const wait = () => {
                    if (!popup.window.document.querySelector('textarea')) {
                        setTimeout(wait, 100);
                    } else {
                        console.log('FOUND IT WOAH');
                        this.chatViewObserver.observe(this.window.document.querySelector('.chatDialogs.Panel.Focusable'), { childList: true });
                        [...this.window.document.querySelector('.chatDialogs.Panel.Focusable').children].forEach((chatElem) => {
                            chatElem.appendChild(this.createContainer());
                            // if (chatElem.dataset.activechat === 'false') this.textAreaObserver.observe(chatElem, { childList: true, subtree: true });
                            ReactDOM.render(<AutocompeteBruh chatElem={chatElem} window={this.window} />, document.createElement('div'));
                        });
                    }
                };
                wait();
            }
        });
    }

    monkey() {
        const MessageManagerClass = steamed.webpack.getModule((m) => m?.prototype?.SendChatMessage, true);
        const MessageClass = steamed.webpack.getModule((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'), true);
        this.unpatches.push(
            steamed.patcher.instead('moment', MessageManagerClass.prototype, 'SendChatMessage', async (thisObject, args, original) => {
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
            })
        );
    }

    unloadPlugin() {
        this.unpatches.forEach((u) => u());
    }
};
