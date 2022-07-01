const board = document.getElementById("game-board");
const rope = document.querySelector(".rope");
const restartBttn = document.querySelector("#bttn");
const game = document.getElementById("game");
const instructions = document.getElementById("instructions");
const navigationBarItems = [...document.querySelectorAll('.header > a')];
const contentChildren = [...document.querySelectorAll('.content > div')];

navigationBarItems.forEach((item, i) => {
    item.addEventListener("click", () => {
        contentChildren.forEach(content => content.classList.add('hide'));
        contentChildren[i].classList.remove('hide');
    });
})

const cardsValueArr = ['apple', 'earth', 'flower', 'house', 'water'];

class Card {
    constructor(board, howManyCardsToCreate) {
        this.board = board;
        this.howManyCardsToCreate = howManyCardsToCreate;
        this.cardsInPlay = [];
        this.flipallow = true;
        this.cardsSetFounded = 0;
    }

    createCardHtml(value) {
        let container = document.createElement('div');
        container.className = 'container options';

        let card = document.createElement('div');
        card.id = 'card';
        container.appendChild(card);

        let front = document.createElement('figure');
        front.className = 'front';

        let back = document.createElement('figure');
        back.className = 'back';

        // TODO: fix this
        back.style.backgroundImage = "url('images/card-images/" + cardsValueArr[value] + ".jpg')";

        card.appendChild(front);
        card.appendChild(back);

        container.setAttribute('data-card', value);
        container.setAttribute('count', 0);
        return container;
    }

    addLogicToCards() {
        this.board.addEventListener('click', (event) => {
            const card = event.target.closest('.container');
            if (!card) return;

            if (card.hasAttribute('alreadyFounded') || !this.flipallow || card.querySelector('#card').classList.contains('flippedfront')) return;
            card.firstChild.className = "flipped flippedfront";
            this.cardsInPlay.push(card);

            let score = document.querySelector(".score");
            if (this.cardsInPlay.length === 2) {
                this.flipallow = false;

                if (this.cardsInPlay[0].getAttribute('data-card') == this.cardsInPlay[1].getAttribute('data-card')) {
                    this.cardsSetFounded++;

                    setTimeout(() => {
                        score.innerHTML = Number(score.innerHTML) + 2;

                        this.cardsInPlay[0].setAttribute("alreadyFounded", "true");
                        this.cardsInPlay[0].querySelector('.back').style.backgroundImage = "url('images/won.jpg')";

                        this.cardsInPlay[1].setAttribute("alreadyFounded", "true");
                        this.cardsInPlay[1].querySelector('.back').style.backgroundImage = "url('images/won.jpg')";

                        this.cardsInPlay = [];
                        this.flipallow = true;
                    }, 1000);

                    // Won the game
                    if (this.cardsSetFounded == this.howManyCardsToCreate) {
                        [...this.board.children].forEach(card => {
                            card.classList.remove('options');
                            card.classList.add('tada');
                        });
                        this.board.classList.add('fadeOut');

                        setTimeout(() => {
                            this.board.style.display = 'none';
                            restartBttn.classList.remove("hide");
                            rope.classList.add('middle');
                        }, 4500);
                    }

                } else {
                    score.innerHTML = Number(score.innerHTML) - 1;

                    setTimeout(() => {
                        this.cardsInPlay[0].querySelector('#card').classList.remove("flippedfront");
                        this.cardsInPlay[1].querySelector('#card').classList.remove("flippedfront");

                        this.cardsInPlay = [];
                        this.flipallow = true;
                    }, 1000);

                }

            }
        })


    }

    addCardsToBoard() {
        const cardsArr = [];
        for (let i = 0; i < this.howManyCardsToCreate; i++) {
            cardsArr.push(this.createCardHtml(i), this.createCardHtml(i))
        }

        this.shuffleArr(cardsArr);
        this.addLogicToCards();
        cardsArr.forEach(card => this.board.appendChild(card));
    }

    shuffleArr(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    start() {
        this.addCardsToBoard();
    }
}

const cards = new Card(board, 5);
cards.start();