const { Plugin } = require('steamed/entities');

export class Dummy extends Plugin {
    manifest = { name: 'Dummy Plugin', description: 'this plugin does nothing', author: 'Aria' };
    startPlugin() {
        console.log('i do nothing');
    }
}
