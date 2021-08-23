const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'dog',
	category: 'animales',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/animals/dog';

		let image;
		let fact;
		try {
			const { data } = await axios.get(url);
			image = data.image;
			fact = data.fact;
		} catch (e) {
			return message.channel.send('Ocurrió un error, Puedes intentarlo nuevamente.');
		}

		const embed = new MessageEmbed()
			.setTitle('Imagen aleatoria de un perro :dog:')
			.setColor('#6064f4')
			.setDescription(fact)
			.setImage(image);

		return message.channel.send(embed);
	},
};
