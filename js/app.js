console.log("connect 4");

const game = {
	player1: null,
	player2: null,
	turnsTaken: 0,
	playerOneCoord: [],
	playerTwoCoord: [],
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
	//set player names and tile colors
		const name1 = new Player;
		this.player1 = name1;
		name1.name = prompt("Player 1, what's your name?")
		$(".first h4").text(name1.name);
		playerOneColor = prompt("Player 1, pick a color! \rYour options include: red, yellow, blue, purple, or white.");
		name1.tileColor = playerOneColor.toLowerCase();
		$(".color1").css("background-color", name1.tileColor);
		// console.log(name1);

		const name2 = new Player;
		this.player2 = name2;
		name2.name = prompt("Player 2, what's your name?");
		$(".second h4").text(name2.name);
		playerTwoColor = prompt("Player 2, pick a color! \rYour options include orange, green, purple, grey, or pink.");
		name2.tileColor = playerTwoColor.toLowerCase();
		$(".color2").css("background-color", name2.tileColor);
		// console.log(name2);
	},

	findEmptySpaces(columnClicked) {
		console.log(columnClicked);
		for( let i = 0; i < this.columns[columnClicked].length; i++) {
			// find the first one that doesn't have data "black"
			if( this.columns[columnClicked][i].attr("data") === "black") {
				const emptySpace = this.columns[columnClicked][i];
				// console.log(emptySpace);
				this.takeTurns(emptySpace);
				break;
			}

		}

	},

	takeTurns(emptySpace) {
		if( this.turnsTaken % 2 === 0) {
			$(".second").css("border", `2px solid ${this.player2.tileColor}`);
			$(".first").css("border", `2px solid black`);
			this.playerOneTurn(emptySpace);
		}
		else if( this.turnstaken % 2 !== 0) {
			$(".first").css("border", `2px solid ${this.player1.tileColor}`);
			$(".second").css("border", `2px solid black`);
			this.playerTwoTurn(emptySpace);
		}

	},

	playerOneTurn(emptySpace) {
		console.log("player 1's turn");
		const emptySpaceName = $(emptySpace).attr("id");
		//check background color of space before it's changed to player 1 color
		// console.log(($(`#${emptySpaceName}`).css("background-color")));
		const color = this.player1.tileColor;
		$(`#${emptySpaceName}`).css("background-color", `${color}`);
		//reset data key value to player 1's color
		$(`#${emptySpaceName}`).attr("data", `${color}`);
		// console.log();
		this.turnsTaken++;
		this.createPlayerOneCoord();
	},

	playerTwoTurn(emptySpace) {
		console.log("player 2's turn");
		const emptySpaceName = $(emptySpace).attr("id");
		//check background color of space before it's changed to player 2 color
		// console.log(($(`#${emptySpaceName}`).css("background-color")));
		const color = this.player2.tileColor;
		$(`#${emptySpaceName}`).css("background-color", `${color}`);
		//reset data key value to player 1's color
		$(`#${emptySpaceName}`).attr("data", `${color}`);
		this.turnsTaken++;
		this.createPlayerTwoCoord();
	},

	createPlayerOneCoord() {
		const arrayToCheck = [];
		//for every array in the object
		for( let key in this.columns) {
			// for every item in each array
			for( let i = 0; i < this.columns[key].length; i++) {
				if( this.columns[key][i].attr("data") === this.player1.tileColor) {
					// console.log(this.columns[key][i]);
					arrayToCheck.push(this.columns[key][i])
				}

			}

		}
		console.log(arrayToCheck);
//------------------------------------------------------------
		//in order to check rows and columns, split div id strings into array of strings, one string being a letter for the column, the other string being a number for the row
		this.playerOneCoord = [];
		for( let i = 0; i < arrayToCheck.length; i++) {
			this.playerOneCoord.push($(arrayToCheck[i]).attr("id").split(""));
		}
		console.log(this.playerOneCoord);

	},

	createPlayerTwoCoord() {
		const arrayToCheck = [];
		//for every array in the object
		for( let key in this.columns) {
			// for every item in each array
			for( let i = 0; i < this.columns[key].length; i++) {
				if( this.columns[key][i].attr("data") === this.player2.tileColor) {
					// console.log(this.columns[key][i]);
					arrayToCheck.push(this.columns[key][i])
				}

			}

		}
		console.log(arrayToCheck);
		
		this.playerTwoCoord = [];
		for( let i = 0; i < arrayToCheck.length; i++) {
			this.playerTwoCoord.push($(arrayToCheck[i]).attr("id").split(""));
		}
		console.log(this.playerTwoCoord);
	},

	//check vertical
		// if(arrayOfCoordinates.length >=2) {
		// 	for( let i = 0; i < arrayOfCoordinates.length - 1; i++){
		// 	const verticalMatches = [];
		// 		if( (arrayOfCoordinates[i][0] === arrayOfCoordinates[i+1][0])); 
		// 		{
		// 			verticalMatches.push(arrayOfCoordinates[i])
		// 		}
		// 	console.log(verticalMatches);
		// 	}
			
		// }

}

game.startPlayers();


//Event listeners
$(".game").on('click', (e) => {
	// console.log($(e.target).hasClass('space'));// -- only do thebelow if e.target does NOT have class space
	if( $(e.target).hasClass("space") === false) {
		// console.log("this shouldn't happen if you click the white");
		const columnClicked = $(e.target).attr("class");
		game.findEmptySpaces(columnClicked);
	}

})


