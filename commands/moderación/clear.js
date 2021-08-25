const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	category: 'moderación',
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.channel.send(
				`No tienes los permisos correctos para realizar esta acción. ${message.author.username}`, 
			);
		}
		if (!args[0]) {
			return message.channel.send('Ingrese una cantidad de 1 a 100');
		}

		let deleteAmount = parseInt(args[0], 10);

		if (Number.isNaN(deleteAmount)) {
			return message.channel.send('Ingrese una cantidad de 1 a 100');
		}

	
		if (deleteAmount > 100) {
			deleteAmount = 100;
		} else {
			deleteAmount = parseInt(args[0], 10);
		}

		await message.channel.bulkDelete(deleteAmount, true);

		const embed = new MessageEmbed()
			.setTitle(`${message.author.username}`)
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription(`Eliminado con éxito **${deleteAmount}**`)
			.setFooter(message.author.username, message.author.displayAvatarURL())
			.setColor('#6064f4');
		return message.channel.send(embed);
	},
};
