import sleep from '../util/sleep';

let common = {
    React: ['createRef', 'createElement', 'Component', 'PureComponent'],
    ReactDOM: ['render', 'createPortal'],
};

export class Webpack {
    async initalize() {
        while (window.webpackChunkfriendsui == null) {
            await sleep(10);
        }
        this.require = window.webpackChunkfriendsui.push([[[Math.random().toString(36)]], {}, (r) => r]);
        this.rawModules = this.require.m;
        this.moduleExportsProbably = Object.keys(this.rawModules).map((id) => this.require(id));
        this.modules = this.moduleExportsProbably.reduce((prev, m) => prev.concat(Object.values(m)), []);

        this.getCommonModules();
    }

    getModule(filter) {
        const bruh = this.getAllAModule(filter);
        if (bruh != null) return bruh[0];
        return null;
    }

    getAllAModule(filter) {
        const bruh = typeof filter === 'function';
        return this.moduleExportsProbably
            .map((m) => {
                for (const [key, value] of Object.entries(m)) {
                    const isFound = bruh
                        ? filter(value)
                        : filter.every((key) => (m && m.hasOwnProperty(key)) || (m && m.__proto__ && m.__proto__.hasOwnProperty(key)));
                    if (isFound) return [key, m];
                }
                return null;
            })
            .filter((m) => m != null);
    }

    badGetModule(filter) {
        if (typeof filter === 'function') return this.modules.filter((m) => typeof m !== 'string').find(filter);
        const keys = filter;
        return this.modules.find((m) => keys.every((key) => (m && m.hasOwnProperty(key)) || (m && m.__proto__ && m.__proto__.hasOwnProperty(key))));
    }

    getCommonModules() {
        Object.keys(common).forEach((md) => {
            const [_, mod] = this.getModule(common[md]);
            this.common[md] = mod;
        });
    }
}
