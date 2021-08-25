const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const ms = require('ms');

module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'info',
	description: 'Devuelve todos los comandos o la información de un comando específico',
	usage: '[comando | alias]',
	run: async (client, message, args) => {
		if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		return getAll(client, message);
	},
};

function getAll(client, message) {
	const embed = new MessageEmbed().setAuthor(`${message.author.username}, Comandos solicitados:
 `, message.author.displayAvatarURL()).setColor('#6064f4').setThumbnail(client.user.displayAvatarURL());

	const commands = (category) => client.commands
		.filter((cmd) => cmd.category === category)
		.map((cmd) => `- \`${cmd.name}\``)
		.join(' ');

	const info = client.categories
		.map(
			(cat) => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** (${client.commands.filter((cmd) => cmd.category === cat).size}) : \n${commands(
				cat,
			)}`,
		)
		.reduce((string, category) => `${string}\n${category}`);
	embed.setFooter(`Existen ${client.commands.size} comandos`, message.author.displayAvatarURL());
	return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	const cmd = client.commands.get(input.toLowerCase())
        || client.commands.get(client.aliases.get(input.toLowerCase()));

	let info = `No se encontró información para el comando  **${input.toLowerCase()}**`;

	if (!cmd) {
		return message.channel.send(embed.setColor('#fb644c').setAuthor(`${message.author.username}, Comandos solicitados:`, message.author.displayAvatarURL()).setFooter(message.author.username, message.author.displayAvatarURL()).setDescription(info)
			.setThumbnail(client.user.displayAvatarURL()));
	}

	if (cmd.name) info = `**Nombre del comando:** ${cmd.name}`;
	if (cmd.aliases) info += `\n**alias**: ${cmd.aliases.map((a) => `\`${a}\``).join(', ')}`;
	if (cmd.description) info += `\n**Descripción**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Uso**: ${cmd.usage}`;
		embed.setFooter('Sintaxis: <> = requerido, [] = Opcional');
	}
	if (cmd.timeout) info += `\n**Se acabó el tiempo**: ${ms(cmd.timeout)}`;
	return message.channel.send(embed.setColor('#6064f4').setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setDescription(info).setFooter(message.author.username, message.author.displayAvatarURL())
		.setThumbnail(client.user.displayAvatarURL()));
}
