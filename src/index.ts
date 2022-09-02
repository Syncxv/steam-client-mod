import { Webpack } from './code_modules/webpack';

class Bruh {
    webpack = new Webpack();
}

(window as any).bruh = new Bruh();
