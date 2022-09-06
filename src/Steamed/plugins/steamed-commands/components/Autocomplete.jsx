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

    get _this() {
        return steamed.util.getOwnerInstance(this.props.chatElem.querySelector('.chatEntry.Panel.Focusable'));
    }

    componentDidMount() {
        this.container = this.props.chatElem.querySelector('.popoutContianerGang');
        this.container.appendChild(this.el);

        this.props.chatElem
            .querySelector('textarea')
            .addEventListener('input', (e) => this.setState({ ...this.state, isOpen: true, selectedIndex: 0, text: e.target.value }));
        this.props.chatElem.querySelector('textarea').addEventListener('keyup', this.KeyUpHandler.bind(this));
        this.props.chatElem.querySelector('textarea').addEventListener('keydown', this.KeyDownHandler.bind(this));
    }

    KeyDownHandler(e) {
        if (e.keyCode === 9) {
            if (!this.matchedCommands.length) return this.CloseAutoComplete();
            this.InsertCommand();
            this._this.props.chatView.FocusTextInput();
            this.CloseAutoComplete();
        }
    }

    KeyUpHandler(e) {
        if (!this.state.text.startsWith(steamed.api.commands.prefix) || !this.matchedCommands.length || !this.state.isOpen) return null;
        switch (e.keyCode) {
            case 38:
                if (this.state.selectedIndex - 1 < 0) return this.setState({ ...this.state, selectedIndex: this.matchedCommands.length - 1 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex - 1 });

            case 40:
                if (this.state.selectedIndex + 1 > this.matchedCommands.length - 1) return this.setState({ ...this.state, selectedIndex: 0 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex + 1 });

            case 13:
                if (!this.matchedCommands.length) return this.CloseAutoComplete();
                console.log(this.matchedCommands);
                this.InsertCommand();
                this.CloseAutoComplete();
                break;
        }
    }

    InsertCommand() {
        this._this.setState({
            ...this._this.state,
            messageInput: `${steamed.api.commands.prefix}${this.matchedCommands[this.state.selectedIndex].name}`,
        });
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
                    bottom: `${this.props.chatElem.querySelector('.chatEntry.Panel.Focusable').getBoundingClientRect().height - 6}px`,
                }}
            >
                <div
                    className={this.classes.mentionDialog}
                    style={{
                        width: this.props.chatElem.querySelector('form').getBoundingClientRect().width - 6,
                        // backgroundColor: '#2c3036',
                        transform: `translateX(6px)`,
                        maxHeight: '250px',
                        overflowY: 'auto',
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
                                    backgroundColor: '#434953',
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
