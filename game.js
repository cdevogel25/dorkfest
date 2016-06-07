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
  attRoll
} from './data/lib.js'

//let state = 0

vorpal
  .delimiter(chalk.cyan.underline('>>'))
  .show()


/*if (state === 0) {
  vorpal.delimiter(chalk.cyan.underline('>>'))
    .show()
} else if (state === 1) {
  vorpal.delimiter(chalk.red.underline('>>'))
    .show()
}*/

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

//player character
vorpal
  .command('player', '***RUN FIRST*** creates character')
  .action(function(args, callback) {
    this.log('Your name is ' + firstName_p + ' ' + lastName_p + ', and you are from the ' + home_p)
    callback()
  })

vorpal
  .command('go [direction]', 'walk in a direction')
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
  /*vorpal
    .command('where', 'logs your location')
    .action(function(args, cb) {
      this.log('you are at ' + location.name)
      cb()
    })*/
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

vorpal
  .command('stats', 'displays player stats')
  .action(function(args, cb) {
    vorpal.log('str: ' + player.str + ',\nper: ' + player.per + ',\nend: ' + player.end + ',\nchr: ' + player.chr + ',\nint: ' + player.int + ',\ndex: ' + player.dex)
    vorpal.log('Health: ' + player.heathCur + '/' + player.healthMax)
    cb()
  })

vorpal
  .command('fight')
  .action(function(args, cb) {
    const self = this
    this.prompt({
      type: 'input',
      name: 'decide',
      message: chalk.red.underline('>>') + ' Are you sure? [y/n] ',
    }, function(result) {
      if (result.decide === 'y') {
        //state === 1
        self.log('Fight: Start')
        cb()
      } else {
        self.log('Maybe later?')
        cb()
      }
    })
  })

vorpal
  .command('describe', 'describes your surrounding')
  .action(function(args, cb) {
    this.log('You are in ' + chalk.red(location.name) + '.\n' + location.description)
    cb()
  })

vorpal
  .command('roll', 'best three/four d6 roll')
  .action(function(args, cb){
    this.log(attRoll())
    cb()
  })

//choices
//dialogue
