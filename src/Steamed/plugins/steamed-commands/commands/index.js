require
    .context('./', true, /\js$/)
    .keys()
    .filter((file) => file !== './index.js')
    .forEach((filename) => {
        const moduleName = filename.split('./')[1];
        console.log(moduleName);
        exports[moduleName] = require(`${filename}`);
    });
