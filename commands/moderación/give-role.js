const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'give-role',
  category: 'moderación',
	run: async (client, message, args) => {
		message.delete();

		if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('No tienes permiso de `MANAGE_ROLES`').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0] || !args[1]) return message.channel.send('Uso incorrecto, Uso: `<username || user id> <role name || id>').then((m) => m.delete({ timeout: 5000 }));

		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

			const alreadyHasRole = member._roles.includes(roleName.id);

			if (alreadyHasRole) return message.channel.send('El usuario ya tiene ese rol').then((m) => m.delete({ timeout: 5000 }));

			const embed = new MessageEmbed()
				.setTitle(`Nombre del rol: ${roleName.name}`)
				.setDescription(`${message.author} Se a asignado con exito el rol ${roleName} a ${member.user}`)
				.setColor('#6064f4')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(new Date().toLocaleString());

			return member.roles.add(roleName).then(() => message.channel.send(embed));
		} catch (e) {
			return message.channel.send('Intenta darle un rol que exista la próxima vez ...').then((m) => m.delete({ timeout: 5000 }));
		}
	},
};
