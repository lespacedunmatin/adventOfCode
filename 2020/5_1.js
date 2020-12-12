const fs = require('fs')

function treatData(data) {
	const nbOfRows = 128
	const nbOfColumns = 8
	let seatIds = []
	
	function calculateSeatId(seat) {
		const rowData = seat.slice(0, 7)
		const columnData = seat.slice(7)
		const rowNumber = parseInt(rowData.replaceAll('F', 0).replaceAll('B', 1), 2)
		const columnNumber = parseInt(columnData.replaceAll('L', 0).replaceAll('R', 1), 2)
		
		seatIds.push(rowNumber * 8 + columnNumber)
	}
	
	data.split('\n')
		.forEach(calculateSeatId)
	console.log(seatIds.reduce((highest, id) => id > highest ? id : highest, 0)) // expected: 813
}

fs.readFile('./data/5.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
