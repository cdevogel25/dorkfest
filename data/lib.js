var ranIn = function(min, max) { //inclusive random integer
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/*var ranEx = function(min, max) { //exclusive random integer
  return Math.floor((Math.random() * max) + min)
}*/

export function rin(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function rex(max, min) {
  return Math.floor((Math.random() * max) + min)
}

export function dice(type) {
  if (type === 'd4') {
    return ranIn(1, 4)
  } else if (type === 'd6') {
    return ranIn(1, 6)
  } else if (type === 'd8') {
    return ranIn(1, 8)
  } else if (type === 'd10') {
    return ranIn(1, 10)
  } else if (type === 'd12') {
    return ranIn(1, 12)
  } else if (type === 'd20') {
    return ranIn(1, 20)
  } else if (type === 'dPer') {
    return ranIn(1, 10) * 10
  } else {
    return 'Which die do you want to use?'
  }
}
export function attRoll() {
  var one = ranIn(1, 20)
  var two = ranIn(1, 20)
  var three = ranIn(1, 20)
  if (one >= two && one >= three) {
    return one
  } else if (two >= one && two >= three) {
    return two
  } else if (three >= two && three >= one) {
    return three
  }
}
