const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}Espiando`,
      type: 'LISTENING'
    }
  }
});

bot.on('ready', () => console.log(`En linea: ${bot.user.tag}.`));

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case 'serv':
      case 'servidor':
        let msg = await message.reply('Pinging...');
        await msg.edit(`El viaje de ida y vuelta del mensaje tomó 114 ms. ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      case 'rep':
      case 'repetir':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('No enviaste un mensaje para repetir, comando cancelado.')
        break

      /* Unless you know what you're doing, don't change this command. */
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('Menu De Ayuda')
          .setColor('GREEN')
          .setFooter(`Peticion: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMANDO - ${command}`)

            if (commands[command].aliases)
              embed.addField('Alias de comando', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPCION', commands[command].description)
              .addField('FORMATO', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);