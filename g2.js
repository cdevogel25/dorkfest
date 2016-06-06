//g2 v0: June 2 - June X

//var util = require('util')
var vorpal = require('vorpal')()
var location = require('./data/db/setting.json')
import {
  charCreate,
} from './data/charCreate.js'

import {
  /*rin,
  rex,
  dice,
  move*/
} from './data/lib.js'

vorpal
  .delimiter('vorpal$')
  .show()

function move(dir) {
  //var location = require('./db/data/setting.json')
  if (dir === 'left') {
    if (left != 'nothing') {
      player.cell = left
    } else {
      vorpal.log('you cannot move that way')
    }
  } else if (dir ==='right') {
    if (right != 'nothing') {
      player.cell = right
    } else {
      vorpal.log('you cannot move that way')
    }
  } else if (dir === 'forward') {
    if (forward != 'nothing') {
      player.cell = forward
    } else {
      vorpal.log('you cannot move that way')
    }
  } else if (dir === 'back') {
    if (back != 'nothing') {
      player.cell = back
    } else {
      vorpal.log('you cannot move that way')
    }
  }
}

let player = charCreate()
if (player.home === 'topside') {
  player.cell = location.topside.home.bedroom
} else if (player.home === 'arcology') {
  //change this once db for arcology is finished
  player.cell = location.topside.home.bedroom
}
//util.log(player.cell)
let back = player.cell.back
let forward = player.cell.forward
let left = player.cell.left
let right = player.cell.right

let cell = player.cell
//player character
vorpal
  .command('player', 'creates character')
  .action(function(args, callback) {
    this.log('Your name is ' + player.nameFirst + ' ' + player.nameLast + ', and you are from the ' + player.home)
    callback()
  })
  //look
vorpal
  .command('look', 'inspect your surroundings')
  .action(function(args, callback) {
    this.log('To your right, there is ' + right + ', to your left is ' + left + ', behind you is ' + back + ', and in front of you is ' + forward)
    callback()
  })
  //move
vorpal
  .command('walk to [cell]', 'moves to ...')
  .action(function(args, callback) {
    move('cell')
    this.log('You walk to' + cell)
    //player.cell = cell
    callback()
  })

//choices
//dialogue
