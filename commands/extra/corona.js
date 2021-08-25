const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'corona',
	category: 'extra',
	run: async (client, message, args) => {
		const baseUrl = 'https://corona.lmao.ninja/v2';

		let url; let response; let
			corona;

		try {
			url = args[0] ? `${baseUrl}/countries/${args[0]}` : `${baseUrl}/all`;
			response = await axios.get(url);
			corona = response.data;
		} catch (error) {
			return message.channel.send(`**${args[0]}** No existe o no se están recopilando datos`);
		}

		const embed = new MessageEmbed()
			.setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total de casos de Covid 19 en todo el mundo')
			.setColor('#6064f4')
			.setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
			.addFields(
				{
					name: 'Total de Casos:',
					value: corona.cases.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total de Muertes:',
					value: corona.deaths.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total de Recuperado:',
					value: corona.recovered.toLocaleString(),
					inline: true,
				},
				{
					name: 'Casos Activos:',
					value: corona.active.toLocaleString(),
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Casos críticos:',
					value: corona.critical.toLocaleString(),
					inline: true,
				},
				{
					name: 'Recuperaciones de hoy:',
					value: corona.todayRecovered.toLocaleString().replace('-', ''),
					inline: true,
				},
				{
					name: 'Muertes de hoy:',
					value: corona.todayDeaths.toLocaleString(),
					inline: true,
				},
			);

		return message.channel.send(embed);
	},
};
