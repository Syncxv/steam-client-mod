import { Webpack } from './code_modules/webpack';

console.log('WHAT THE FUCK bro');

class Bruh {
    webpack = new Webpack();
    constructor() {
        this.webpack.initalize();
    }
}

(window as any).bruh = new Bruh();
