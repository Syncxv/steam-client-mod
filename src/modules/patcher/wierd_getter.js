const getReactInstance = require('../util/getReactInstance');

class Injector {
    inject_prototype_pre(module, methodName, patch) {
        const originalGetter = module.prototype.__lookupGetter__(methodName);
        if (!originalGetter) return null;
        let patchedGetter = function () {
            console.log('PATCH GANG', arguments, this);
            try {
                const heeh = patch.call(this, arguments);
                if (!heeh) return;
                const what = originalGetter
                    .bind(this)()
                    .bind(this)()
                    .call(this, ...arguments);
                console.log('WHAT: ', what);
            } catch (err) {
                console.error('huge ERROR: ', err);
            }
        };
        module.prototype.__defineGetter__(methodName, function () {
            console.log('IN GETTER', arguments, this, this.props);
            return patchedGetter.bind(this);
        });
        return () =>
            module.prototype.__defineGetter__(methodName, function () {
                return originalGetter;
            });
    }
}
exports.Injector = Injector;
export const injector = new Injector();
// injector.inject_prototype(TextArea, 'OnSubmit', function(args) {
//     console.log(this, args)
// })
//    [...g_PopupManager.m_mapPopups.values()].find((m) => m.m_strName.startsWith('chat')).window.document.querySelector('.displayColumn.fullWidth')).child.sibling.stateNode
