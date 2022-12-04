const hardArray = [
  '😜',
  '😜',
  '🐞',
  '🐞',
  '🍩',
  '🍩',
  '🤙',
  '🤙',
  '☕',
  '☕',
  '🍀',
  '🍀',
  '🌀',
  '🌀',
  '⚓',
  '⚓',
  '⚡',
  '⚡',
  '⛵',
  '⛵',
  '🤖',
  '🤖',
  '✌',
  '✌',
  '⭐',
  '⭐',
  '🔥',
  '🔥',
  '🌧',
  '🌧',
  '🌴',
  '🌴',
  '🌻',
  '🌻',
  '😍',
  '😍',
  '🍄',
  '🍄',
  '🌈',
  '🌈',
  '🍔',
  '🍔',
  '🍭',
  '🍭',
  '😱',
  '😱',
  '💰',
  '💰'
]

const easyArray = hardArray.slice(0, 18)
const mediumArray = hardArray.slice(0, 32)

const replay = document.getElementById('replay')
const newLevel = document.getElementById('new-level')

// sound bites
const flipSound = document.getElementById('flip-sound')
const failSound = document.getElementById('fail-sound')
const buttonSound = document.getElementById('button-sound')
const victorySound = document.getElementById('victory-sound')

replay.addEventListener('mouseover', () => buttonSound.play())
newLevel.addEventListener('mouseover', () => buttonSound.play())

// Fisher-Yates algorithm
const shuffle = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.round(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

let triesCount = document.getElementById('tries').innerHTML
const checks = document.getElementsByName('check')
const matchedCards = []
const flipTime = 750

// show cards on page load
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = true
  }

  setTimeout(() => {
    for (let i = 0; i < checks.length; i++) {
      checks[i].checked = false
    }
  }, 1000)
})

const cardFlip = () => {
  const checkedLength = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length
  let compare = []

  flipSound.play()

  for (let i = 0; i < checks.length; i++) {
    if (
      !matchedCards.includes(checks[i]) &&
      checkedLength - matchedCards.length > 2
    ) {
      checks[i].checked = false
    }
    if (!matchedCards.includes(checks[i]) && checks[i].checked) {
      compare.push(checks[i])
    }
  }

  if (compare.length === 2) {
    if (compare[0].value === compare[1].value) {
      compare[0].disabled = true
      compare[1].disabled = true
      matchedCards.push(compare[0], compare[1])
      compare = []
    } else {
      triesCount++
      tries.innerHTML = triesCount
      setTimeout(() => {
        compare[0].checked = false
        compare[1].checked = false
        failSound.play()
      }, flipTime)
    }
  }

  if (matchedCards.length === checks.length) {
    document.getElementById('nice').style.display = 'inline'
    document.getElementById('replay').style.display = 'inline'
    victorySound.play()
  }
}

const query = parent.document.URL.match(/\?(.*)/g)[0]
const board = document.getElementById('board')
let selectedArray

if (query === '?easy') {
  selectedArray = easyArray
  board.classList.add('easy')
}
if (query === '?medium') {
  selectedArray = mediumArray
  board.classList.add('medium')
}
if (query === '?hard') {
  selectedArray = hardArray
  board.classList.add('hard')
}

shuffle(selectedArray)

const cardStrings = selectedArray
  .map((emoji, i) => {
    return `<input type="checkbox" id="cardControl${i}" name="check" value="${emoji}" onclick="return cardFlip()"/>
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
board.appendChild(cardNodes)
