import { Command } from '@types'

export let commands: { [key: string]: Command } = {}

export const find = (cb: (c: Command) => boolean) => Object.values(commands).find(cb)

export const registerCommand = (cmd: Command) => {
	if (commands[cmd.name]) throw Error(`Name ${cmd.name} already exists boy`)
	steamed.Webpack.Common.i18n.m_mapTokens.set(
		`SteamedSlashCommandDescription_${cmd.name}`,
		cmd.description
	)
	commands[cmd.name] = cmd
}
export const unRegisterCommand = (name: string) => {
	let value
	commands[name]
		? (delete commands[name],
		  steamed.Webpack.Common.i18n.m_mapTokens.delete(`SteamedSlashCommandDescription_${name}`),
		  (value = true))
		: (value = false)
	return value
}

export const processCommand = (thisObj: any) => {
	if (!thisObj.state.messageInput.startsWith('/')) return
	let message: string = thisObj.state.messageInput
	let [cmd, ...cmdArgs] = message.slice(1).split(' ')
	console.log(cmd, cmdArgs, steamed.Webpack.Common.MessageClass)

	let command = find((c) => c.name.toLowerCase().includes(cmd.toLowerCase()))
	if (!command) return

	let result

	try {
		//ill figure out async later
		result = command.execute(cmdArgs, this)
	} catch (e: any) {
		result = {
			send: false,
			result: `An error occurred while executing the command: ${e.message}.\nCheck the console for more details.`
		}

		console.error('An error occurred while executing command %s: %o', command.name, e)
	}

	if (!result || !result.result) {
		return
	}

	if (result.send) {
		thisObj.state.messageInput = result.result
	} else {
		thisObj.state.messageInput = ''
		const msg = new steamed.Webpack.Common.MessageClass(
			-1,
			g_FriendsUIApp.m_CMInterface.GetServerRTime32(),
			result.result
		)
		//idk how to change avatar and stuff
		thisObj.props.chatView.chat.InternalAppendChatMsg(msg)
		thisObj.setState({ ...thisObj.state, messageInput: '' })
	}
}
