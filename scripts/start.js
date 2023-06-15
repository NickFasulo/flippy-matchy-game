const hsModal = document.getElementById('hs-modal')
const hsButton = document.getElementById('hs-button')
const hsCloseBttn = document.getElementById('hs-close')
const catModal = document.getElementById('cat-modal')
const catButton = document.getElementById('cat-button')
const catCloseBttn = document.getElementById('cat-close')
const catLabels = document
  .getElementById('cat-form')
  .getElementsByTagName('label')
const catInputs = document
  .getElementById('cat-form')
  .getElementsByTagName('input')
const unlocksModal = document.getElementById('unlocks-modal')
const unlocksButton = document.getElementById('unlocks-button')
const unlocksCloseBttn = document.getElementById('unlocks-close')
const settingsModal = document.getElementById('settings-modal')
const settingsButton = document.getElementById('settings-button')
const settingsCloseBttn = document.getElementById('settings-close')
const startButtons = document.querySelectorAll('button, a')
const buttonSound = document.getElementById('button-sound')
const flippyMatchy = document.getElementById('flippy-matchy')
const radios = document.querySelectorAll('input[type=radio]')
const flipSound = document.getElementById('flip-sound')
const failSound = document.getElementById('fail-sound')
const musicVolControl = document.getElementById('music-vol-control')
const setRevealed = document.getElementById('set-revealed')
const setTimer = document.getElementById('set-timer')

// add sound to menu buttons on hover
for (let i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener('mouseover', () => buttonSound.play())
}

// trigger menu title flip animation on click
flippyMatchy.onclick = () => {
  flippyMatchy.classList.remove('flip-animation')
  void flippyMatchy.offsetWidth
  flippyMatchy.classList.add('flip-animation')
  flipSound.play()
  setTimeout(() => {
    failSound.play()
  }, 500)
}

// display modals on start menu button click
hsButton.onclick = () => {
  hsModal.style.display = 'block'
}
catButton.onclick = () => {
  catModal.style.display = 'block'
  for (let i = 0; i < catInputs.length; i++) {
    if (catInputs[i].value === localStorage.getItem('category')) {
      catInputs[i].checked = true
    }
  }
}
unlocksButton.onclick = () => {
  unlocksModal.style.display = 'block'
}
settingsButton.onclick = () => {
  settingsModal.style.display = 'block'
}

// close modal on close button click
hsCloseBttn.onclick = () => {
  hsModal.style.display = 'none'
}
// set category preference to local storage based on input selected from category modal on close
catCloseBttn.onclick = () => {
  catModal.style.display = 'none'
  for (let i = 0; i < catInputs.length; i++) {
    if (catInputs[i].checked) {
      localStorage.setItem('category', catInputs[i].value)
    }
  }
}
unlocksCloseBttn.onclick = () => {
  unlocksModal.style.display = 'none'
}
settingsCloseBttn.onclick = () => {
  settingsModal.style.display = 'none'
}

// close modal on click outside of modal
window.onclick = event => {
  if (event.target === hsModal) {
    hsModal.style.display = 'none'
  }
  if (event.target === catModal) {
    for (let i = 0; i < catInputs.length; i++) {
      if (catInputs[i].checked) {
        localStorage.setItem('category', catInputs[i].value)
      }
    }
    catModal.style.display = 'none'
  }
  if (event.target === unlocksModal) {
    unlocksModal.style.display = 'none'
  }
  if (event.target === settingsModal) {
    settingsModal.style.display = 'none'
  }
}

// set timer preference to local storage
if (!localStorage.getItem('addTimer')) {
  localStorage.setItem('addTimer', false)
}
setTimer.onclick = () => {
  localStorage.setItem('addTimer', setTimer.checked ? true : false)
}
if (localStorage.getItem('addTimer') === 'true') {
  setTimer.checked = true
}

// set cards revealed at start preference to local storage
if (!localStorage.getItem('keepRevealed')) {
  localStorage.setItem('keepRevealed', false)
}
setRevealed.onclick = () => {
  localStorage.setItem('keepRevealed', setRevealed.checked ? true : false)
}
if (localStorage.getItem('keepRevealed') === 'true') {
  setRevealed.checked = true
}

// set music on/off and volume preference to local storage
if (!localStorage.getItem('playMusic')) {
  localStorage.setItem('playMusic', true)
}
if (!localStorage.getItem('musicVolume')) {
  localStorage.setItem('musicVolume', 0.5)
}

musicVolControl.addEventListener('input', function (e) {
  localStorage.setItem('musicVolume', e.currentTarget.value)
})
musicVolControl.value = localStorage.getItem('musicVolume')

// set emoji category preference to local storage if not already set
if (!localStorage.getItem('category')) {
  localStorage.setItem('category', 'originalArray')
}

// set lowest tries for each level to local storage if not already set
if (!localStorage.getItem('easyLowestTries')) {
  localStorage.setItem('easyLowestTries', 99999)
}
if (!localStorage.getItem('mediumLowestTries')) {
  localStorage.setItem('mediumLowestTries', 99999)
}
if (!localStorage.getItem('hardLowestTries')) {
  localStorage.setItem('hardLowestTries', 99999)
}

// set highest combo for each level to local storage if not already set
if (!localStorage.getItem('easyHighestCombo')) {
  localStorage.setItem('easyHighestCombo', 1)
}
if (!localStorage.getItem('mediumHighestCombo')) {
  localStorage.setItem('mediumHighestCombo', 1)
}
if (!localStorage.getItem('hardHighestCombo')) {
  localStorage.setItem('hardHighestCombo', 1)
}

const easyLowestTries = localStorage.getItem('easyLowestTries')
const mediumLowestTries = localStorage.getItem('mediumLowestTries')
const hardLowestTries = localStorage.getItem('hardLowestTries')

const easyHighestCombo = localStorage.getItem('easyHighestCombo')
const mediumHighestCombo = localStorage.getItem('mediumHighestCombo')
const hardHighestCombo = localStorage.getItem('hardHighestCombo')

// if there are "lowest tries" set for a level, display on high scores modal.
if (easyLowestTries < 99999) {
  document.getElementById('easy-hs').innerText = easyLowestTries
}
if (mediumLowestTries < 99999) {
  document.getElementById('medium-hs').innerText = mediumLowestTries
}
if (hardLowestTries < 99999) {
  document.getElementById('hard-hs').innerText = hardLowestTries
}

// if there is a "highest combo" set for a level, display on high scores modal.
if (easyHighestCombo > 1) {
  document.getElementById('easy-combo').innerText = easyHighestCombo
}
if (mediumHighestCombo > 1) {
  document.getElementById('medium-combo').innerText = mediumHighestCombo
}
if (hardHighestCombo > 1) {
  document.getElementById('hard-combo').innerText = hardHighestCombo
}

// highest combo out of all of the highest combos hit for each level
const highestCombo = Math.max(
  parseInt(easyHighestCombo),
  parseInt(mediumHighestCombo),
  parseInt(hardHighestCombo)
)

// disable input for categories if they haven't been unlocked
for (let i = 1; i < radios.length; i++) {
  if (i === 1 && easyLowestTries === '99999') {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
  if (i === 2 && mediumLowestTries === '99999') {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
  if (i === 3 && hardLowestTries === '99999') {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
  if (i === 4 && highestCombo < 3) {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
  if (i === 5 && highestCombo < 4) {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
  if (i === 6 && highestCombo < 5) {
    radios[i].setAttribute('disabled', '')
    radios[i].style.cursor = 'default'
    catLabels[i].style.opacity = 0.5
    catLabels[i].style.cursor = 'default'
  }
}
