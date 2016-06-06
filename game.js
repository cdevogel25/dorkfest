//g2 v0: June 2 - June X

//var util = require('util')
var vorpal = require('vorpal')()
var cell = require('./data/db/setting.json')
const chalk = vorpal.chalk
import {
  charCreate,
} from './data/charCreate.js'

import {
  /*rin,
  rex,
  dice,*/
} from './data/lib.js'

vorpal
  .delimiter(chalk.cyan.underline('>>'))
  .show()

let player = charCreate()
if (player.home === 'topside') {
  player.cell = cell.XA.locations[1]
} else if (player.home === 'arcology') {
  //change this once db for arcology is finished
  player.cell = cell.XA.locations[1]
}
//util.log(player.cell)

let firstName_p = chalk.green(player.nameFirst)
let lastName_p = chalk.green(player.nameLast)
let home_p = chalk.yellow(player.home)
let location = cell.XA.locations[1]

vorpal
  .command('walk [direction]', 'walk in a direction')
  .action(function(args, cb) {
    let d = args.direction
    let move = null
    if (d === 'right') {
      move = location.right
    } else if (d === 'left') {
      move = location.left
    } else if (d === 'back') {
      move = location.back
    } else if (d === 'forward') {
      move = location.forward
    }
    location = cell.XA.locations[move]
    this.log('you walk to ' + chalk.red(location.name))
    cb()
  })
vorpal
  .command('where', 'logs your location')
  .action(function(args, cb) {
    this.log('you are at ' + location.name)
    cb()
  })

//player character
vorpal
  .command('player', 'creates character')
  .action(function(args, callback) {
    this.log('Your name is ' + firstName_p + ' ' + lastName_p + ', and you are from the ' + home_p)
    callback()
  })
  //look
vorpal
  .command('look [direction]', 'look at what\'s around you')
  .action(function(args, callback) {
    let d = args.direction
    let a = null
    let look = null
    if (d === 'right') {
      if (location.right != null) {
        a = location.right
        look = cell.XA.locations[a].name
      } else {
        look = 'nothing'
      }
    } else if (d === 'left') {
      if (location.left != null) {
        a = location.left
        look = cell.XA.locations[a].name
      } else {
        look = 'nothing'
      }
    } else if (d === 'back') {
      if (location.back != null) {
        a = location.back
        look = cell.XA.locations[a].name
      } else {
        look = 'nothing'
      }
    } else if (d === 'forward') {
      if (location.forward != null) {
        a = location.forward
        look = cell.XA.locations[a].name
      } else {
        look = 'nothing'
      }
    }
    this.log(d + ' is ' + look)
    callback()
  })

//choices
//dialogue
