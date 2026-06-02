const themeButton = document.querySelector("#theme-button");

const board = document.querySelector("#game-board");

const movesText = document.querySelector("#moves");

const restartButton =
document.querySelector("#restart-button");


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



if (

    localStorage.getItem("theme")
    === "dark"

) {

    document.body.classList.add(
        "dark-theme"
    );

    if (themeButton) {

        themeButton.textContent =
        "Light mode";

    }

}



if (themeButton) {

    themeButton.addEventListener(

        "click",

        function () {

            document.body.classList.toggle(
                "dark-theme"
            );


            if (

                document.body.classList.contains(
                    "dark-theme"
                )

            ) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeButton.textContent =
                "Light mode";

            }

            else {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeButton.textContent =
                "Dark mode";

            }

        }

    );

}

const factButton =
document.querySelector("#fact-button");

const factText =
document.querySelector("#fact-text");


const memeFacts = [

    "The word meme was created in 1976.",

    "Memes spread ideas very quickly online.",

    "Cats are one of the most popular meme subjects.",

    "Internet memes can influence culture and politics.",

    "Some memes become popular worldwide in just hours."

];


if (factButton) {

    factButton.addEventListener(
        "click",

        function () {

            const randomIndex =

            Math.floor(
                Math.random() *
                memeFacts.length
            );

            factText.textContent =

            memeFacts[randomIndex];

        }

    );

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

        const card =
        document.createElement("div");

        card.classList.add("card");

        card.dataset.value = cat;


        card.innerHTML =

        `<img src="${backImage}">`;


        card.addEventListener(
            "click",
            flipCard
        );

        board.appendChild(card);

    });

}



function flipCard() {

    if (lockBoard) {

        return;

    }


    if (

        this.classList.contains(
            "flipped"
        )

    ) {

        return;

    }


    this.classList.add(
        "flipped"
    );


    this.innerHTML =

    `<img src="${this.dataset.value}">`;


    flippedCards.push(this);


    if (flippedCards.length === 2) {

        moves++;


        if (movesText) {

            movesText.textContent =
            moves;

        }


        checkCards();

    }

}



function checkCards() {

    const firstCard =
    flippedCards[0];

    const secondCard =
    flippedCards[1];


    if (

        firstCard.dataset.value ===
        secondCard.dataset.value

    ) {

        firstCard.classList.add(
            "matched"
        );

        secondCard.classList.add(
            "matched"
        );


        flippedCards = [];


        checkWin();

        return;

    }


    lockBoard = true;


    setTimeout(function () {

        firstCard.classList.remove(
            "flipped"
        );

        secondCard.classList.remove(
            "flipped"
        );


        firstCard.innerHTML =

        `<img src="${backImage}">`;

        secondCard.innerHTML =

        `<img src="${backImage}">`;


        flippedCards = [];

        lockBoard = false;

    }, 800);

}



function checkWin() {

    const matchedCards =

    document.querySelectorAll(
        ".card.matched"
    );


    if (

        matchedCards.length ===
        cards.length

    ) {

        setTimeout(function () {

            alert(
                "You won in " +
                moves +
                " moves!"
            );

        }, 300);

    }

}



if (restartButton) {

    restartButton.addEventListener(
        "click",
        startGame
    );

}

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

if (memeButton) {
    memeButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * memes.length);

        memeImage.src = memes[randomIndex].image;
        memeCaption.textContent = memes[randomIndex].caption;
    });
}


startGame();