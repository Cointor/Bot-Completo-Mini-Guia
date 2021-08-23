const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'extra',
	description: 'Devuelve el Avatar',
	timeout: 10000,
	run: async (client, message, args) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
if (!member.user.avatarURL) return message.channel.send(`Ese usuario no tiene avatar`);

const cointor = new MessageEmbed() 
            .setTitle(`${member.user.username}'s Avatar`)
            .setImage( member.user.displayAvatarURL({ size: 1024, dynamic: true, format: "png" }))
             .setColor(member.displayHexColor)
            .setURL(member.user.avatarURL()) 
            .setFooter(
    (member.id === message.member.id)?`Tu foto ${member.displayName}`:`Foto de ${member.displayName}`
  );
 message.channel.send(cointor)
.catch(() => message.channel.send('**Error:** Missing permission `Embed link` '));
	},
};
