const fs = require('fs')

function treatData(data) {
	const arrLeft = [], arrRight = []

	data.split('\n').map(line => {
		if (line === "") {
			return
		}

		line.split('   ').map((value, index) => {
			if (index === 0) {
				arrLeft.push(parseInt(value, 10))
			} else {
				arrRight.push(parseInt(value, 10))
			}
		})
	})
	arrLeft.sort()
	arrRight.sort()

	console.log(arrLeft.reduce(
		(acc, value, currentIndex) => acc + Math.abs(value - arrRight[currentIndex]),
		0)
	) // expected: 2430334
}

// example data
/*
treatData(`3   4
4   3
2   5
1   3
3   9
3   3`) // expected: 11
*/

fs.readFile('./data/1.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})

