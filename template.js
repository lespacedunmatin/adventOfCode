const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return
		}
		
	}
	
	data.split('\n')
		.forEach(treatLine)
	
	console.log() // expected: 
}

fs.readFile('./data/.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
