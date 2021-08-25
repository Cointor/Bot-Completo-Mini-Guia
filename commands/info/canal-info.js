const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'canal-info',
	category: 'info',
	description: 'Muestra información del canal',
	timeout: 10000,
	run: async (client, message, args) => {
let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**¡Canal no encontrado!**");

        let channelembed = new MessageEmbed()
            .setTitle(`Información del canal para ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW:**", channel.nsfw, true)
            .addField("**ID del Canal:**", channel.id, true)
            .addField("**Tipo de canal:**", channel.type)
            .addField("**Descripción del canal**", `${channel.topic || "Sin descripción"}`)
            .addField("**Canal creado en**", channel.createdAt)
            .setColor("#6064f4")
        message.channel.send(channelembed);

	},
};
