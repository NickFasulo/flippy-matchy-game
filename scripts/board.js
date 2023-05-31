const selectedCatergory = localStorage.getItem('category')
const arrayCategory = JSON.parse(localStorage.getItem(selectedCatergory))

const shuffle = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.round(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const shuffledPairs = shuffle(arrayCategory).flat()

const easyArray = shuffledPairs.slice(0, 18)
const mediumArray = shuffledPairs.slice(0, 32)
const hardArray = shuffledPairs.slice(0, 48)

const easyLowestTries = localStorage.getItem('easyLowestTries')
const mediumLowestTries = localStorage.getItem('mediumLowestTries')
const hardLowestTries = localStorage.getItem('hardLowestTries')

const easyHighestCombo = localStorage.getItem('easyHighestCombo')
const mediumHighestCombo = localStorage.getItem('mediumHighestCombo')
const hardHighestCombo = localStorage.getItem('hardHighestCombo')

const keepRevealed = localStorage.getItem('keepRevealed')

const playMusic = localStorage.getItem('playMusic')
const musicVolume = localStorage.getItem('musicVolume')

const replay = document.getElementById('replay')
const newLevel = document.getElementById('new-level')

// sound bites
const flipSound = document.getElementById('flip-sound')
const failSound = document.getElementById('fail-sound')
const buttonSound = document.getElementById('button-sound')
const victorySound = document.getElementById('victory-sound')
const comboSound = document.getElementById('combo-sound')
const music = document.getElementById('music')

const speaker = document.getElementById('speaker')
const mute = document.getElementById('mute')

music.volume = musicVolume

playMusic === 'true'
  ? (music.play(), (mute.style.display = 'none'))
  : (music.pause(), (speaker.style.display = 'none'))

speaker.onclick = () => {
  music.pause()
  speaker.style.display = 'none'
  mute.style.display = 'initial'
  localStorage.setItem('playMusic', false)
}

mute.onclick = () => {
  music.play()
  mute.style.display = 'none'
  speaker.style.display = 'initial'
  localStorage.setItem('playMusic', true)
}

replay.addEventListener('mouseover', () => buttonSound.play())
newLevel.addEventListener('mouseover', () => buttonSound.play())

let triesCount = document.getElementById('tries').innerHTML
let comboCount = document.getElementById('combo').innerHTML
let comboHighScore = 0
const checks = document.getElementsByName('check')
const matchedCards = []
const revealTime = 2000
const flipTime = 750

// show cards on page load
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = true
  }

  if (keepRevealed === 'false') {
    setTimeout(() => {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false
      }
      failSound.play()
    }, revealTime)
  }
})

// select array based on what query string is passed in
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

const cardFlip = () => {
  const checkedLength = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length
  let compare = []
  let currentTries = triesCount

  flipSound.play()

  // because of side effect from the if statement on line 113,
  // re-enable card if not being compared or not already matched
  for (let i = 0; i < checks.length; i++) {
    if (!matchedCards.includes(checks[i]) && !compare.includes(checks[i])) {
      checks[i].disabled = false
    }
  }

  for (let i = 0; i < checks.length; i++) {
    // prevent from being able to flip over more than 2 cards at once
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

  // if only one card in comparison array, prevent from being able to flip back over
  if (compare.length === 1) {
    compare[0].disabled = true
  }

  if (compare.length === 2) {
    if (compare[0].value === compare[1].value) {
      compare[0].disabled = true
      compare[1].disabled = true
      matchedCards.push(compare[0], compare[1])
      compare = []
      if (currentTries === triesCount) {
        comboCount++
        combo.innerHTML = comboCount
        if (comboHighScore < comboCount) {
          comboHighScore = comboCount
        }
      }
      if (comboCount > 1) {
        comboSound.play()
        document.getElementById('combo-message').style.display = 'inline'
        setTimeout(() => {
          document.getElementById('combo-message').style.display = 'none'
        }, 1250)
      }
    } else {
      triesCount++
      tries.innerHTML = triesCount
      comboCount = 0
      combo.innerHTML = comboCount
      setTimeout(() => {
        compare[0].checked = false
        compare[1].checked = false
        failSound.play()
      }, flipTime)
    }
  }

  // set high scores (lowest # of tries and highest combo) for current difficulty if win condition is met
  if (matchedCards.length === checks.length) {
    if (query === '?easy') {
      if (easyLowestTries > triesCount) {
        localStorage.setItem('easyLowestTries', triesCount)
      }
      if (easyHighestCombo < comboHighScore) {
        localStorage.setItem('easyHighestCombo', comboHighScore)
      }
    }
    if (query === '?medium' && mediumLowestTries > triesCount) {
      if (mediumLowestTries > triesCount) {
        localStorage.setItem('mediumLowestTries', triesCount)
      }
      if (mediumHighestCombo < comboHighScore) {
        localStorage.setItem('mediumHighestCombo', comboHighScore)
      }
    }
    if (query === '?hard' && hardLowestTries > triesCount) {
      if (hardLowestTries > triesCount) {
        localStorage.setItem('hardLowestTries', triesCount)
      }
      if (hardHighestCombo < comboHighScore) {
        localStorage.setItem('hardHighestCombo', comboHighScore)
      }
    }

    document.getElementById('nice').style.display = 'inline'
    document.getElementById('replay').style.display = 'inline'
    victorySound.play()
  }
}

shuffle(selectedArray)

// map each card depending on current difficulty and category, and append to dom
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
