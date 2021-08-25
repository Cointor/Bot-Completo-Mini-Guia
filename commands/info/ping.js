const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	category: 'info',
	description: 'Devuelve latencia y API Ping',
	timeout: 10000,
	run: async (client, message, args) => {
		const msg = await message.channel.send('Ping...');
		const Embed = new MessageEmbed()
			.setTitle('Pong!')
			.setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
			.setDescription(
				`⌛ La latencia es ${Math.floor(
					msg.createdTimestamp - message.createdTimestamp,
				)}ms\n⏲️ API Ping es ${Math.round(client.ws.ping)}`,
			)
			.setColor('#6064f4');
		await msg.edit('\<a:discord:875144770719186985>');
		return msg.edit(Embed);
	},
};
