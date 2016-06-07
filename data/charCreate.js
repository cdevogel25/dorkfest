//charcreate_g2 v1(es6) June 2 - June X
import {
  rin,
  attRoll
} from './lib.js'

export function charCreate() {
  let name = require('./db/names.json')
  let _ = require('lodash')

  //do stat rolls and gender
  var pChar = {
    'id': 1,
    'str': attRoll(),
    'per': attRoll(),
    'end': attRoll(),
    'chr': attRoll(),
    'int': attRoll(),
    'dex': attRoll(),
    'gen': rin(0, 1),
    'heathCur': 10,
    'healthMax': 10
  }
    //pick a random home
  pChar.home = _.sample(name.home)
    //pick names
  if (pChar.gen === 0) {
    if (pChar.home === 'topside') {
      pChar.nameFirst = _.sample(name.topside.male)
      pChar.nameLast = _.sample(name.topside.last)
    } else if (pChar.home === 'arcology') {
      pChar.nameFirst = _.sample(name.topside.male)
      pChar.nameLast = _.sample(name.topside.last)
    }
  } else if (pChar.gen === 1) {
    if (pChar.home === 'topside') {
      pChar.nameFirst = _.sample(name.topside.female)
      pChar.nameLast = _.sample(name.topside.last)
    } else if (pChar.home === 'arcology') {
      pChar.nameFirst = _.sample(name.topside.female)
      pChar.nameLast = _.sample(name.topside.last)
    }
  }
  return pChar
}
