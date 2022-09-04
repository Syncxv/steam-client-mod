const getReactInstance = require('../util/getReactInstance');

module.exports = class Injector {
    inject_prototype(id, module, methodName, patch) {
        const originalGetter = module.prototype.__lookupGetter__(methodName);
        if (!originalGetter) return null;
        let originalBRUH = module.prototype[methodName];
        let patchedGetter = (function (original) {
            return function () {
                console.log('PATCH GANG', arguments, this);
                try {
                    const what = originalBRUH.call({}, ...arguments);
                    patch.call(this, arguments, what);
                    console.log('WHAT: ', what);
                    return what;
                } catch (err) {
                    console.error('huge ERROR: ', err);
                    // return originalBRUH.call(this, ...arguments);
                }
            };
        })(originalBRUH);
        module.prototype.__defineGetter__(methodName, function () {
            console.log('IN GETTER', arguments, this, this.props);
            let e = patchedGetter.bind(this);
            this.hasOwnProperty(methodName) ||
                Object.defineProperty(this, methodName, {
                    value: e,
                });
            return e;
            // return patchedGetter(this, this.props);
        });
        return () =>
            module.prototype.__defineGetter__(methodName, function () {
                return originalGetter;
            });
    }
};

//    [...g_PopupManager.m_mapPopups.values()].find((m) => m.m_strName.startsWith('chat')).window.document.querySelector('.displayColumn.fullWidth')).child.sibling.stateNode
