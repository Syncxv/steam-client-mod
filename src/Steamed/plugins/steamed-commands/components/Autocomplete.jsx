module.exports = class AutocompleteBruh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selectedIndex: 0,
        };
        this.el = document.createElement('div');
        this.classes = {
            ...steamed.webpack.getModule(['mentionDialogPosition'], false, { module: true }),
        };
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
                            .addEventListener('input', (e) => this.setState({ ...this.state, text: e.target.value }));
                        this.forceUpdate();
                    }
                };
                wait();
            }
        });
    }
    render() {
        console.log(this.state.text);
        if (!this.state.text.startsWith(steamed.api.commands.prefix)) return null;
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
                    {steamed.api.commands.map((command, i) => (
                        <div
                            classNme={`${this.classes.mentionSearchOption} ${this.classes.suggestOption} ${
                                this.state.selectedIndex === i ? this.classes.selected : ''
                            }`}
                            style={{ marginLeft: '12px' }}
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
