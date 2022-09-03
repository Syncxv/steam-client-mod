import { Webpack } from './code_modules/webpack';

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    constructor() {
        this.webpack.initalize();
    }
}

(window as any).steamed = new Steamed();
