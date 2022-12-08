const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return 0
		}

		const [firstPair, secondPair] = line.split(',')
		const [firstPairStart, firstPairStop] = firstPair.split('-').map(str => parseInt(str, 10))
		const [secondPairStart, secondPairStop] = secondPair.split('-').map(str => parseInt(str, 10))

		return (
			(firstPairStart <= secondPairStart && firstPairStop >= secondPairStart) ||
			(secondPairStart <= firstPairStart && secondPairStop >= firstPairStart)
		) ? 1 : 0
	}
	
	const lines = data.split('\n')
	
	console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected: 835
}

// example data
/* treatData(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)*/ // expected: 2

fs.readFile('./data/4.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
