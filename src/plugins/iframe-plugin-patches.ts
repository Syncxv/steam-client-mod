import Plugins from 'plugins';

window.steamed = {
    Webpack: {
        //@ts-ignore
        Common: {
            //@ts-ignore
            React: __webpack_module_cache__['./node_modules/react/index.js'].exports,
        },
    },
};

export const plugins = Plugins;
