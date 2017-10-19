
let cards = ["apple", "apple", "flower", "flower", "water", "water", "earth", "earth", "house", "house"];
let won = false;
let board = document.getElementById("game-board");
let cardsInPlay = [];
let flipallow = true;
let thiscard = [];
let scr = 0;
function nav(i) {
    let game = document.getElementById("game");
    let ins = document.getElementById("ins");
    let rope = document.querySelector(".rope");
    if (i === "game") {
        ins.style.display = "none";
        game.style.display = "flex";
        rope.style.display = "block";
    } else if (i === "ins") {
        game.style.display = "none";
        rope.style.display = "none";
        ins.style.display = "block";
    }
}

function createCards() {
    // for (let i = 0; i < cards.length; i += 1) {
    for (let i = 0; i < cards.length + 10; i += 1) {
        let container = document.createElement('div');
        container.className = 'container options';
        let card = document.createElement('div');
        card.id = 'card';
        container.appendChild(card);
        let front = document.createElement('figure');
        front.className = 'front';
        let back = document.createElement('figure');
        back.className = 'back';
        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(container);
        let rndnumb = Math.floor(Math.random() * cards.length);
        // container.setAttribute('data-card', cards[i]);
        container.setAttribute('data-card', cards[rndnumb]);
        cards.splice(rndnumb, 1);
        container.setAttribute('count', 0);
        let con = document.querySelectorAll(".container");
        container.onclick = function() {
            if (flipallow === true) {
                this.firstChild.className = "flipped flippedfront";
                let data = this.getAttribute('data-card');
                let countdata = this.getAttribute('count');
                if (countdata == 1) {
                } else if (countdata == 0) {
                    this.firstChild.lastChild.style.backgroundImage = "url('images/" + data + ".jpg')";
                    cardsInPlay.push(data);
                    this.setAttribute('count', 1);
                }
            }
            let score = document.querySelector(".score");
            if (cardsInPlay.length === 2) {
                if (cardsInPlay[0] == cardsInPlay[1]) {
                    thiscard.push("Yes", "Yes");
                    scr += 2;
                    score.innerHTML = scr;
                    for (let a = 0; a < con.length; a += 1) {
                        if (con[a].getAttribute("count") == 1) {
                            con[a].className = "container";
                            con[a].setAttribute("gotcard", "Yes");
                            con[a].setAttribute("count", 2);
                            setTimeout(function() {
                                for (let b = 0; b < con.length; b += 1) {
                                    if (con[b].getAttribute("count") == 2) {
                                        con[b].firstChild.lastChild.style.backgroundImage = "url('images/won.jpg')";
                                    }
                                }
                            }, 1000);
                        }
                        if (thiscard.length == con.length) {
                            con[a].className += " tada";
                            $("#game-board").addClass('fadeOut');
                            setTimeout(function() {
                                $("#game-board").css({
                                    'display': "none"
                                });
                                document.querySelector("#bttn").className = "bttnv";
                                $(".rope").addClass('middle');
                            }, 4500);
                        }
                    }
                    cardsInPlay = [];
                }
                if (cardsInPlay[0] !== cardsInPlay[1]) {
                    scr -= 1;
                    score.innerHTML = scr;
                    cardsInPlay = [];
                    flipallow = false;
                    setTimeout(function() {
                        for (let b = 0; b < con.length; b += 1) {
                            if (con[b].getAttribute("gotcard") != "Yes") {
                                con[b].firstChild.className = "flipped";
                            }
                            con[b].setAttribute('count', 0);
                            flipallow = true;
                        }
                    }, 1000);
                }
            }
        }
    };
}
createCards();
