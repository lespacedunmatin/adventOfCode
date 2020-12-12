const fs = require('fs')

function treatData(data) {
	let result = 0

	function formatLine(line) {
		let rule, minMax, min, max, letter, password
			
		[rule, password] = line.split(':');
		[minMax, letter] = rule.split(' ');
		[min, max] = minMax.split('-');
		
		return {min, max, letter, password}
	}

	function checkLine(line) {
		let count = 0
		
		if (!line.password) {
			return
		}
		
		Array.from(line.password).forEach(letter => {
			if (letter === line.letter) {
				count++
			}
		})
		
		if (count >= line.min && count <= line.max) {
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
