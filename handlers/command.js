const glob = require('fast-glob');
const { resolve } = require('path');

module.exports = async (client) => {
	const commandFiles = await glob(`${__dirname}/../commands/**/*.js`);
	for (const commandFile of commandFiles) {
		const command = require(resolve(commandFile));

		if (!command.name) {
			throw Error(`${command} falta una clave de nombre`);
		}
		if (!command.run || (typeof command.run !== 'function')) {
			throw Error(`${command.name} le falta una función de ejecución`);
		}

		client.commands.set(command.name, command);
	}
};
