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
	const length = 10 // 2+
	const head = new Knot()
	const tail = new Knot()
	const visitedByTail = new Set(['0,0'])
	const rope = []

	for (let i = 0; i < length; i++) {
		switch (i) {
			case 0:
				rope.push(head)
				break
			case length - 1:
				rope.push(tail)
				break
			default:
				rope.push(new Knot())
		}
	}
	const moveHead = (direction, qty) => {
		const checkNextKnotMovement = (index) => {
			switch (rope[index - 1].x - rope[index].x) {
				case 2:
					rope[index].move('R')
					switch (rope[index - 1].y - rope[index].y) {
						case 2:
						case 1:
							rope[index].move('U')
							break
						case 0:
							// Do nothing
							break
						case -1:
						case -2:
							rope[index].move('D')
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				case 1:
					switch (rope[index - 1].y - rope[index].y) {
						case 2:
							rope[index].move('R')
							rope[index].move('U')
							break
						case 1:
						case 0:
						case -1:
							// Do nothing
							break
						case -2:
							rope[index].move('R')
							rope[index].move('D')
							break
						default:
							throw new Error('Rope ripped')
					}
					break
				case 0:
					switch (rope[index - 1].y - rope[index].y) {
						case 2:
							rope[index].move('U')
							break
						case -2:
							rope[index].move('D')
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
				case -1:
					switch (rope[index - 1].y - rope[index].y) {
						case 2:
							rope[index].move('L')
							rope[index].move('U')
							break
						case -2:
							rope[index].move('L')
							rope[index].move('D')
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
					rope[index].move('L')

					switch (rope[index - 1].y - rope[index].y) {
						case 2:
						case 1:
							rope[index].move('U')
							break
						case 0:
							// Do nothing
							break
						case -1:
						case -2:
							rope[index].move('D')
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

			for (let i = 1; i < length; i++) {
				checkNextKnotMovement(i)
			}

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

	data.split('\n').forEach(line => treatLine(line))

	console.log(visitedByTail.size) // expected: 2460
}

// example data
/*treatData(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)*/ // expected: 36

fs.readFile('./data/9.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
