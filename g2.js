//g2 v0: June 2 - June X

var util = require('util')
import {
  charCreate,
} from './data/charCreate.js'

import {
  rin,
  rex,
  dice,
} from './data/lib.js'

let player = charCreate()

util.log('Your name is ' + player.nameFirst + ' ' + player.nameLast + ', and you are from the ' + player.home)

//choices
//dialogue
