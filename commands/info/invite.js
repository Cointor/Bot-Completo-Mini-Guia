const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	category: 'info',
	description: 'Devuelve el numero de invitacions x usuario',
	timeout: 10000,
	run: async (client, message, args) => {
        try {
            let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

            let invites = await message.guild.fetchInvites()

            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                return message.channel.send(`**${member.displayName} ¡No invito a nadie al servidor!**`, (member === message.member ? null : member));
  {}          }

            let content = memberInvites.map(i => i.code).join("\n");
            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            let embed = new MessageEmbed()
                .setColor("#6064f4")
                .setFooter(message.guild.name, message.guild.iconURL())
                .setAuthor(`Rastreador de invitaciones para ${message.guild.name}`)
                .setDescription(`Información sobre invitaciones  **${member.displayName}**`)
                .addField("**No. Personas invitadas**", index)
                .addField("Códigos de invitación\n\n", content);
            message.channel.send(embed);
        } catch (e) {
            return message.channel.send(e.message)
        }
	},
};
