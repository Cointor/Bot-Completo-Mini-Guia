const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'randomuser',
	category: 'extra',
	run: async (client, message, args) => {
let member = message.guild.members.cache.filter(m => m.user != m.user.bot).random();
let memberAvatar = member.user.displayAvatarURL({ dynamic: true, size: 2048 });
let memberTag = member.user.tag;
let memberID = member.user.id;
const embedRandomMember= new MessageEmbed()
  .setTitle(memberTag)
  .setThumbnail(memberAvatar)
  .setDescription(`ID: **${memberID}** \n User: <@${memberID}>`)
  .setColor("#6064f4")
message.channel.send(embedRandomMember);
	},
};
