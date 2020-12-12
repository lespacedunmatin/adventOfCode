const fs = require('fs')

function treatData(data) {
	let result = 0

	function formatLine(line) {
		let rule, positions, firstPosition, secondPosition, letter, password
			
		[rule, password] = line.split(':');
		[positions, letter] = rule.split(' ');
		[firstPosition, secondPosition] = positions.split('-');
		
		return {firstPosition, secondPosition, letter, password}
	}

	function checkLine(line) {
		let count = 0
		
		if (!line.password) {
			return
		}
		
		if (
			(line.password[line.firstPosition] === line.letter || line.password[line.secondPosition] === line.letter) && 
			line.password[line.firstPosition] !== line.password[line.secondPosition]
		) {
			result++
		}
	}

	data.split('\n')
		.map(line => formatLine(line))
		.forEach(checkLine)

	console.log(result) // expected: 454

}

fs.readFile('./data/2.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
