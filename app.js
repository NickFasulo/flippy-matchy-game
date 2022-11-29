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
    const j = Math.round(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// add in if conditional based on if user clicks easy / medium / hard
// based on what they select, that array will be passed into shuffle and map function

shuffle(hardArray)

const cardStrings = hardArray
  .map(emoji => {
    return `<div class="card">
              <div class="content">
                <div class="front">
                </div>
                <div class="back">
                  ${emoji}
                </div>
              </div>
            </div>`
  })
  .join('')

const cardNodes = document.createRange().createContextualFragment(cardStrings)

document.getElementById('board').appendChild(cardNodes)
