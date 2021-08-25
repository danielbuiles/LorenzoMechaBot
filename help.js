module.exports = {
  'help': {
    description: 'Muestra la lista de comandos o ayuda sobre el comando especificado.',
    format: 'help [nombre-comando]'
  },
  'servidor': {
    aliases: ['serv'],
    description: 'Verifica la conectividad con los servidores de discord.',
    format: 'servidor'
  },
  'repetir': {
    aliases: ['rep'],
    description: 'Repite lo que se dice.',
    format: 'repetir <message>'
  },
  'inspirame':{
    aliases:['ins'],
    description:'genera una frase alentadora inspiradora',
    format:'inspirame'
  },

  '$new':{
    description:'puedes agregar una palabra al vocabulario de Lorenzo',
    format:'$new <message>'
  },

  '$del':{
    description:'puedes eliminar una palabra al vocabulario de Lorenzo',
    format:'$del <number>'
  },

  '$lista':{
    aliases:['$lis'],
    description:'te muestra todas las frases guardadas en la base de datos',
    format:'$lista'
  },

  '$respuesta':{
    aliases:['$res'],
    description:'puedes desactivar el chat de mecha lorenzo si no quieres escuchar su palabras',
    format:'$respuesta <false|true>'
  }
}