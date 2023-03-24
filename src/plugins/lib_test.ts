import { definePlugin } from '@utils';
import { Devs } from '@utils/constants';

export default definePlugin({
    name: 'LIBRARY TESTT',
    description: 'hi',
    authors: [Devs.Aria],
    version: '1.1.1',
    type: 'library',
    patches: [
        {
            match: /(Storing new config params)/,
            replace: 'HEHHE HHA $1'
        }
    ],
    start() {
        console.log('this should only run in the library');
    }
});
