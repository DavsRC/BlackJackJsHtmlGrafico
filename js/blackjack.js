// We edit the canvas with high resolution
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// Classe card
class card {
	static x = 50;
	static y = 50;

	constructor(valor, palo) {
		this.img = new Image();
		this.valor = valor;
		this.palo = palo;
	}
}

// Variables we are going to use
var cards = [];
var playerCards = [];
var crupierCards = [];
var cardIndex = 0;
var palos = ["S", "H", "D", "C"];
// Generate the cards. With attributes value and palo
for (i = 0; i < 4; i++) {
	for (j = 1; j <= 13; j++) {
		cards.push(new card(j, palos[i]));
	}
}

//Shuffle the cards
for (i = 0; i < 100; i++) {
	cards.splice(Math.random() * 52, 0, cards[0]);
	cards.shift();
}

function drawingCards(CJ) {
	// We have to first load the card and then add the src
	// If we don't add this, the card will not load in the page
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, card.x, card.y, 239, 335);
		card.x += 300;
	};
	// To load the correct image we concatenate the number and the suit, which coincides with the file name
	CJ.img.src = "images/cards/" + CJ.valor.toString() + CJ.palo + ".svg";
}

function askForCard() {
	// We put a maximum of cards that you can make so that the dealer can also draw his
	if (cardIndex < 8) {
		let CJ = cards[cardIndex]; //Card played
		playerCards.push(CJ);
		drawingCards(CJ);
		cardIndex++;
	}
}

function stay() {
	document.getElementById("giveMe").disabled = true;
	document.getElementById("stay").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
	let pointsUser = 0;
	let pointsCrupier = 0;
	let info = document.getElementById("info");
	// We count and print the player's points
	for (i in playerCards) {
		pointsUser += playerCards[i].valor;
	}
	// We draw cards to the crupier and count his points
	while (pointsCrupier < 17) {
		crupierCards.push(cards[cardIndex]);
		pointsCrupier += cards[cardIndex].valor;
		cardIndex++;
	}
	// Points of the game are put in info
	info.innerHTML = "Players Points: " + pointsUser + "<br>Crupier Points: " + pointsCrupier;
	// We draw the crupier cards
	card.x = 50;
	card.y = 400;
	for (i in crupierCards) {
		drawingCards(crupierCards[i]);
	}
	// We check winner
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>Blackjack!!! You Win!!!</b>";
	} else if (pointsUser > 21) {
		info.innerHTML +="<br><b>You have lost... You have exceeded points</b>";
	} else if (pointsCrupier > 21) {
		info.innerHTML +="<br><b>You've won!!! The croupier has gone over points</b>";
	} else if (pointsCrupier >= pointsUser) {
		info.innerHTML += "<br><b>The croupier has won...</b>";
	} else {
		info.innerHTML += "<br><b>You've won!!!</b>";
	}
}

//Reload the page
function playagain() {
	location.reload(true);
}
