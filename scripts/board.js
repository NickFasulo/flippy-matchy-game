const easyLowestTries = localStorage.getItem('easyLowestTries')
const mediumLowestTries = localStorage.getItem('mediumLowestTries')
const hardLowestTries = localStorage.getItem('hardLowestTries')

const easyHighestCombo = localStorage.getItem('easyHighestCombo')
const mediumHighestCombo = localStorage.getItem('mediumHighestCombo')
const hardHighestCombo = localStorage.getItem('hardHighestCombo')

const keepRevealed = localStorage.getItem('keepRevealed')
const addTimer = localStorage.getItem('addTimer')

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
const gameOverSound = document.getElementById('game-over-sound')
const music = document.getElementById('music')

const speaker = document.getElementById('speaker')
const mute = document.getElementById('mute')

const selectedCatergory = localStorage.getItem('category')
const arrayCategory = JSON.parse(localStorage.getItem(selectedCatergory))

const timeHeader = document.getElementById('time')
const fmHeader = document.getElementById('board-title')

let comboHighScore = 0
let comboCount = document.getElementById('combo').innerHTML
let triesCount = document.getElementById('tries').innerHTML
const checks = document.getElementsByName('check')
const matchedCards = []
const revealTime = 2000
const flipTime = 750

if (addTimer === 'true') {
  fmHeader.style.display = 'none'
} else {
  timeHeader.style.display = 'none'
}

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

// select array and set time based on what query string is passed in
const query = parent.document.URL.match(/\?(.*)/g)[0]
const board = document.getElementById('board')
let timeLength
let selectedArray

if (query === '?easy') {
  timeLength = 2
  timeHeader.textContent = '2:00'
  selectedArray = easyArray
  board.classList.add('easy')
}
if (query === '?medium') {
  timeLength = 3
  timeHeader.textContent = '3:00'
  selectedArray = mediumArray
  board.classList.add('medium')
}
if (query === '?hard') {
  timeLength = 4
  timeHeader.textContent = '4:00'
  selectedArray = hardArray
  board.classList.add('hard')
}

const startTimer = (duration, display) => {
  let timer = duration,
    minutes,
    seconds

  const timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    display.textContent = minutes + ':' + seconds

    // stop timer if win condition is met
    if (matchedCards.length === checks.length) {
      return clearInterval(timerInterval)
    }

    // if timer reaches 0, end the game
    if (--timer < 0) {
      timer = 0

      for (let i = 0; i < checks.length; i++) {
        checks[i].disabled = true
      }

      document.getElementById('out-of-time').style.display = 'flex'
      document.getElementById('replay').style.display = 'inline'
      gameOverSound.play()
      return clearInterval(timerInterval)
    }
  }, 1000)

  timerInterval()
}

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

  if (addTimer === 'true') {
    const minutes = 60 * timeLength
    startTimer(minutes, timeHeader)
  }
})

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
                <div class="front card-border">
                </div>
                <div class="back card-border">
                  ${emoji}
                </div>
              </div>
            </label>`
  })
  .join('')

const cardNodes = document.createRange().createContextualFragment(cardStrings)
board.appendChild(cardNodes)
