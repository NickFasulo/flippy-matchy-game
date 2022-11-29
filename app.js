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

// add in if conditional based on if user clicks easy / medium / hard
// based on what they select, that array will be passed into line 75

const cardStrings = hardArray
  .map(emoji => {
    return `<div>${emoji}</div>`
  })
  .join('')

const cardNodes = document.createRange().createContextualFragment(cardStrings)

document.getElementById('board').appendChild(cardNodes)

// console.log(cardNodes)

// console.log(cards)
