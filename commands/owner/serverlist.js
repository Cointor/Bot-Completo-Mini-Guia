const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'serverlist',
	category: 'owner',
	run: async (client, message, args) => {
		if (message.author.id !== '833797682380013589') {
			return message.channel.send('¡No puede usar este comando!');
		}
		if (!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.channel
          .send("No tengo permisos")
          .then(msg => msg.delete({ timeout: 5000 }));

      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `Total de Servidores - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Usuarios\nID - ${r.id}`)
          .slice(0, 10)
          .join("\n");

      let embed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("#6064f4")
        .setFooter(client.user.username)
        .setTitle(`Pagina - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send(embed);

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {
        
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total de Servidores - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Usuarios`
              )
              .slice(i0, i1)
              .join("\n");

          embed
            .setTitle(
              `Pagina - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          
          msg.edit(embed);
        }

        if (reaction._emoji.name === "➡") {
         
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total de Servidores - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Usuarios`
              )
              .slice(i0, i1)
              .join("\n");

          embed
            .setTitle(
              `Pagina - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          msg.edit(embed);
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }

        await reaction.users.remove(message.author.id);
      });
    },
};
