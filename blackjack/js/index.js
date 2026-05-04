import { getHandValue, renderCard } from "./21.js";

const dealerHand = [
    { rank: "A", suit: "♠", value: 11 },
];

const playerHand = [
    { rank: "Q", suit: "♠", value: 10 },
    { rank: "9", suit: "♥", value: 9 },
];

const betInput = document.getElementById("bet");
const playerBet = document.querySelector(".player-bet");
const dealerValue = document.querySelector(".dealer__points")
const playerValue = document.querySelector(".player__points")
const dealerCards = document.querySelector(".dealer__cards")
const playerCards = document.querySelector(".player__cards")

function syncBet() {
    playerBet.textContent = `Ваша ставка: ${betInput.value}`;
}

betInput.addEventListener("input", syncBet);
syncBet();
dealerValue.textContent = `Очки: ${getHandValue(dealerHand)}`;
playerValue.textContent = `Очки: ${getHandValue(playerHand)}`;
dealerCards.innerHTML = dealerHand.map(renderCard).join("");
playerCards.innerHTML = playerHand.map(renderCard).join("");