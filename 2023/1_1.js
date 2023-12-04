const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return 0
		}

		const firstDigitRegex = /^\D*(\d)/g
		const lastDigitRegex = /(\d)\D*$/g
		const firstNumber = firstDigitRegex.exec(line)[1]
		const lastNumber = lastDigitRegex.exec(line)[1]

		return parseInt(firstNumber + lastNumber, 10)
	}

	const lines = data.split('\n')

	console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected: 55834
}

// example data
/*treatData(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`) // expected: 142*/

fs.readFile('./data/1.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
