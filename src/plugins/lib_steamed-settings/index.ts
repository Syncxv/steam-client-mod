import { definePlugin } from 'steamed/util';
import { DropThingy } from './components/SteamedDropThingy';
export default definePlugin({
    name: 'LibrarySettings',
    description: 'hi',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: '1.1.1',
    type: 'library',
    start() {
        let { React, ReactDOM } = steamed.Webpack.Common;
        let container = document.createElement('container-gang');
        document.body.appendChild(container);
        ReactDOM.render(React.createElement('div', {}, React.createElement(DropThingy)), document.querySelector('container-gang'));
    },
});
