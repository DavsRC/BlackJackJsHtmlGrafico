function askForCard() {
	// We put a maximum of cards that you can make so that the dealer can also draw his
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta]; //Card played
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
	}
}