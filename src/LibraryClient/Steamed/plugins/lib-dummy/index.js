const { Plugin } = require('steamed/entities');

module.exports = class Dummy extends Plugin {
    manifest = { name: 'Dummy Library Plugin', description: 'this plugin does nothing eh for lib', author: 'Aria' };
    startPlugin() {
        console.log('i do nothing LIBRARY');
    }
};