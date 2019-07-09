console.log("connect 4");

const game = {
	player1: null,
	player2: null,
	columns: {
		a: [$('#a1'), $('#a2'), $('#a3'), $('#a4'), $('#a5'), $('#a6')],
		b: [$('#b1'), $('#b2'), $('#b3'), $('#b4'), $('#b5'), $('#b6')],
		c: [$('#c1'), $('#c2'), $('#c3'), $('#c4'), $('#c5'), $('#c6')],
		d: [$('#d1'), $('#d2'), $('#d3'), $('#d4'), $('#d5'), $('#d6')],
		e: [$('#e1'), $('#e2'), $('#e3'), $('#e4'), $('#e5'), $('#e6')],
		f: [$('#f1'), $('#f2'), $('#f3'), $('#f4'), $('#f5'), $('#f6')],
		g: [$('#g1'), $('#g2'), $('#g3'), $('#g4'), $('#g5'), $('#g6')]
	},

	startPlayers() {
	//set player names
		// const name1 = new Player;
		// name1 = prompt("Player 1, what's your name?");
		// $(".first h4").text(this.name1.name);
		// this.player1 = this.player;

		
		// console.log(this.player1.name);
		// this.player2.name = prompt("Player 2, what's your name?");
		// $(".second h4").text(this.player2.name);
		// console.log(this.player2.name);

	//--------------set tile colors ---------- for later!
	},

	takeTurns() {
		this.player1.findEmptySpace();

		this.player2.placeTile();
	},

	findEmptySpaces(columnClicked) {
		console.log(columnClicked);
		for( let i = 0; i < this.columns[columnClicked].length; i++) {
			// find the first one that doesn't have data "black"
			if( this.columns[columnClicked][i].attr("data") === "black") {
				const empty = this.columns[columnClicked][i];
				console.log(empty);
				return empty;
			}

		}

	},


}

// game.findEmptySpace();

//Event listeners
$(".game").on('click', (e) => {
	const columnClicked = $(e.target).attr('class');
	// console.log(e.target);
	game.findEmptySpaces(columnClicked);
	return columnClicked;
	// console.log(columnClicked);
})


