const constants = require('../../../../constants');
const emojis = require('../emojis');

module.exports = class AutocompleteBruh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selectedIndex: 0,
            isOpen: false,
        };
        this.matchedResults = [];
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

        this.textarea = this.props.chatElem.querySelector('textarea');

        this.textarea.addEventListener('input', (e) =>
            this.setState({
                ...this.state,
                isOpen: e.target.value.startsWith(steamed.api.commands.prefix) || e.target.value.startsWith(':'),
                selectedIndex: 0,
                text: e.target.value,
            })
        );
        this.textarea.addEventListener('keyup', this.KeyUpHandler.bind(this));
        this.textarea.addEventListener('keydown', this.KeyDownHandler.bind(this));
    }

    KeyDownHandler(e) {
        if (e.keyCode === 9) {
            if (!this.matchedResults.length) return this.CloseAutoComplete();
            this.InsertCommand();
            this._this.props.chatView.FocusTextInput();
            this.CloseAutoComplete();
        }
    }

    KeyUpHandler(e) {
        if (!this.matchedResults.length || !this.state.isOpen) return null;
        switch (e.keyCode) {
            //up arrow
            case 38:
                if (this.state.selectedIndex - 1 < 0) return this.setState({ ...this.state, selectedIndex: this.matchedResults.length - 1 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex - 1 });
            //down arrow
            case 40:
                if (this.state.selectedIndex + 1 > this.matchedResults.length - 1) return this.setState({ ...this.state, selectedIndex: 0 });

                return this.setState({ ...this.state, selectedIndex: this.state.selectedIndex + 1 });
            //enter
            case 13:
                this.CloseAutoComplete();
                console.log(this.matchedResults);
                this.InsertCommand();
                break;
        }
    }

    InsertCommand() {
        this._this.setState({
            ...this._this.state,
            messageInput: this.matchedResults.find((c) => c.execute)
                ? `${steamed.api.commands.prefix}${this.matchedResults[this.state.selectedIndex].name}`
                : `${this.matchedResults[this.state.selectedIndex].emoji}`,
        });
    }

    CloseAutoComplete() {
        this.setState({ ...this.state, isOpen: false });
    }

    GetAutoCompleteType() {
        if (this.state.text.length > 2 && this.state.text.startsWith(steamed.api.commands.prefix)) return constants.AutoCompleteTypes.Command;
        if (this.state.text.length > 2 && this.state.text.startsWith(':')) return constants.AutoCompleteTypes.Emoji;
        return null;
    }

    render() {
        if (!this.state.isOpen) return null;
        switch (this.GetAutoCompleteType()) {
            case constants.AutoCompleteTypes.Command:
                this.matchedResults = steamed.api.commands.filter((item) =>
                    item.name.toLowerCase().includes(this.state.text.substring(1).toLowerCase())
                );
                console.log(this.state, this.matchedResults);
                if (!this.matchedResults.length || !this.state.isOpen) return null;
                return this.renderPortal(constants.AutoCompleteTypes.Command);
            case constants.AutoCompleteTypes.Emoji:
                this.matchedResults = emojis
                    .filter((item) => item.name.toLowerCase().includes(this.state.text.substring(1).toLowerCase()))
                    .splice(0, 12);
                if (!this.matchedResults.length || !this.state.isOpen) return null;
                return this.renderPortal(constants.AutoCompleteTypes.Emoji);
            default:
                return null;
        }
    }

    renderPortal(type) {
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
                    {this.matchedResults.map((item, i) => {
                        const selected = this.state.selectedIndex === i;
                        console.log(item, selected);
                        return (
                            <div
                                classNme={`${this.classes.mentionSearchOption} ${this.classes.suggestOption} ${
                                    selected ? this.classes.selected : ''
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
                                {type === constants.AutoCompleteTypes.Command
                                    ? this.renderSuggesion(`${steamed.api.commands.prefix}${item.name}`, item.description)
                                    : this.renderSuggesion(`${item.emoji} ${item.shortname}`)}
                            </div>
                        );
                    })}
                </div>
            </div>,
            this.el
        );
    }

    renderSuggesion(name, description) {
        return (
            <span className="SlashCommandSuggestion">
                <span className="SlashCommandSuggestion_SlashCommand">{name}</span>:{' '}
                <span className="SlashCommandSuggestion_SlashCommandDescription">{description}</span>
            </span>
        );
    }
};
