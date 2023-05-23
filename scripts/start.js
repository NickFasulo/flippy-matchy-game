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

if (!localStorage.getItem('category')) {
  localStorage.setItem('category', 'originalArray')
}

if (!localStorage.getItem('easyLowestTries')) {
  localStorage.setItem('easyLowestTries', 99999)
}
if (!localStorage.getItem('mediumLowestTries')) {
  localStorage.setItem('mediumLowestTries', 99999)
}
if (!localStorage.getItem('hardLowestTries')) {
  localStorage.setItem('hardLowestTries', 99999)
}

if (!localStorage.getItem('easyHighestCombo')) {
  localStorage.setItem('easyHighestCombo', 99999)
}
if (!localStorage.getItem('mediumHighestCombo')) {
  localStorage.setItem('mediumHighestCombo', 99999)
}
if (!localStorage.getItem('hardHighestCombo')) {
  localStorage.setItem('hardHighestCombo', 99999)
}

const easyLowestTries = localStorage.getItem('easyLowestTries')
const mediumLowestTries = localStorage.getItem('mediumLowestTries')
const hardLowestTries = localStorage.getItem('hardLowestTries')

const easyHighestCombo = localStorage.getItem('easyHighestCombo')
const mediumHighestCombo = localStorage.getItem('mediumHighestCombo')
const hardHighestCombo = localStorage.getItem('hardHighestCombo')

if (easyLowestTries < 99999) {
  document.getElementById('easy-hs').innerText = easyLowestTries
}
if (mediumLowestTries < 99999) {
  document.getElementById('medium-hs').innerText = mediumLowestTries
}
if (hardLowestTries < 99999) {
  document.getElementById('hard-hs').innerText = hardLowestTries
}

if (easyHighestCombo < 99999) {
  document.getElementById('easy-combo').innerText = easyHighestCombo
}
if (mediumHighestCombo < 99999) {
  document.getElementById('medium-combo').innerText = mediumHighestCombo
}
if (hardHighestCombo < 99999) {
  document.getElementById('hard-combo').innerText = hardHighestCombo
}
