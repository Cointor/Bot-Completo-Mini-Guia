const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'mc',
	category: 'extra',
	description: 'Texto Minecraft',
	timeout: 10000,
	run: async (client, message, args) => {
    const superagent = require('superagent')
try {
let text = args.join(" ");
 if (!text) return message.channel.send("Pon un texto al logro"); 
 if (text.length > 23) return message.channel.send("El logro solo puede contener hasta 23 carácteres."); 
 if (text.length < 2) return message.channel.send("El logro debe de contener más de 2 palabras."); 
  
let links = ["https://www.minecraftskinstealer.com/achievement/a.php?i=38", "https://www.minecraftskinstealer.com/achievement/a.php?i=1", "https://www.minecraftskinstealer.com/achievement/a.php?i=21", "https://www.minecraftskinstealer.com/achievement/a.php?i=20", "https://www.minecraftskinstealer.com/achievement/a.php?i=13", "https://www.minecraftskinstealer.com/achievement/a.php?i=18", "https://www.minecraftskinstealer.com/achievement/a.php?i=17", "https://www.minecraftskinstealer.com/achievement/a.php?i=9", "https://www.minecraftskinstealer.com/achievement/a.php?i=31", "https://www.minecraftskinstealer.com/achievement/a.php?i=22", "https://www.minecraftskinstealer.com/achievement/a.php?i=23", "https://www.minecraftskinstealer.com/achievement/a.php?i=2", "https://www.minecraftskinstealer.com/achievement/a.php?i=11", "https://www.minecraftskinstealer.com/achievement/a.php?i=19", "https://www.minecraftskinstealer.com/achievement/a.php?i=33", "https://www.minecraftskinstealer.com/achievement/a.php?i=34", "https://www.minecraftskinstealer.com/achievement/a.php?i=26", "https://www.minecraftskinstealer.com/achievement/a.php?i=35", "https://www.minecraftskinstealer.com/achievement/a.php?i=6", "https://www.minecraftskinstealer.com/achievement/a.php?i=7", "https://www.minecraftskinstealer.com/achievement/a.php?i=10", "https://www.minecraftskinstealer.com/achievement/a.php?i=39", "https://www.minecraftskinstealer.com/achievement/a.php?i=4", "https://www.minecraftskinstealer.com/achievement/a.php?i=5", "https://www.minecraftskinstealer.com/achievement/a.php?i=28"] 
 
const { body } = await superagent
.get(links[Math.floor(Math.random() * links.length)])
.query({
  h: '¡Logro desbloqueado!',
  t: text
});
  
message.channel.send({ files: [{ attachment: body, name: 'logro.png' }] 
                      
});
} catch (err) {
console.log(err)
}

	},
};
