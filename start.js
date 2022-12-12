const hsModal = document.getElementById('hs-modal')
const hsButton = document.getElementById('hs-button')
const span = document.getElementsByClassName('close')[0]

hsButton.onclick = () => {
  hsModal.style.display = 'block'
}

span.onclick = () => {
  hsModal.style.display = 'none'
}

window.onclick = event => {
  if (event.target === hsModal) {
    hsModal.style.display = 'none'
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
