'use strict';


    // selecionando elementos
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
let scores, currentScore, activePlayer, playingYet



    // iniciando as condições do jogo
const initiate = function(){
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playingYet = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    diceEl.classList.add('hidden')
}

    initiate()

    //função para passar o jogador
const nextPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0
        currentScore = 0
        activePlayer = activePlayer === 0 ? 1 : 0
        player0El.classList.toggle('player--active')
        player1El.classList.toggle('player--active')
}

    // função para jogar o dado 
btnRoll.addEventListener('click', function(){
    if(playingYet){
        //  gerando um lado aleatório do dado
    const dice = Math.trunc(Math.random() * 6) + 1
        //  o dado fica aparente ao jogador
    diceEl.classList.remove('hidden')
    diceEl.src = `dice/dice-${dice}.png`
        // condição para testar se o dado deu 1
    if(dice !== 1){
            //adiciona o valor ao current score
        currentScore += dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    }else {
            //próximo jogador
        nextPlayer()
    }
    }
})

btnHold.addEventListener('click', function(){
    if(playingYet){
        //adiciona o current score ao score total
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        //testa se o jogador tem o score >= 100
    if(scores[activePlayer] >= 10){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

        diceEl.classList.add('hidden')
        playingYet = false //botões roll e hold ficam inacessíveis
    }else{
        //passa pro próximo jogador
        nextPlayer()
    }
    }
})

// reiniciando o jogo
btnNew.addEventListener('click', initiate)

