const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'eval',
	run: async (client, message, args) => {
		if (message.author.id !== 'TU ID') return;
		const embed = new MessageEmbed()
			.setTitle('Evaluando...');
		const msg = await message.channel.send(embed);
		try {
			const data = eval(args.join(' ').replace(/```/g, ''));
			embed
				.setTitle('Output: ')
				.setDescription(await data);
			await msg.edit(embed);
			await msg.react('✅');
			await msg.react('❌');
			const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
			msg.awaitReactions(filter, { max: 1 })
				.then((collected) => {
					collected.forEach((emoji) => {
						switch (emoji._emoji.name) {
						case '✅':
							msg.reactions.removeAll();
							break;
						case '❌':
							msg.delete();
							break;
						}
					});
				});
		} catch (e) {
			embed
				.setTitle('Ha ocurrido un error');
			return msg.edit(embed);
		}
	},
};
