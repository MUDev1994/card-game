const cardsValueArr = ['apple', 'earth', 'flower', 'house', 'water'];

class Card {
    constructor(board, numberOfCardsToCreate) {
        this.board = board;
        this.numberOfCardsToCreate = numberOfCardsToCreate;
        this.cardsInPlay = [];
        this.flipallow = true;
        this.cardsSetFounded = 0;
        this.score = document.querySelector(".score");
        this.rope = document.querySelector(".rope");
        this.restartBttn = document.querySelector("#bttn");
    }

    createCardHtml(value) {
        const container = document.createElement('div');
        container.className = 'container options';

        const card = document.createElement('div');
        card.className = 'card';
        container.appendChild(card);

        const front = document.createElement('figure');
        front.className = 'front';

        const back = document.createElement('figure');
        back.className = 'back';

        // TODO: fix this
        back.style.backgroundImage = "url('images/card-images/" + cardsValueArr[value] + ".jpg')";

        card.appendChild(front);
        card.appendChild(back);

        container.setAttribute('data-card', value);
        return container;
    }

    addLogicToNavigationBar() {
        const navigationBarItems = [...document.querySelectorAll('.header > a')];
        const contentChildren = [...document.querySelectorAll('.content > div')];

        navigationBarItems.forEach((item, i) => {
            item.addEventListener("click", () => {
                contentChildren.forEach(content => content.classList.add('hide'));
                contentChildren[i].classList.remove('hide');
            });
        })
    }

    addLogicToRestartBttn() {
        this.restartBttn.addEventListener('click', () => window.location.reload());
    }

    addLogicToCards() {
        const playerWonTheGame = () => {
            [...this.board.children].forEach(card => {
                card.classList.remove('options');
                card.classList.add('tada');
            });
            this.board.classList.add('fadeOut');

            setTimeout(() => {
                this.board.classList.add("hide");
                this.restartBttn.classList.remove("hide");
                this.rope.classList.add('middle');
            }, 4500);
        }

        const changeScore = (value) => (this.score.innerHTML = Number(this.score.innerHTML) + value);

        const handleWhenBothCardsAreSame = () => {
            setTimeout(() => {
                changeScore(2);

                this.cardsInPlay[0].setAttribute("alreadyFounded", "true");
                this.cardsInPlay[0].querySelector('.back').style.backgroundImage = "url('images/won.jpg')";

                this.cardsInPlay[1].setAttribute("alreadyFounded", "true");
                this.cardsInPlay[1].querySelector('.back').style.backgroundImage = "url('images/won.jpg')";

                this.cardsInPlay = [];
                this.flipallow = true;
            }, 1000);

            this.cardsSetFounded++;

            const hasPlayerWonTheGame = this.cardsSetFounded == this.numberOfCardsToCreate;
            if (hasPlayerWonTheGame) playerWonTheGame();
        }

        const handleWhenBothCardsAreNotSame = () => {
            setTimeout(() => {
                changeScore(-1);

                this.cardsInPlay[0].querySelector('.card').classList.remove("flippedfront");
                this.cardsInPlay[1].querySelector('.card').classList.remove("flippedfront");

                this.cardsInPlay = [];
                this.flipallow = true;
            }, 1000);
        }

        this.board.addEventListener('click', (event) => {
            const cardContainer = event.target.closest('.container');
            if (!cardContainer) return;

            const card = cardContainer.querySelector('.card');
            if (cardContainer.hasAttribute('alreadyFounded') || !this.flipallow || card.classList.contains('flippedfront')) return;
            card.classList.add("flippedfront");
            this.cardsInPlay.push(cardContainer);

            if (this.cardsInPlay.length === 2) {
                this.flipallow = false;

                const areBothCardsSame = this.cardsInPlay[0].getAttribute('data-card') == this.cardsInPlay[1].getAttribute('data-card');
                areBothCardsSame ? handleWhenBothCardsAreSame() : handleWhenBothCardsAreNotSame();
            }
        })
    }

    addCardsToBoard() {
        const cardsArr = [];
        for (let i = 0; i < this.numberOfCardsToCreate; i++) {
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
        this.addLogicToNavigationBar();
        this.addCardsToBoard();
        this.addLogicToRestartBttn();
    }
}

const board = document.getElementById("game-board");
const cards = new Card(board, 5);
cards.start();