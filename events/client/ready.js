module.exports = (client) => {
	const botStatus = [
		`${client.guilds.cache.size} Servidores!`,
		'&help o &h',
		` ${client.users.cache.size} Usuarios!`,
		` ${client.channels.cache.size} Canales!`,
	];

	setInterval(() => {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(status, { type: 'WATCHING' });
	}, 5000);

	client.user.setStatus('online'); // Establece el estado del bot

  console.log(`${client.user.username} | Online `);
};
