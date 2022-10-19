import Plugins from 'plugins';
import { registerCommand, unRegisterCommand } from '../../modules/api/commands';
import { Plugin } from '../../types';

export const plugins = Plugins;

export const isPluginEnabled = (plugin: Plugin) => !JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(plugin.name);

export function startAllPlugins() {
    for (const plugin of Object.values(Plugins))
        if (isPluginEnabled(plugin)) {
            startPlugin(plugin);
        }
}

export function startPlugin(p: Plugin) {
    if (p.start) {
        console.info('Starting plugin', p.name);
        if (p.started) {
            console.warn(`${p.name} already started`);
            return false;
        }
        try {
            p.start();
            p.started = true;
        } catch (e) {
            console.error(`Failed to start ${p.name}\n`, e);
            return false;
        }
    }

    if (p.commands?.length) {
        console.info('Registering commands of plugin', p.name);
        for (const cmd of p.commands) {
            try {
                registerCommand(cmd);
            } catch (e) {
                console.error(`Failed to register command ${cmd.name}\n`, e);
                return false;
            }
        }
    }

    return true;
}

export function stopPlugin(p: Plugin) {
    if (p.stop) {
        console.info('Stopping plugin', p.name);
        if (!p.started) {
            console.warn(`${p.name} already stopped`);
            return false;
        }
        try {
            p.stop();
            p.started = false;
        } catch (e) {
            console.error(`Failed to stop ${p.name}\n`, e);
            return false;
        }
    }

    if (p.commands?.length) {
        console.info('Unregistering commands of plugin', p.name);
        for (const cmd of p.commands) {
            try {
                unRegisterCommand(cmd.name);
            } catch (e) {
                console.error(`Failed to unregister command ${cmd.name}\n`, e);
                return false;
            }
        }
    }

    return true;
}
