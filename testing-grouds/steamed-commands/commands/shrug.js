module.exports = {
    name: 'shrug',
    description: 'sends shrug bruh',
    execute: (args) => {
        return {
            send: true,
            result: '¯\\_(ツ)_/¯ ' + args.join(' '),
        };
    },
};
