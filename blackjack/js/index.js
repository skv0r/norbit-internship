const betInput = document.getElementById("bet");
const playerBet = document.querySelector(".player-bet");

function syncBet() {
    playerBet.textContent = `Ваша ставка: ${betInput.value}`;
}

betInput.addEventListener("input", syncBet);
syncBet();