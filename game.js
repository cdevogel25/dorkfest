//g2 v0: June 2 - June X

var u = require('util')
var vorpal = require('vorpal')()
var cell = require('./data/db/setting.json')
var dialogue = require('./data/db/dialogue.json')
var dt = dialogue.topside
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

let campaign = 0
  //let state = 0

vorpal
  .delimiter(chalk.cyan.underline('>>'))
  .show()

u.log(dt.a + chalk.yellow.underline('**once**') + dt.b)

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
  .command('player', chalk.bgCyan.black('***RUN FIRST***') + ' creates character')
  .action(function(args, callback) {
    this.log(dt.c + firstName_p + ' ' + lastName_p + dt.d + home_p)
    callback()
  })

vorpal
  .command('go [direction]', 'walk in a direction')
  .action(function(args, cb) {
    let d = args.direction
    let move = null

    function Lchange() {
      location = cell.XA.locations[move]
      vorpal.log(dt.e + chalk.red(location.name))
    }
    if (d === 'right') {
      if (location.right != null) {
        move = location.right
        Lchange()
      } else {
        vorpal.log(dt.f)
      }
    } else if (d === 'left') {
      if (location.left != null) {
        move = location.left
        Lchange()
      } else {
        vorpal.log(dt.f)
      }
    } else if (d === 'back') {
      if (location.back != null) {
        move = location.back
        Lchange()
      } else {
        vorpal.log(dt.f)
      }
    } else if (d === 'forward') {
      if (location.forward === '8' && campaign === 0) {
        vorpal.log(dt.g)
        move = null
      } else if (location.forward != null) {
        move = location.forward
        Lchange()
      } else {
        vorpal.log(dt.f)
      }
    } else {
      this.log(dt.h)
    }
    //this.log('you walk to ' + chalk.red(location.name))
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
    let n = 'nothing'
    if (d === 'right') {
      if (location.right != null) {
        a = location.right
        look = cell.XA.locations[a].name
      } else {
        look = n
      }
    } else if (d === 'left') {
      if (location.left != null) {
        a = location.left
        look = cell.XA.locations[a].name
      } else {
        look = n
      }
    } else if (d === 'back') {
      if (location.back != null) {
        a = location.back
        look = cell.XA.locations[a].name
      } else {
        look = n
      }
    } else if (d === 'forward') {
      if (location.forward != null) {
        a = location.forward
        look = cell.XA.locations[a].name
      } else {
        look = n
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
    this.log(dt.i + chalk.red(location.name) + '.\n' + location.description)
    cb()
  })

vorpal
  .command('roll', 'rolls d6')
  .action(function(args, cb) {
    this.log(attRoll())
    cb()
  })

function stateChange() {
  campaign = 1
  return campaign
}
vorpal
  .command('start campaign', 'begins the story. ' + chalk.bgCyan.black('You must be at the door to begin.'))
  .action(function(args, cb) {
    if (location != cell.XA.locations[7]) {
      this.log('Go to the door to start the campaign.')
    } else {
      location = cell.XA.locations[8]
      stateChange()
    }
    cb()
  })

//choices
//dialogue
