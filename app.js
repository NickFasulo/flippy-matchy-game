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
const matchedCards = []

const limitedChecked = () => {
  let compare = []

  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked && !matchedCards.includes(checks[i])) {
      compare.push(checks[i])
    }
  }

  if (compare.length === 2) {
    if (compare[0].value === compare[1].value) {
      matchedCards.push(compare[0], compare[1])
      compare = []
    } else {
      compare[0].checked = false
      compare[1].checked = false
    }
  }

  if (matchedCards.length === checks.length) {
    document.getElementById('replay').style.visibility = 'visible'
  }
}

// add in if conditional based on if user clicks easy / medium / hard
// based on what they select, that array will be passed into shuffle and map function

shuffle(easyArray)

const cardStrings = easyArray
  .map((emoji, i) => {
    return `<input type="checkbox" id="cardControl${i}" name="check" value="${emoji}" onclick="return limitedChecked()"/>
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
