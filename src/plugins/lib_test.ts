import { definePlugin } from 'src/util'

export default definePlugin({
	name: 'LIBRARY TESTT',
	description: 'hi',
	authors: [{ name: 'Aria', discordId: '0' }],
	version: '1.1.1',
	type: 'library',
	patches: [
		{
			match: /(Storing new config params)/,
			replace: 'HEHHE HHA $1'
		}
	],
	start() {
		console.log('this should only run in the library')
	}
})
