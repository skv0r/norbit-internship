const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["♠", "♥", "♦", "♣"]


let state = {
    deck: [],
    playerCards: [],
    dealerCards: [],
    bet: 20,
    currentBet: 0,
    bank: 1000,
    isRoundActive: false,
    result: ""
}

let card = {
    rank: String,
    suit: String,
    value: Number
}

export function createDeck() {
    const deck = [];

    for (let i = 0; i < rank.length ;i++) {
        const r = rank[i]
        let cardValue = r === "A" ? 11 : (Number(r) || 10);

        for (let j = 0; j < suits.length ; j++) {
            const card = {
                rank: r,
                suit: suits[j], 
                value: cardValue}

            deck.push(card)
        }
    }

    return deck
}

export function shuffleDeck(deck) {
    for (let i = 0; i < deck.length ; i++ ) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]] 
    }
    
    return deck;
}

export function renderCard(card) {
    return `
    <div class="card">
        <span class="card-corner card-corner--top">${card.rank}</span>
        <span class="card-suit">${card.suit}</span>
        <span class="card-corner card-corner--bottom">${card.rank}</span>
    </div>
    `
}

export function getHandValue(hand) {
    let total = hand.reduce((sum, card) => sum + card.value, 0);
    let aceCount = hand.filter((card) => card.rank === "A").length;

    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }

    return total;
}

export function getState() {
    return state;
}

export function setBet(value) {
    const nextBet = Number(value);
    if (!Number.isFinite(nextBet) || nextBet < 1) return;
    state.bet = Math.floor(nextBet);
}

function getCard() {
    return state.deck.pop();
}

export function startRound() {
    if (!state.isRoundActive && state.bank >= state.bet) {
        state.deck = shuffleDeck(createDeck());
        state.dealerCards = [];
        state.playerCards = [];
        state.currentBet = state.bet;
        state.result = "";

        state.dealerCards.push(getCard())
        state.playerCards.push(getCard())
        state.playerCards.push(getCard())
        state.bank -= state.currentBet;

        state.isRoundActive = true;
    }
}

export function Double() {
    if (!state.isRoundActive) return;
    if (state.playerCards.length !== 2) return;
    if (state.bank < state.currentBet) return;

    state.bank -= state.currentBet;
    state.currentBet *= 2;
    Hit();

    if (getHandValue(state.playerCards) <= 21) {
        Stand();
    }
}

export function Hit() {
    if (!state.isRoundActive) return;
    state.playerCards.push(getCard())

    if (getHandValue(state.playerCards) > 21) {
        finishRound();
    }
}

export function Stand(){
    if (!state.isRoundActive) return;
    while (getHandValue(state.dealerCards) < 17) {
        state.dealerCards.push(getCard());
    }
    finishRound();
}

function finishRound() {
    const playerTotal = getHandValue(state.playerCards);
    const dealerTotal = getHandValue(state.dealerCards);

    if (playerTotal > 21) {
        state.result = "Перебор! Вы проиграли.";
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
        state.result = "Вы выиграли!";
        state.bank += state.currentBet * 2;
    } else if (playerTotal === dealerTotal) {
        state.result = "Ничья.";
        state.bank += state.currentBet;
    } else {
        state.result = "Дилер выиграл.";
    }

    state.currentBet = 0;
    state.isRoundActive = false;
}