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
  }
}