const fs = require('fs')

class Passenger {
	constructor(data) {
		this.responses = Array.from(data.responses) || []
	}
}

class Group {
	constructor() {
		this.passengers = []
	}
	
	get responses() {
		return this.passengers.reduce((groupResponses, passenger) => {
			passenger.responses.forEach(response => {
				if(!groupResponses.includes(response)) {
					groupResponses.push(response)
				}
			})
			
			return groupResponses
		}, []) || []
	}
}

function treatData(data) {
	const groups = []
	let newGroup = true
	let sumNbResponsesPerGroup
	
	function treatLine(line) {
		console.log(line)
		if (line === '') {
			console.log('new group')
			newGroup = true
			return
		}
		
		if (newGroup) {
			groups.unshift(new Group())
			newGroup = false
		}
		
		groups[0].passengers.push(new Passenger({responses: line}))
	}
	
	data.split('\n')
		.forEach(treatLine)

	console.log(groups)

	sumNbResponsesPerGroup = groups.reduce((sum, group) => sum + group.responses.length, 0)
	
	console.log(sumNbResponsesPerGroup) // expected: 
}

fs.readFile('./data/6.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
