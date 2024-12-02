const fs = require('fs')

function treatData(data) {
	const arrLeft = [], arrRight = []
	const similarity = value => arrRight.reduce((acc, rightValue) => acc + (rightValue === value ? 1 : 0), 0)

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

	console.log(arrLeft.reduce(
		(acc, value) => acc + value * similarity(value),
		0)
	) // expected: 28786472
}

// example data
/*
treatData(`3   4
4   3
2   5
1   3
3   9
3   3`) // expected: 31
*/

fs.readFile('./data/1.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
