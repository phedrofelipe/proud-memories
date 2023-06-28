const form = document.querySelector('.formLogin');
const player = document.querySelector('.playerName');
const email = document.querySelector('.playerEmail');

const validateForm = (event) => {
    event.preventDefault();

    if (player.value == '' | email.value == '') {
        alert("Verifique e preencha os campos corretamente!");
        return;
    }

    localStorage.setItem('player', player.value);
    localStorage.setItem('email', email.value);
    window.location = './assets/pages/game.html';
}


form.addEventListener('submit', validateForm);