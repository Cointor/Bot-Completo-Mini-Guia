const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'user-info',
	category: 'extra',
	run: async (client, message, args) => {
const user = message.mentions.users.first();
    if(!user)
        return message.reply('Por favor, mencione el usuario sobre el que desea obtener información.');
    
    var playing = ("[ " + user.presence.activities + " ]")
    
    const whothefuq = new MessageEmbed()
          .setTitle("User Info:")
          .addField("Nombre:", `${user.tag}`)
          .addField("ID", user.id)
          .addField("Actividad",playing, true)
          .addField("Estado", `${user.presence.status}`, true)
          .addField("Joined Discord", user.createdAt)
          .setColor("#6064f4")
          .setTimestamp()
          .setThumbnail(user.avatarURL())  
      message.channel.send(whothefuq)
	},
};
