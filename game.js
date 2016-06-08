//g2 v0: June 2 - June X

var u = require('util')
var vorpal = require('vorpal')()
var cell = require('./data/db/setting.json')
var dialogue = require('./data/db/dialogue.json')
var dt = dialogue.topside
var c = require('./data/db/containers.json')
var cont = c.container
var inv = []
const chalk = vorpal.chalk
import {
  charCreate,
} from './data/charCreate.js'

import {
  /*rin,
  rex,
  dice,*/
  attRoll,
  vlog
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
      vlog(dt.e + chalk.red(location.name))
    }
    if (d === 'right') {
      if (location.right != null) {
        move = location.right
        Lchange()
      } else {
        vlog(dt.f) // ;)
      }
    } else if (d === 'left') {
      if (location.left != null) {
        move = location.left
        Lchange()
      } else {
        vlog(dt.f)
      }
    } else if (d === 'back') {
      if (location.back != null) {
        move = location.back
        Lchange()
      } else {
        vlog(dt.f)
      }
    } else if (d === 'forward') {
      if (location.forward === '8' && campaign === 0) {
        vlog(dt.g)
        move = null
      } else if (location.forward != null) {
        move = location.forward
        Lchange()
      } else {
        vlog(dt.f)
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
    vlog('str: ' + player.str + ',\nper: ' + player.per + ',\nend: ' + player.end + ',\nchr: ' + player.chr + ',\nint: ' + player.int + ',\ndex: ' + player.dex)
    vlog('Health: ' + player.heathCur + '/' + player.healthMax)
    cb()
  })

vorpal
  .command('fight')
  .action(function(args, cb) {
    const self = this
      //this.delimiter(chalk.red.underline('>>'))
    this.prompt({
      type: 'input',
      name: 'decide',
      message: chalk.red.underline('>>') + ' Are you sure? [y/n] ',
    }, function(result) {
      if (result.decide === 'y') {
        //state === 1
        self.log('Fight: Start')
        cb()
          //this.delimiter(chalk.cyan.underline('>>'))
      } else {
        self.log('Maybe later?')
        cb()
          //this.delimiter(chalk.cyan.underline('>>'))
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
      this.log(dt.j)
    } else {
      location = cell.XA.locations[8]
      stateChange()
    }
    cb()
  })

vorpal
  .command('take <item> [container]', 'puts items in your inventory')
  .action(function(args, cb) {
    var isThere = null
    if (args.container === undefined) {
      this.prompt({
        type: 'input',
        name: 'check',
        default: null,
        message: dt.k
      }, function(result) {
        isThere = result.check
        if (result.check === 'check') {
          check()
          cb()
        } else {
          take()
          cb()
        }
      })
    } else {
      take()
      cb()
    }
    //let containers = ph
    var i = c.container.length - 1
      //log containers @ current cell IF no container specified

    function check() {
      for (i; i >= 0; i--) {
        if (cont[i].room === location.name) {
          vlog(cont[i].name)
        }
      }
    }

    function take() {
      for (i; i >= 0; i--) {
        if (cont[i].room === location.name && (cont[i].name === isThere || cont[i].name === args.container)) {
          var b = cont[i].contents.length - 1
          for (b; b >= 0; b--) {
            if (cont[i].contents[b] === args.item) {
              inv.push(args.item)
            } else {
              this.log(dt.l)
            }
          }
        }
      }
    }
    //determine if inventory is full
    //remove item from contents array, update .json file? [NOT YET. FOR NOW JUST CREATE ARRAY & UPDATE]
  })

vorpal
  .command('inv', 'displays your inventory')
  .action(function(args, cb) {
    this.log(inv)
    cb()
  })

//u.log(location.name)


//choices
//dialogue
