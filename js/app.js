console.log("connect 4");

const game = {
	player1: new Player,
	player2: new Player,

	startPlayers() {
		this.player1.name = prompt("Player 1, what's your name?");
		$(".first h4").text(this.player1.name);
		// console.log(this.player1.name);
		this.player2.name = prompt("Player 2, what's your name?");
		$(".second h4").text(this.player2.name);
		// console.log(this.player2.name);
	}
}

game.startPlayers()