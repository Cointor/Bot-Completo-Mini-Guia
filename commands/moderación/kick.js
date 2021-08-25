const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	category: 'moderación',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('No puedes expulsar miembros');
		}
		if (!args[0]) {
			return message.channel.send('¡Por favor mencione a un usuario!');
		}
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		try {
			await member.kick();
			return message.channel.send(`${member} ha sido pateado!`);
		} catch (e) {
			return message.channel.send('¡El usuario no está en este servidor!');
		}
	},
};
