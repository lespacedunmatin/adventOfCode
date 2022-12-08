const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return 0
		}

		return 0
	}

	const lines = data.split('\n')
	const blankLineIndex = lines.findIndex(line => line === '')
	const initialSituationDrawing = lines.slice(0, blankLineIndex)
	const craneInstructions = lines.slice(blankLineIndex + 1)
	const initialSituation = (() => {
		const extractDataFromLine = (line) => {
			// We suppose interesting data is always one character only.
			// Would not work with a stack with more than 9 columns (base 10)
			return [...line].filter((letter, index) => index % 4 === 1)
		}
		const stacks = extractDataFromLine(initialSituationDrawing.pop()).map(cell => {return ''})

		while (initialSituationDrawing.length > 0) {
			const line = extractDataFromLine(initialSituationDrawing.pop())

			stacks.forEach((stack, index) => {
				if (line[index]) {
					stacks[index] = `${stack}${line[index]}`
				}
			})
		}

		return stacks.map(stack => stack.trim());
	})()
	const finalSituation = (() => {
		const stacks = [...initialSituation]

		while (craneInstructions.length > 0) {
			const instruction = craneInstructions.shift()
			const [qty, origin, destination] = instruction.slice(5).split(/ from | to /).map(str => parseInt(str, 10))
			for (let i = 1; i <= qty; i++) {
				const crateMoving = stacks[origin - 1].slice(-1)
				stacks[origin - 1] = stacks[origin - 1].slice(0, stacks[origin - 1].length - 1)
				stacks[destination - 1] = `${stacks[destination - 1]}${crateMoving}`
			}
		}

		return stacks
	})()

	console.log(finalSituation.reduce((acc, stack) => acc + stack.slice(-1), '')) // expected: GFTNRBZPF
}

// example data
/*treatData(`    [D]
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)*/ // expected: CMZ

fs.readFile('./data/5.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
