module.exports = async (member) => {
	const channel = member.guild.channels.cache.find((ch) => ch.name === 'goodbye');
	if (!channel) return;

	channel.send(`Goodbye, ${member}!`);
};
