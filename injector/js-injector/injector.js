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

function iframeURLChange(iframe, callback) {
	var unloadHandler = function () {
		// Timeout needed because the URL changes immediately after
		// the `unload` event is dispatched.
		setTimeout(function () {
			callback(iframe.contentWindow.location.href);
		}, 0);
	};

	function attachUnload() {
		// Remove the unloadHandler in case it was already attached.
		// Otherwise, the change will be dispatched twice.
		iframe.contentWindow.removeEventListener('unload', unloadHandler);
		iframe.contentWindow.addEventListener('unload', unloadHandler);
	}

	iframe.addEventListener('load', attachUnload);
	attachUnload();
}

const main = async () => {
	document.currentScript.src = 'hehehe';
	const steamedDist = await (await fetch('./steamed.js')).text();
	// eval(await (await fetch('https://code.jquery.com/jquery-3.6.1.min.js')).text());

	iframeURLChange(document.getElementById('tracked_frame_friends_chat'), function (newURL) {
		console.log('URL changed:', newURL);
		const goodWindow = document.getElementById('tracked_frame_friends_chat').contentWindow;
		goodWindow.steamedDist = steamedDist;
		goodWindow.reload = () => location.reload();
		goodWindow.eval(steamedDist);
		fetch('http://localhost:8080/shutdown');
	});
};

main().catch(err => console.error(err));
