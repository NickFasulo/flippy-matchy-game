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

const checks = document.getElementsByName('check')

const limitedChecked = () => {
  let count = 0

  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked === true) count++
  }

  if (count > 2) {
    alert('Can only flip two cards at once')
    return false
  }
}

// add in if conditional based on if user clicks easy / medium / hard
// based on what they select, that array will be passed into shuffle and map function

shuffle(hardArray)

const cardStrings = hardArray
  .map((emoji, i) => {
    return `<input type="checkbox" id="cardControl${i}" name="check" onclick="return limitedChecked()"/>
              <label class="card" for="cardControl${i}">
                <div class="content">
                  <div class="front">
                  </div>
                  <div class="back">
                    ${emoji}
                  </div>
                </div>
              </label>`
  })
  .join('')

const cardNodes = document.createRange().createContextualFragment(cardStrings)

document.getElementById('board').appendChild(cardNodes)
