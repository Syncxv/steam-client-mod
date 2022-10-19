import * as webpack from '../modules/webpack';
import * as settings from '../modules/api/settings';
import 'steamed/webpack/patchWebpack';

export const Webpack = webpack;
export const Settings = new settings.SteamedPluginSettingsStore('STEAMED_FRIENDS_GANG');
