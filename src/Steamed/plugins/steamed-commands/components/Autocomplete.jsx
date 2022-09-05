module.exports = class AutocompleteBruh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selectedIndex: 0,
            isOpen: false,
        };
        this.matchedCommands = [];
        this.el = document.createElement('div');
        this.classes = {
            ...steamed.webpack.getModule(['mentionDialogPosition'], false, { module: true }),
        };
        window.autocomlete = this;
    }

    componentDidMount() {
        g_PopupManager.m_rgPopupCreatedCallbacks.push((popup) => {
            if (popup.m_strName.startsWith('chat_')) {
                console.log('cool auto complete', popup);
                this.CONTAINER_ELEM = document.createElement('div');
                this.CONTAINER_ELEM.classList.add('popoutContianerGang');
                popup.window.document.querySelector('body').appendChild(this.CONTAINER_ELEM);
                this.window = popup.window;
                this.container = popup.window.document.querySelector('.popoutContianerGang');
                this.container.appendChild(this.el);
                const wait = () => {
                    if (!popup.window.document.querySelector('textarea')) {
                        setTimeout(wait, 100);
                    } else {
                        console.log('FOUND IT WOAH');
                        popup.window.document
                            .querySelector('textarea')
                            .addEventListener('input', (e) => this.setState({ ...this.state, isOpen: true, selectedIndex: 0, text: e.target.value }));
                        popup.window.document.querySelector('textarea').addEventListener('keyup', this.KeyUpHandler.bind(this));
                        this.forceUpdate();
                    }
                };
                wait();
            }
        });
    }

    KeyUpHandler(e) {
        if (!this.matchedCommands.length) return;
        e.preventDefault();
        switch (e.keyCode) {
            case 38:
                if (this.state.selectedIndex - 1 < 0) return this.setState({ ...this.state, selectedIndex: this.matchedCommands.length - 1 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex - 1 });

            case 40:
                if (this.state.selectedIndex + 1 > this.matchedCommands.length - 1) return this.setState({ ...this.state, selectedIndex: 0 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex + 1 });

            case 13:
                if (!this.matchedCommands.length) this.setState({ ...this.state, text: '' });
                console.log('insert command into the thingy pls');
                this.matchedCommands = [];
                this.CloseAutoComplete();
        }
    }

    CloseAutoComplete() {
        this.setState({ ...this.state, isOpen: false });
    }

    render() {
        if (!this.state.text.startsWith(steamed.api.commands.prefix)) return null;
        this.matchedCommands = steamed.api.commands.filter((item) => item.name.toLowerCase().includes(this.state.text.substring(1).toLowerCase()));
        console.log(this.state, this.matchedCommands);
        if (!this.matchedCommands.length || !this.state.isOpen) return null;
        return ReactDOM.createPortal(
            <div
                className={this.classes.mentionDialogPosition}
                style={{
                    position: 'absolute',
                    bottom: `${this.window.document.querySelector('.chatEntry.Panel.Focusable').getBoundingClientRect().height}px`,
                }}
            >
                <div
                    className={this.classes.mentionDialog}
                    style={{
                        width: this.window.document.querySelector('form').getBoundingClientRect().width,
                        // backgroundColor: '#2c3036',
                        transform: `translateX(6px)`,
                    }}
                >
                    {this.matchedCommands.map((command, i) => (
                        <div
                            classNme={`${this.classes.mentionSearchOption} ${this.classes.suggestOption} ${
                                this.state.selectedIndex === i ? this.classes.selected : ''
                            }`}
                            style={{
                                paddingLeft: '20px',
                                width: '90%',
                                transition: 'transform.4s ease',
                                ...(this.state.selectedIndex === i && {
                                    transform: 'translateX(10px)',
                                    backgroundColor: '#451f75ff',
                                }),
                            }}
                        >
                            <span className="SlashCommandSuggestion">
                                <span className="SlashCommandSuggestion_SlashCommand">
                                    {steamed.api.commands.prefix}
                                    {command.name}
                                </span>
                                : <span className="SlashCommandSuggestion_SlashCommandDescription">{command.description}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>,
            this.el
        );
    }
};
