const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["♠", "♥", "♦", "♣"]


let state = {
    deck: [],
    playerCards: [],
    dealerCards: [],
    bet: 20,
    bank: 1000,
    isRoundActive: false
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
    return hand.reduce((sum, card) => sum + card.value, 0);
  }

function render() {
}

function startRound() {

}

function Double() {

}

function Hit() {

}

function Stand(){

}

function finishRounds() {

}