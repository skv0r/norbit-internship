import { Double, getHandValue, getState, Hit, renderCard, setBet, Stand, startRound } from "./21.js";

const betInput = document.getElementById("bet");
const playerBet = document.querySelector(".player-bet");
const dealerValue = document.querySelector(".dealer__points")
const playerValue = document.querySelector(".player__points")
const dealerCards = document.querySelector(".dealer__cards")
const playerCards = document.querySelector(".player__cards")
const startRoundBtn = document.getElementById("start")
const doubleBtn = document.getElementById("double")
const moreBtn = document.getElementById("more")
const endBtn = document.getElementById("end")
const playerScore = document.querySelector(".score")
const result = document.getElementById("result")

function syncBet() {
    playerBet.textContent = `Ваша ставка: ${betInput.value}`;
    setBet(betInput.value);
}

function renderGame() {
    const state = getState();

    playerScore.textContent = `Ваш счет: ${state.bank}`;
    dealerValue.textContent = `Очки: ${getHandValue(state.dealerCards)}`;
    playerValue.textContent = `Очки: ${getHandValue(state.playerCards)}`;
    dealerCards.innerHTML = state.dealerCards.map(renderCard).join("");
    playerCards.innerHTML = state.playerCards.map(renderCard).join("");
    result.textContent = state.result;

    startRoundBtn.disabled = state.isRoundActive;
    doubleBtn.disabled = !state.isRoundActive || state.playerCards.length !== 2 || state.bank < state.currentBet;
    moreBtn.disabled = !state.isRoundActive;
    endBtn.disabled = !state.isRoundActive;
}

startRoundBtn.addEventListener("click", () => {
    startRound();
    renderGame();
});

doubleBtn.addEventListener("click", () => {
    Double();
    renderGame();
});

moreBtn.addEventListener("click", () => {
    Hit();
    renderGame();
});

endBtn.addEventListener("click", () => {
    Stand();
    renderGame();
});
betInput.addEventListener("input", syncBet);
syncBet();
renderGame();