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
	
	function mutateAndRunProgram() {		
		instructions.every((instruction, index) => {
			let res
			
			instructions.forEach(insctruction => {
				insctruction.runs = 0
			})
			currentInstructionIndex = 0
			accumulator = 0
			
			const mutantInstruction = instructions[index]
			
			switch (mutantInstruction.type) {
				case 'jmp':
					mutantInstruction.type = 'nop'
					res = !runProgram()
					mutantInstruction.type = 'jmp'
					break
				case 'nop':
					mutantInstruction.type = 'jmp'
					res = !runProgram()
					mutantInstruction.type = 'nop'
					break
				default:
					res = true
			}
			
			return res
		})
		
	}
	
	function runProgram() {
		if (currentInstructionIndex === instructions.length) {
			return true
		}
		
		if (currentInstructionIndex > instructions.length) {
			return false
		}
		
		const currentInstruction = instructions[currentInstructionIndex]
		
		if (currentInstruction.runs > 0) {
			return false
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
		
		return runProgram()
	}
	
	data.split('\n')
		.forEach(treatLine)
	
	mutateAndRunProgram()
		
	console.log(accumulator) // expected: 1688
}

fs.readFile('./data/8.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
