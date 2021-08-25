const { Client, MessageEmbed } = require('discord.js');
const Database = require("@replit/database")
const fetch = require('node-fetch');
const mantenerVivo= require('./server')
const config = require('./config');
const commands = require('./help');

const db = new Database();

const sadWords=['trite',
'gas','noo','Derrota','perder',
'ki','capas','malo','malito','pereza',
'rabia','triztesa','oe','ale','si','pa','parce','jugar','juga','forest',
'oee','oeee','yes','lol','yasuo','sera','?','bueno'];

const startCounters=[
  'Callate estoy en mi descansito',
  'Por favor silencio estoy estudiando!',
  'Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
  'eso dicen',
  'Mmmmmmmmmmmmm',
  'Mmmmmmmm',
  'Mmmm',
  'KI AL 1000%',
  'Prrrrrrrrrr',
  'Ayyy q rabi q Rabiaaaaa',
  'bnoo no se como estaran ustedes pero yo toy bien!',
  'Oeeeeeeelo',
  'No me retes escoria',
  'eructooooooooo!!! aaa no me aguante!',
  'Biip Boooop bep MechaLorenzo es el mejor ;D',
  ];

  db.get("counters").then(counters => {
    if( !counters || counters.length < 1){
      db.set("counters",startCounters);
    }
  });

  db.get("responding").then(value => {
    if(value == null){
      db.set("responding",true);
    }
  });

  function updateCounters(counterMessage){
    db.get("counters").then(counters => {
      counters.push([counterMessage])
      db.set("counters",counters)
    });
  }

  function deleteCounters(index){
    db.get("counters").then(counters => {
      if(counters.length > index){
        counters.splice(index,1)
        db.set("counters",counters)
      }
    });
  }

function getPalabra(){
  return fetch("https://zenquotes.io/api/random")
  .then(res => {
      return res.json();
  })
  .then(data => {
    return data[0]["q"]+" -  Autor:"+data[0]["a"]+"    (¡Traducir al español!)";
  });
}

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
  if(message.author.bot) return;

  db.get("responding").then(responding => {
    if(responding && sadWords.some(word => message.content.includes(word))){
    db.get("counters").then(counters => {
        const contras = counters[Math.floor(Math.random() * counters.length)];
        message.reply(contras);
      });
    }
  });

  if (message.content.startsWith(config.prefix)) {

    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case '$lista':
      case '$lis':
        db.get("counters").then(counters => {
          message.channel.send(counters);
        })
      break;

      case '$respuesta':
      case '$res':
        value = message.content.split("$respuesta ")[1];
        if(value == "true"){
          db.set("responding",true)
          message.channel.send("Yo respondere mensajes!")
        }else{
          db.set("responding",false)
          message.channel.send("me has desactivado 🤬!")
        }
      break;

      case '$new':
        counterMessage = message.content.split("$new ")[1];
        updateCounters(counterMessage);
        message.channel.send("se ha agragado tu frase a mi lista de vocabulario!");
      break;

      case '$del':
        counterMessage = parseInt(message.content.split("$del ")[1]);
        deleteCounters(counterMessage);
        message.channel.send("se ha eliminado la frase que estaba en ese indise");
      break;

      case 'ins':
      case 'inspirame':
        getPalabra().then(palabra => message.channel.send(palabra))
      break;

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

mantenerVivo();
bot.login(config.token);