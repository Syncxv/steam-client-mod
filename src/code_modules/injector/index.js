module.exports = class Injector {
    inject_prototype(id, module, methodName, patch) {
        const originalGetter = module.prototype.__lookupGetter__(methodName);
        if (!originalGetter) return null;

        let patchedGetter = (function (original) {
            return function () {
                console.log('PATCH GANG', arguments, original);

                try {
                    patch.call(this, arguments);
                    return original.call(this, ...arguments);
                } catch (err) {
                    console.error(err);
                    return original.call(this, ...arguments);
                }
            };
        })(module.prototype[methodName]);
        module.prototype.__defineGetter__(methodName, function () {
            return patchedGetter;
        });
        return () =>
            module.prototype.__defineGetter__(methodName, function () {
                return originalGetter;
            });
    }
};
