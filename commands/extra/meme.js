const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'meme',
	category: 'extra',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/memes';

		let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return message.channel.send('Ocurrió un error, Puedes intentarlo nuevamente.');
		}

		const embed = new MessageEmbed()
			.setTitle('Random Meme: ')
			.setColor('#6064f4')
			.setImage(response.image);

		return message.channel.send(embed);
	},
};
