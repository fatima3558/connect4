console.log("connect 4");

const game = {
	player1: null,
	player2: null,
	player1Won: false,
	player2Won: false,
	turnsTaken: 0,
	columns: {
		"1 a": [$('#11'), $('#12'), $('#13'), $('#14'), $('#15'), $('#16')],
		"2 b": [$('#21'), $('#22'), $('#23'), $('#24'), $('#25'), $('#26')],
		"3 c": [$('#31'), $('#32'), $('#33'), $('#34'), $('#35'), $('#36')],
		"4 d": [$('#41'), $('#42'), $('#43'), $('#44'), $('#45'), $('#46')],
		"5 e": [$('#51'), $('#52'), $('#53'), $('#54'), $('#55'), $('#56')],
		"6 f": [$('#61'), $('#62'), $('#63'), $('#64'), $('#65'), $('#66')],
		"7 g": [$('#71'), $('#72'), $('#73'), $('#74'), $('#75'), $('#76')]
	},	
	allDivs: 
	[
		$('#11'), $('#12'), $('#13'), $('#14'), $('#15'), $('#16'), 
		$('#21'), $('#22'), $('#23'), $('#24'), $('#25'), $('#26'), 
		$('#31'), $('#32'), $('#33'), $('#34'), $('#35'), $('#36'), 
		$('#41'), $('#42'), $('#43'), $('#44'), $('#45'), $('#46'), 
		$('#51'), $('#52'), $('#53'), $('#54'), $('#55'), $('#56'), 
		$('#61'), $('#62'), $('#63'), $('#64'), $('#65'), $('#66'), 
		$('#71'), $('#72'), $('#73'), $('#74'), $('#75'), $('#76')
	],

	startPlayers() {
	//set player names and tile colors
		const name1 = new Player;
		this.player1 = name1;
		name1.name = prompt("Player 1, what's your name?")
		$(".first h4").text(name1.name);
		playerOneColor = prompt("Player 1, pick a color! \rYour options include: red, yellow, blue, brown, or white.");
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

	//hide spinner for now
		$("#spinner").hide();
		$("#arrow-div").hide();
	},

	findEmptySpaces(columnClicked) {
		// console.log(columnClicked);
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
		this.turnsTaken++;
		this.checkVertical();

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
		this.checkVertical();
	},
// -----------------------THIS WORKS!-------------------------
	checkVertical() {
		// starting from the 4th item in the array of divs,
		for( let i = 3; i < this.allDivs.length - 3; i++) {
			// check any 4 consecutive divs
			let tempArray = [];
			//fist, make sure the first two are in the same column
			//if they are, push them into tempArray
			if( $(this.allDivs[i-3]).attr("class") === $(this.allDivs[i-2]).attr("class")) {
				tempArray.push($(this.allDivs[i-3]).attr("data"));	
				tempArray.push($(this.allDivs[i-2]).attr("data"));

				//if they are, also check if the i-2th and i-1th are in the same column
				if( $(this.allDivs[i-2]).attr("class") === $(this.allDivs[i-1]).attr("class")) {
					//if they are, push the i-1th one
					tempArray.push($(this.allDivs[i-1]).attr("data"));
					//if they are, also check if the i-1th and ith are in the same column
					if( $(this.allDivs[i-1]).attr("class") === $(this.allDivs[i]).attr("class")) {
						tempArray.push($(this.allDivs[i]).attr("data"));
					}
					//if the i-1th and ith don't match, clear the array and add one to i
					else {
						tempArray = [];
						continue;
					}
				} 
				//if the i-2th and i-1th don't match, clear the array and add 1 to i
				else {
					tempArray = [];
					continue;
				}
			} 
			//if the i-3th and i-2th don't match, clear array and add 1 to i
			else {
				tempArray = []
				continue;
			}
			//if a group of 4 gets through ALL OF THAT, check the colors
			// console.log(tempArray);		
				if( 
					tempArray[0] === this.player1.tileColor &&
					tempArray[1] === this.player1.tileColor &&
					tempArray[2] === this.player1.tileColor && 
					tempArray[3] === this.player1.tileColor 
				) {
					console.log("player1 won");
					this.player1Won = true;
					// this.playerWon(this.player1);
					break;
				}
				else if (
					tempArray[0] === this.player2.tileColor &&
					tempArray[1] === this.player2.tileColor &&
					tempArray[2] === this.player2.tileColor && 
					tempArray[3] === this.player2.tileColor 
				) {
					console.log("player2 won");
					this.player2Won = true;
					// this.playerWon(this.player2);
					break;
				}

		}
		if( this.player1Won === false && this.player2Won === false) {
			this.checkHorizontal();
		}
		else {
			this.declareWin();
		}
	},
		
// ------------------------THIS WORKS!--------------------------
	checkHorizontal() {
		for( let i = 0; i < this.allDivs.length; i++) {
			//create a temp array to hold 4 divs from allDivs that are 6 divs apart
			let tempArray = [];
			tempArray.push($(this.allDivs[i]).attr("data"));
			tempArray.push($(this.allDivs[i+6]).attr("data"));
			tempArray.push($(this.allDivs[i+12]).attr("data"));
			tempArray.push($(this.allDivs[i+18]).attr("data"));
			// console.log("checkHorizontal is working");

			// console.log(tempArray);

			//check tempArray through this.checkColors()

			if( 
					tempArray[0] === this.player1.tileColor &&
					tempArray[1] === this.player1.tileColor &&
					tempArray[2] === this.player1.tileColor && 
					tempArray[3] === this.player1.tileColor 
				) {
					console.log("player1 won");
					this.player1Won = true;
					break;
				}
			else if (
					tempArray[0] === this.player2.tileColor &&
					tempArray[1] === this.player2.tileColor &&
					tempArray[2] === this.player2.tileColor && 
					tempArray[3] === this.player2.tileColor 
				) {
					console.log("player2 won");
					this.player2Won = true;
					break;
				}

			else {
				tempArray = [];
				continue;
			}
		}
		if( this.player1Won === false && this.player2Won === false) {
			this.checkDiagonalUp();
		}
		else {
			this.declareWin();
		}

	},
// ---------------------------THIS WORKS!--------------------------
	checkDiagonalUp() {
		for( let i = 0; i < this.allDivs.length; i++) {
			// create a temp array to hold 4 divs from allDivs that are 7 divs apart
			let tempArray = [];

			// console.log(parseInt($(this.allDivs[0]).attr("id")));

			// if 11 plus the numerical value of the id equals the numerical value of the div seven divs away, push both into tempArray
			if( parseInt($(this.allDivs[i]).attr("id")) + 11 === parseInt($(this.allDivs[i+7]).attr("id")) ) {
				// console.log("first two are being pushed");
				tempArray.push($(this.allDivs[i]).attr("data"));
				tempArray.push($(this.allDivs[i+7]).attr("data"));

				// if i and i+7 are in consecutive columns (numerical value of ids have a difference of 11), check i+7 and i+14 for the same
				if( parseInt($(this.allDivs[i+7]).attr("id")) + 11 === parseInt($(this.allDivs[i+14]).attr("id")) ) {
					// console.log("the third is being pushed");
					tempArray.push($(this.allDivs[i+14]).attr("data"));

					//if i+7 and i+14 are in consecutive columns, check i+14 and i+21
					if( parseInt($(this.allDivs[i+14]).attr("id")) + 11 === parseInt($(this.allDivs[i+21]).attr("id")) ) {
						// console.log("the fourth is being pushed");
						tempArray.push($(this.allDivs[i+21]).attr("data"));
						// console.log(tempArray);
					}

					else {
						tempArray = [];
						continue;
					}

				}

				//if i+7 and i+14 are not in consecutive columns, ignore and continue loop
				else {
					tempArray = [];
					continue;
				}

			}

			// if i and i+7 are not in consecutive columns, ignore and keep going with loop
			else {
				tempArray = [];
				continue;
			}

			if( 
					tempArray[0] === this.player1.tileColor &&
					tempArray[1] === this.player1.tileColor &&
					tempArray[2] === this.player1.tileColor && 
					tempArray[3] === this.player1.tileColor 
				) {
					console.log("player1 won");
					this.player1Won = true;
					break;
				}
			else if (
					tempArray[0] === this.player2.tileColor &&
					tempArray[1] === this.player2.tileColor &&
					tempArray[2] === this.player2.tileColor && 
					tempArray[3] === this.player2.tileColor 
				) {
					console.log("player2 won");
					this.player2Won = true;
					break;
				}

			else {
				tempArray = [];
				continue;
			}

		}
		if( this.player1Won === false && this.player2Won === false) {
			this.checkDiagonalDown();
		}
		else {
			this.declareWin();
		}
	},
//-----------------------------THIS WORKS!--------------------------
	checkDiagonalDown() {
		for( let i = 0; i < this.allDivs.length; i++) {
			// create a temp array to hold 4 divs from allDivs that are 5 divs apart
			let tempArray = [];

			// if 9 plus the numerical value of the id equals the numerical value of the div seven divs away, push both into tempArray
			if( parseInt($(this.allDivs[i]).attr("id")) + 9 === parseInt($(this.allDivs[i+5]).attr("id")) ) {
				// console.log("first two are being pushed");
				tempArray.push($(this.allDivs[i]).attr("data"));
				tempArray.push($(this.allDivs[i+5]).attr("data"));

				// if i and i+5 are in consecutive columns (numerical value of ids have a difference of 9), check i+5 and i+10 for the same
				if( parseInt($(this.allDivs[i+5]).attr("id")) + 9 === parseInt($(this.allDivs[i+10]).attr("id")) ) {
					// console.log("the third is being pushed");
					tempArray.push($(this.allDivs[i+10]).attr("data"));

					//if i+5 and i+10 are in consecutive columns, check i+10 and i+15
					if( parseInt($(this.allDivs[i+10]).attr("id")) + 9 === parseInt($(this.allDivs[i+15]).attr("id")) ) {
						// console.log("the fourth is being pushed");
						tempArray.push($(this.allDivs[i+15]).attr("data"));
						// console.log(tempArray);
					}

					else {
						tempArray = [];
						continue;
					}

				}

				//if i+7 and i+14 are not in consecutive columns, ignore and continue loop
				else {
					tempArray = [];
					continue;
				}

			}

			// if i and i+7 are not in consecutive columns, ignore and keep going with loop
			else {
				tempArray = [];
				continue;
			}

			if( 
					tempArray[0] === this.player1.tileColor &&
					tempArray[1] === this.player1.tileColor &&
					tempArray[2] === this.player1.tileColor && 
					tempArray[3] === this.player1.tileColor 
				) {
					console.log("player1 won");
					this.player1Won = true;
					break;
				}
			else if (
					tempArray[0] === this.player2.tileColor &&
					tempArray[1] === this.player2.tileColor &&
					tempArray[2] === this.player2.tileColor && 
					tempArray[3] === this.player2.tileColor 
				) {
					console.log("player2 won");
					this.player2Won = true;
					break;
				}

			else {
				tempArray = [];
				continue;
			}

		}
		if( this.player1Won === true || this.player2Won === true) {
			this.declareWin();
		}

	},

	declareWin() {
		$(".game").off("click");
		if( this.player1Won === true) {
			$("#announcement").text(`${this.player1.name} Won!`);
			$("#announcement").css({
				"color": `${this.player1.tileColor}`,
				"font-size": "36px"
			});
			$("h1").css("color", `${this.player1.tileColor}`);
			$(".second").css("border", "none");
			$(".first").css("border", `10px solid ${this.player1.tileColor}`)
		}
		else if( this.player2Won === true) {
			$("#announcement").text(`${this.player2.name} Won!`);
			$("#announcement").css({
				"color": `${this.player2.tileColor}`,
				"font-size": "36px"
			});
			$("h1").css("color", `${this.player2.tileColor}`);
			$(".first").css("border", "none");
			$(".second").css("border", `10px solid ${this.player2.tileColor}`);
		}
	},

	takeAChance(player) {
		console.log(player.tileColor);
		player.chanceTaken = true;
		$("#spinner").show();
		$("#arrow-div").show();
		$(".game").hide();
		console.log("chanceTaken is now true");
	},

	pauseArrow() {
		console.log("tried to stop arrow");
		$("#arrow").css({
			"animation-play-state": "paused",
		});
	}

}

game.startPlayers();


//Event listeners
$(".game").on("click", (e) => {
	// console.log($(e.target).hasClass('space'));// -- only do thebelow if e.target does NOT have class space
	if( $(e.target).hasClass("space") === false) {
		// console.log("this shouldn't happen if you click the white");
		const columnClicked = $(e.target).attr("class");
		game.findEmptySpaces(columnClicked);
	}

});

$(".first button").on("click", (e) => {
	// console.log("player 1 clicked button");
	if(game.player1.chanceTaken === false) {
		game.takeAChance(game.player1);
	};
})

$(".second button").on("click", (e) => {
	// console.log("player 2 clicked button");
	if(game.player2.chanceTaken === false){
		game.takeAChance(game.player2);
	};
})

$("#arrow-stopper").on("click", (e) => {
	console.log("click");
	game.pauseArrow();
})


