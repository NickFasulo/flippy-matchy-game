const hsModal = document.getElementById('hs-modal')
const hsButton = document.getElementById('hs-button')
const hsCloseBttn = document.getElementById('hs-close')
const catModal = document.getElementById('cat-modal')
const catButton = document.getElementById('cat-button')
const catCloseBttn = document.getElementById('cat-close')
const catInputs = document
  .getElementById('cat-form')
  .getElementsByTagName('input')
const startButtons = document.querySelectorAll('button, a')
const buttonSound = document.getElementById('button-sound')

for (let i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener('mouseover', () => buttonSound.play())
}

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

hsCloseBttn.onclick = () => {
  hsModal.style.display = 'none'
}

catCloseBttn.onclick = () => {
  catModal.style.display = 'none'
  for (let i = 0; i < catInputs.length; i++) {
    if (catInputs[i].checked) {
      localStorage.setItem('category', catInputs[i].value)
    }
  }
}

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
}

if (!localStorage.getItem('easyHighScore')) {
  localStorage.setItem('easyHighScore', 99999)
}
if (!localStorage.getItem('mediumHighScore')) {
  localStorage.setItem('mediumHighScore', 99999)
}
if (!localStorage.getItem('hardHighScore')) {
  localStorage.setItem('hardHighScore', 99999)
}

const easyHighScore = localStorage.getItem('easyHighScore')
const mediumHighScore = localStorage.getItem('mediumHighScore')
const hardHighScore = localStorage.getItem('hardHighScore')

if (easyHighScore < 99999) {
  document.getElementById('easy-hs').innerText = easyHighScore
}
if (mediumHighScore < 99999) {
  document.getElementById('medium-hs').innerText = mediumHighScore
}
if (hardHighScore < 99999) {
  document.getElementById('hard-hs').innerText = hardHighScore
}
