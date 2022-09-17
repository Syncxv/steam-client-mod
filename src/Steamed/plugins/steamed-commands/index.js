const { getReactInstance, findInReactTree, sleep } = require('steamed/util');
const { Plugin } = require('steamed/entities');
const commands = require('./commands');

const AutocompeteBruh = require('./components/Autocomplete');
const emojis = require('./emojis');
module.exports = class CommandsPlugin extends Plugin {
    manifest = { name: 'Commands', description: 'adds commands HEHHE HA', author: 'Aria' };
    unpatches = [];
    autoCompleteInstances = [];
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

    getActiveAutoCompleteInstance() {
        return this.autoCompleteInstances.find((m) => m.props.chatElem?.dataset?.activechat === 'true');
    }

    autoComplete() {
        this.chatViewObserver = new MutationObserver(([e]) => {
            console.log('new chat view :O', e.target.lastChild);
            let chatElem = this.window.document.querySelector('[data-activechat="true"]');
            console.log(chatElem);
            // chatElem.id = 'ADDING AUTO COMPLETE MUTATION OBSERVER';
            chatElem.appendChild(this.createContainer());
            this.autoCompleteInstances.push(
                (chatElem.autoComplete = ReactDOM.render(<AutocompeteBruh chatElem={chatElem} window={this.window} />, document.createElement('div')))
            );
        });
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
                            this.autoCompleteInstances.push(
                                (chatElem.autoComplete = ReactDOM.render(
                                    <AutocompeteBruh chatElem={chatElem} window={this.window} />,
                                    document.createElement('div')
                                ))
                            );
                        });
                    }
                };
                wait();
            }
        });
    }

    patchOnSubmit() {}

    monkey() {
        const MessageManagerClass = steamed.webpack.getModule((m) => m?.prototype?.SendChatMessage, true);
        const MessageClass = steamed.webpack.getModule((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'), true);
        this.unpatches.push(
            steamed.patcher.instead('moment', MessageManagerClass.prototype, 'SendChatMessage', async (thisObject, args, original) => {
                console.log(thisObject, args, original);
                const activeAutoCompleteInstance = this.getActiveAutoCompleteInstance();
                console.log(
                    'WHY MAN WHAT IS THIS SHIT',
                    emojis,
                    activeAutoCompleteInstance._this.state.messageInput,
                    activeAutoCompleteInstance.state.text
                );
                let [message] = args;

                if (!message.startsWith(steamed.api.commands.prefix) && !message.startsWith(':')) {
                    return original(...args);
                }

                const [cmd, ...cmdArgs] = message.slice(steamed.api.commands.prefix.length).split(' ');
                const command = steamed.api.commands.find((c) =>
                    [c.name.toLowerCase(), ...(c.aliases?.map((alias) => alias.toLowerCase()) || [])].includes(cmd.toLowerCase())
                );

                console.log(command);
                const emoji = emojis.find((e) => e.emoji === activeAutoCompleteInstance._this.state.messageInput);
                console.log(emojis, activeAutoCompleteInstance._this.state.messageInput, activeAutoCompleteInstance.state.text);
                if (activeAutoCompleteInstance.matchedResults.length && !command && !emoji) {
                    return;
                }
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
