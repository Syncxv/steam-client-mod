import { definePlugin } from 'steamed/util';

export default definePlugin({
    name: 'LIBRARY TESTT',
    description: 'hi',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: '1.1.1',
    type: 'library',
    start() {
        console.log('this should only run in the library');
    },
});
