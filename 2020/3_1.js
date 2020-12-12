const fs = require('fs')

function treatData(data) {
	const offset = 3 // Offset to the right on y axis
	let dataPeriod // Computed on first line length
	let yPos = 0 // Position on y axis
	let result = 0 // Nb of trees encoutered

	function checkLine(line) {
		if (!line.length) {
			return
		}
		
		if (!dataPeriod) {
			dataPeriod = line.length
		}
		
		if (line[yPos % dataPeriod] === '#') {
			result++
		}
		
		yPos += offset
	}

	data.split('\n')
		.forEach(checkLine)

	console.log(result) // expected: 268

}

fs.readFile('./data/3.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
