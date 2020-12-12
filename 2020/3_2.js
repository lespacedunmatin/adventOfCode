const fs = require('fs')

function treatData(data) {
	/*
    Right 1, down 1.
    Right 3, down 1.
    Right 5, down 1.
    Right 7, down 1.
    Right 1, down 2.
	*/
	const slopes = [{x: 1, y: 1}, {x: 1, y: 3}, {x: 1, y: 5}, {x: 1, y: 7}, {x: 2, y: 1}]
	let dataPeriod // Computed on first line length
	let xPos = 0 // Position on x axis
	let results = Array(slopes.length).fill(0) // Nb of trees encoutered per slope

	function checkLine(line) {
		if (!line.length) {
			return
		}
		
		if (!dataPeriod) {
			dataPeriod = line.length
		}
		
		slopes.forEach((slope, index) => {
			let yPos = (xPos / slope.x) * slope.y
			let yPosMod = yPos % dataPeriod
			
			if (xPos % slope.x === 0 && line[yPosMod] === '#') {
				results[index]++
			}
		})
		
		xPos++;
	}

	data.split('\n')
		.forEach(checkLine)

	console.log(results) // expected: [ 68, 268, 73, 75, 30 ]
	console.log(results.reduce((acc, number) => acc * number, 1)) // expected: 3093068400

}

fs.readFile('./data/3.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
