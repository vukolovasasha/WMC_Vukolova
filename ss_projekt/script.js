// Theme switcher
const themeButton = document.querySelector("#theme-button");

function initTheme() {
    if (!themeButton) {
        return;
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeButton.textContent = "Light mode";
    }

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            themeButton.textContent = "Light mode";
        } else {
            localStorage.setItem("theme", "light");
            themeButton.textContent = "Dark mode";
        }
    });
}


// Meme facts
const factButton = document.querySelector("#fact-button");
const factText = document.querySelector("#fact-text");

const memeFacts = [
    "The word meme was created in 1976.",
    "Memes spread ideas very quickly online.",
    "Cats are one of the most popular meme subjects.",
    "Internet memes can influence culture and politics.",
    "Some memes become popular worldwide in just hours."
];

function initMemeFacts() {
    if (!factButton || !factText) {
        return;
    }

    factButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * memeFacts.length);
        factText.textContent = memeFacts[randomIndex];
    });
}


// Random meme viewer
const memeImage = document.querySelector("#meme-image");
const memeCaption = document.querySelector("#meme-caption");
const memeButton = document.querySelector("#meme-button");

const memes = [
    {
        image: "image/meme4.jpg",
        caption: "When the code works on the first try."
    },
    {
        image: "image/meme2.jpg",
        caption: "Me trying to understand JavaScript."
    },
    {
        image: "image/meme3.jpg",
        caption: "When HTML, CSS and JS finally work together."
    },
    {
        image: "image/meme1.jpg",
        caption: "Debugging: removing one bug and creating three new ones."
    }
];

function initMemeViewer() {
    if (!memeButton || !memeImage || !memeCaption) {
        return;
    }

    memeButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * memes.length);

        memeImage.src = memes[randomIndex].image;
        memeCaption.textContent = memes[randomIndex].caption;
    });
}


// Memory game
const board = document.querySelector("#game-board");
const movesText = document.querySelector("#moves");
const restartButton = document.querySelector("#restart-button");

const backImage = "image/card-back.jpg";

const cats = [
    "image/cat_1.jpg",
    "image/cat_2.jpg",
    "image/cat_3.jpg",
    "image/cat_4.jpg",
    "image/cat_5.jpg",
    "image/cat_6.jpg"
];

let cards = [];
let flippedCards = [];
let moves = 0;
let lockBoard = false;

function initMemoryGame() {
    if (!board) {
        return;
    }

    startGame();

    if (restartButton) {
        restartButton.addEventListener("click", startGame);
    }
}

function startGame() {
    board.innerHTML = "";

    cards = [...cats, ...cats];
    flippedCards = [];
    moves = 0;
    lockBoard = false;

    if (movesText) {
        movesText.textContent = moves;
    }

    shuffleCards();
    createCards();
}

function shuffleCards() {
    cards.sort(function () {
        return Math.random() - 0.5;
    });
}

function createCards() {
    cards.forEach(function (cat) {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.value = cat;
        card.innerHTML = `<img src="${backImage}" alt="Card back">`;

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
    this.innerHTML = `<img src="${this.dataset.value}" alt="Cat card">`;

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

    hideWrongCards(firstCard, secondCard);
}

function hideWrongCards(firstCard, secondCard) {
    lockBoard = true;

    setTimeout(function () {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.innerHTML = `<img src="${backImage}" alt="Card back">`;
        secondCard.innerHTML = `<img src="${backImage}" alt="Card back">`;

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


initTheme();
initMemeFacts();
initMemeViewer();
initMemoryGame();