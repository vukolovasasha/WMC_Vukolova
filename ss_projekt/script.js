const themeButton = document.querySelector("#theme-button");
const board = document.querySelector("#game-board");
const movesText = document.querySelector("#moves");
const restartButton = document.querySelector("#restart-button");

const cats = [
    "🐱",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼"
];

let cards = [];
let flippedCards = [];
let moves = 0;
let lockBoard = false;

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            themeButton.textContent = "Light mode";
        } else {
            themeButton.textContent = "Dark mode";
        }
    });
}

function startGame() {
    if (!board) {
        return;
    }

    board.innerHTML = "";
    flippedCards = [];
    moves = 0;
    lockBoard = false;

    if (movesText) {
        movesText.textContent = moves;
    }

    cards = [...cats, ...cats];

    cards.sort(function () {
        return Math.random() - 0.5;
    });

    cards.forEach(function (cat) {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.value = cat;
        card.textContent = "?";

        card.addEventListener("click", flipCard);

        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) {
        return;
    }

    if (this.classList.contains("flipped")) {
        return;
    }

    this.classList.add("flipped");
    this.textContent = this.dataset.value;

    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;

        if (movesText) {
            movesText.textContent = moves;
        }

        checkCards();
    }
}

function checkCards() {
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        flippedCards = [];

        checkWin();

        return;
    }

    lockBoard = true;

    setTimeout(function () {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.textContent = "?";
        secondCard.textContent = "?";

        flippedCards = [];
        lockBoard = false;
    }, 800);
}

function checkWin() {
    const matchedCards = document.querySelectorAll(".card.matched");

    if (matchedCards.length === cards.length) {
        setTimeout(function () {
            alert("You won in " + moves + " moves!");
        }, 300);
    }
}

if (restartButton) {
    restartButton.addEventListener("click", startGame);
}

startGame();