const fs = require('fs')

class Instruction {
	constructor(data) {
		const [type, quantity] = data.split(' ')
		this.runs = 0
		this.type = type
		this.quantity = parseInt(quantity)
	}
}

function treatData(data) {
	const instructions = []
	let currentInstructionIndex = 0
	let accumulator = 0
	
	function treatLine(line) {
		if (line === '') {
			return
		}
		
		instructions.push(new Instruction(line))
	}
	
	function runProgram() {
		const currentInstruction = instructions[currentInstructionIndex]
		
		if (currentInstruction.runs > 0) {
			return
		}
		
		currentInstruction.runs++
		
		switch (currentInstruction.type) {
			case 'acc': 
				accumulator = accumulator + currentInstruction.quantity
				currentInstructionIndex++
			break
			case 'jmp':
				currentInstructionIndex = currentInstructionIndex + currentInstruction.quantity
			break
			default: 
				currentInstructionIndex++
		}
		
		runProgram()
	}
	
	data.split('\n')
		.forEach(treatLine)
		
	runProgram()
		
	console.log(accumulator) // expected: 1930
}

fs.readFile('./data/8.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
