const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return
		}
	}

	const lines = data.split('\n')

	console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected:
}

// example data
treatData(``) // expected:

fs.readFile('./data/.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	// treatData(data)
})
