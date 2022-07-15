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


function askForCard() {
	// We put a maximum of cards that you can make so that the dealer can also draw his
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta]; //Card played
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
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
	for (i in cartasJugador) {
		pointsUser += cartasJugador[i].valor;
	}
	// We draw cards to the crupier and count his points
	while (pointsCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta]);
		pointsCrupier += cartas[indiceCarta].valor;
		indiceCarta++;
	}
	// Points of the game are put in info
	info.innerHTML = "Puntuación jugador: " + pointsUser + "<br>Puntuación crupier: " + pointsCrupier;
	// We draw the crupier cards
	carta.x = 50;
	carta.y = 400;
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i]);
	}
	// We check winner
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>Blackjack!!! You WIn!!!</b>";
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
