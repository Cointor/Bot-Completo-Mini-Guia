const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	category: 'moderación',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send('No puedes banear miembros');
		}
		if (!args[0]) {
			return message.channel.send('¡Por favor mencione a un usuario!');
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		const reason = args[1] ? args.splice(1).join(' ') : 'Ninguna razón dada';

		try {
			await member.ban({ reason });
			return message.channel.send(`${member} ¡ha sido baneado!`);
		} catch (e) {
			return message.channel.send('¡El usuario no está en el servidor!');
		}
	},
};
