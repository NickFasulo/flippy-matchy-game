const hardArray = [
  '🤖',
  '🤖',
  '🐞',
  '🐞',
  '🎸',
  '🎸',
  '☕',
  '☕',
  '🍀',
  '🍀',
  '🎮',
  '🎮',
  '⚓',
  '⚓',
  '🏈',
  '🏈',
  '⚡',
  '⚡',
  '⛵',
  '⛵',
  '😜',
  '😜',
  '✌',
  '✌',
  '⭐',
  '⭐',
  '🌀',
  '🌀',
  '🌈',
  '🌈',
  '🌧',
  '🌧',
  '🌴',
  '🌴',
  '🏀',
  '🏀',
  '🌻',
  '🌻',
  '😍',
  '😍',
  '🍄',
  '🍄',
  '🍔',
  '🍔',
  '🎤',
  '🎤',
  '🍩',
  '🍩',
  '🍭',
  '🍭',
  '😱',
  '😱',
  '🎈',
  '🎈',
  '🎨',
  '🎨',
  '🏖',
  '🏖',
  '🐕',
  '🐕',
  '👏',
  '👏',
  '👾',
  '👾'
]

mediumArray = hardArray.slice(0, 32)

easyArray = hardArray.slice(0, 16)

// Fisher-Yates algorithm
const shuffle = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.round(Math.random() * (i))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

shuffle(hardArray)

// add in if conditional based on if user clicks easy / medium / hard
// based on what they select, that array will be passed into map function

const cardStrings = hardArray
  .map(emoji => {
    return `<div>${emoji}</div>`
  })
  .join('')

const cardNodes = document.createRange().createContextualFragment(cardStrings)

document.getElementById('board').appendChild(cardNodes)
