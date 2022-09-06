require
    .context('./', true, /\js$/)
    .keys()
    .filter((file) => file !== './index.js')
    .forEach((filename) => {
        const moduleName = filename.split('./')[1].split('.')[0];
        exports[moduleName] = require(`${filename}`);
    });
