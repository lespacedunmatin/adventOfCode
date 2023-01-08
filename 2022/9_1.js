const fs = require('fs')

class Knot {
	x
	y

	constructor() {
		this.x = 0
		this.y = 0
	}

	toString = () => `${this.x},${this.y}`
	move = (direction) => {
		switch (direction) {
			case 'U':
				this.y = this.y + 1
				break
			case 'R':
				this.x = this.x + 1
				break
			case 'D':
				this.y = this.y - 1
				break
			case 'L':
				this.x = this.x - 1
				break
			default:
				throw new Error('Unexpected move direction')
		}
	}
}

function treatData(data) {
	const head = new Knot()
	const tail = new Knot()
	const visitedByTail = new Set(['0,0'])
	const moveHead = (direction, qty) => {
		const checkTailMovement = () => {
			switch (head.x - tail.x) {
				case 2:
					tail.move('R')
					switch (head.y - tail.y) {
						case 1:
							tail.move('U')
							break
						case 0:
							// Do nothing
							break
						case -1:
							tail.move('D')
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				case 1:
					switch (head.y - tail.y) {
						case 2:
							tail.move('R')
							tail.move('U')
							break
						case 1:
						case 0:
						case -1:
							// Do nothing
							break
						case -2:
							tail.move('R')
							tail.move('D')
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				case -1:
					switch (head.y - tail.y) {
						case 2:
							tail.move('L')
							tail.move('U')
							break
						case -2:
							tail.move('L')
							tail.move('D')
							break
						case 1:
						case 0:
						case -1:
							// Do nothing
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				case -2:
					tail.move('L')

					switch (head.y - tail.y) {
						case 1:
							tail.move('U')
							break
						case 0:
							// Do nothing
							break
						case -1:
							tail.move('D')
							break
						default:
							throw new Error('Rope ripped')
					}

					break
				case 0:
					switch (head.y - tail.y) {
						case 2:
							tail.move('U')
							break
						case -2:
							tail.move('D')
							break
						case 1:
						case 0:
						case -1:
							// Do nothing
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				default:
					throw new Error('Rope ripped')
			}
		}
		let nbMovements = 0
		while (nbMovements < qty) {
			nbMovements++
			head.move(direction)
			checkTailMovement()
			visitedByTail.add(tail.toString())
		}
	}

	function treatLine(line) {
		if (line === '') {
			return 0
		}

		const [direction, qty] = line.split(' ')
		moveHead(direction, qty)
	}

	const lines = data.split('\n').forEach(line => treatLine(line))

	console.log(visitedByTail.size) // expected: 6209
}

// example data
/*treatData(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`) // expected: 13*/

fs.readFile('./data/9.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
