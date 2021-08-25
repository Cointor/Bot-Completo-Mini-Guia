module.exports = {
	name: 'offbot',
	category: 'owner',
	run: async (client, message, args) => {
		if (message.author.id !== 'TU ID') {
			return message.channel.send('¡No puede usar este comando!');
		}
		await message.channel.send('Apagando bot...');
		return process.exit();
	},
};
