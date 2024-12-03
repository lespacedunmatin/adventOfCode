const fs = require('fs')

function treatData(data) {
    const safeDiff = 3;
    const isLineSafe = line => {
        if (line === '') {
            return 0
        }

        const values = line.split(' ').map(value => parseInt(value, 10))
        const isIncreasing = values[1] - values[0] > 0

        return values.every((value, index, arr) => {
            if (index === 0) {
                return true
            }

            if (
                (isIncreasing && value < arr[index - 1]) ||
                (!isIncreasing && value > arr[index - 1]) ||
                value === arr[index - 1]
            ) {
                return false
            }

            return Math.abs(value - arr[index - 1]) <= safeDiff
        })
    }
    const treatLine = (line) => isLineSafe(line) ? 1 : 0
    const lines = data.split('\n')

    console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected: 686
}

// example data
/*
treatData(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`) // expected: 2
*/

fs.readFile('./data/2.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})

