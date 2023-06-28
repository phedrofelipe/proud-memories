// DECLARAÇÃO DA CONSTANTE COM A ATRIBUIÇÃO DOS VALORES INCLUSOS NA CLASS .grid
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanTime = document.querySelector('.time');

const characters = [
    'FAllanTuring',
    'FDavidBowie',
    'FErikaHilton',
    'FFridaKahlo',
    'FMarielleFranco',
    'FMarshaPJohnson',
    'FPablloVittar',
    'FPauloGustavo',
    'FSylviaRivera'
]


// CRIAÇÃO DA ARRAY FUNCTION createElement, a qual recebe dois parâmetros (tag, className). O parâmetro tag é responsável pela criação de um elemento (div) dentro do html, já o parâmetro className atribuirá um nome da class para esse mesmo elemento.
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}


const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 18) {
        setTimeout(() =>{
            clearInterval(this.loop);
            alert(`Parabéns ${spanPlayer.innerHTML}! Você ganhou o jogo no tempo de ${spanTime.innerHTML} ms.`);
            window.location.reload();
        }, 600);
    }
}


let firstCard = '';
let secondCard = '';


const checkCards = () => {

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 1000);
    }

}


const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}


// CRIAÇÃO DA ARRAY FUNCTION createCard, a qual é responsável pela criação e inclusão dos elementos HTML responsáveis pelas cartas dentro do documento.
const createCard = (character) => {

    // UTILIZAÇÃO DA FUNÇÃO createElement com os parâmetros de identificação das cartas (card, face, front e back);
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/cards/${character}.png')`;

    // INCLUSÃO DOS ELEMENTOS front e back NA DIV DO ELEMENTO card, respeitando a organização pré-definida no html.
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    // FINALIZAÇÃO DA FUNÇÃO RETORNANDO A CARTA CRIADA.
    return card;
    // grid.appendChild(card);
}


const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ]

    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    duplicateCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

}


const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +spanTime.innerHTML;
        spanTime.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}