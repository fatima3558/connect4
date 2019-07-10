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
}