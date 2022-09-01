const require = {};

require.d = (obj, stuff) => {
    for (const key in stuff) {
        const getter = stuff[key];
        Object.defineProperty(obj, key, {
            enumerable: !0,
            get: getter,
            get: function(value) {
                console.log(this)
                this = value
            }
        })
    }
};
