/*
 * Steamed, a modification for the Steam Client
 * Copyright (c) 2023 Syncxv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { registerCommand, unRegisterCommand } from '@api/commands';
import { registerSetting, unregisterSetting } from '@api/settings/PluginSections';
import { Plugin } from '@src/types';
import { addPopupCreatedCallback, insertCss } from '@utils';
import Plugins from 'plugins';

export const plugins = Plugins;

export const isPluginEnabled = (plugin: Plugin) =>
	!JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(plugin.name);

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
	} else {
		p.started = true;
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

	if (p.settingsComponent) {
		console.info('Registering settings for', p.name);
		try {
			registerSetting(p.settingsComponent);
		} catch (e) {
			console.error(`Failed to register settings for ${p.name}\n`, e);
			return false;
		}
	}

	if (p.css) {
		addPopupCreatedCallback(
			popup => {
				p.styleIds.push(insertCss(p.css!, popup.window.document));
			},
			{ runOnOpenedPopups: true }
		);
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

	if (p.settingsComponent) {
		console.info('Unregistering settings for', p.name);
		try {
			unregisterSetting(p.settingsComponent.identifier);
		} catch (e) {
			console.error(`Failed to Unregister settings for ${p.name}\n`, e);
			return false;
		}
	}

	for (const popup of g_PopupManager.m_mapPopups.values()) {
		for (const id of p.styleIds) {
			popup.window.document.getElementById(id)?.remove();
		}
	}

	return true;
}
