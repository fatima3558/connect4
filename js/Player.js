console.log("Player Class");

class Player {
	constructor(name) {
		this.name = name
		this.tileColor = null
		this.coord = []
		this.verticalWin = []
		this.horizontalWin = []
		this.diagonalUpWin = []
		this.diagonalDownWin = []
	}

	checkVertical(coord) {
		//go through the array of coordinates
		for( let i = 0; i < this.coord.length; i++) {
			//push each coord pair into verticalWin
			for( let j = i; j < this.coord.length - i; j++) {
				this.verticalWin.push(this.coord[j]);
				console.log("pushed next coordinates");
				if( this.verticalWin.length >= 2 ) {
					console.log("checking conditions");	
					// if neither the letters/columns (index 0) of the i-th and j-th coordinate pairs match
					//nor the number/row (index 1) of the i-th coodinate pair PLUS ONE equals the number/row of the j-th coordinate pair
					//start from the second one and check back one
					for( let k = 1; k < this.verticalWin.length - 1; k++) {
						if( 
							this.verticalWin[k-1][0] !== this.verticalWin[k][0] || 
							( (parseInt(this.verticalWin[k-1][1]) + 1) !== parseInt(this.verticalWin[k][1]) )
						) {
							//then clear the verticalWin array because the tiles aren't consecutively vertical
							//and stop checking this internal loop
								console.log("conditions passed");
								this.verticalWin = [];
								console.log(this.verticalWin);
								break;
						}
					}
					// 	else if( this.verticalWin.length = 4) {
					// 	console.log(this.verticalWin);
					// 	console.log("this player won!");
					// }
				}				
			}

				

				//when there are 2+ coord pairs in the verticalWin array, compare them
				//starting from the same 
				// for( let j = 0; j < this.verticalWin.length; j++) {
			// console.log(this.verticalWin);
			// this.verticalWin = []
		}

	}

}