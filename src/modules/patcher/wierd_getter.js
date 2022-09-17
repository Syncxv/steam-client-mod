const getReactInstance = require('../util/getReactInstance');

module.exports = class Injector {
    inject_prototype(id, module, thisBruh, methodName, patch) {
        const originalGetter = module.prototype.__lookupGetter__(methodName);
        if (!originalGetter) return null;
        const binded = originalGetter.bind(thisBruh);
        let patchedGetter = (function (original) {
            return function () {
                console.log('PATCH GANG', arguments, this);
                try {
                    patch.call(this, arguments);
                    const what = binded()
                        .bind(this)()
                        .call(this, ...arguments);
                    console.log('WHAT: ', what);
                } catch (err) {
                    console.error('huge ERROR: ', err);
                }
            };
        })();
        module.prototype.__defineGetter__(methodName, function () {
            console.log('IN GETTER', arguments, this, this.props);
            return patchedGetter.bind(this);
        });
        return () =>
            module.prototype.__defineGetter__(methodName, function () {
                return originalGetter;
            });
    }
};
// injector.inject_prototype('', TextArea, bro, 'OnSubmit', function(args) {
//     console.log(this, args)
// })
//    [...g_PopupManager.m_mapPopups.values()].find((m) => m.m_strName.startsWith('chat')).window.document.querySelector('.displayColumn.fullWidth')).child.sibling.stateNode
