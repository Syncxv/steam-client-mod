const Plugin = require('../../../code_modules/entities/Plugin');

module.exports = class Dummy extends Plugin {
    startPlugin() {
        console.log('i do nothing');
    }
};
