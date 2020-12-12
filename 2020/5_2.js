const fs = require('fs')

function treatData(data) {
	const nbOfRows = 128
	const nbOfColumns = 8
	const seatsIds = []
	const missingSeatsIds = []
	let mySeat
	
	function calculateSeatId(seat) {
		const rowData = seat.slice(0, 7)
		const columnData = seat.slice(7)
		const rowNumber = parseInt(rowData.replaceAll('F', 0).replaceAll('B', 1), 2)
		const columnNumber = parseInt(columnData.replaceAll('L', 0).replaceAll('R', 1), 2)
		
		seatsIds.push(rowNumber * 8 + columnNumber)
	}
	
	data.split('\n')
		.forEach(calculateSeatId)
		
	seatsIds.sort((a, b) => a - b)
	
	for(let i = 0; i < nbOfRows * nbOfColumns; i++) {
		if (!seatsIds.includes(i)) {
			missingSeatsIds.push(i);
		}
	}
	
	missingSeatsIds.every((seatId, index) => {
		let previousId = index > 0 ? missingSeatsIds[index - 1] : undefined
		let nextId = index < missingSeatsIds.length - 1 ? missingSeatsIds[index + 1] : undefined
		
		if (previousId && previousId + 1 !== seatId && nextId && nextId - 1 !== seatId) {
			mySeat = seatId
			return false
		}
		
		return true
	})
	console.log(mySeat) // expected: 612
}

fs.readFile('./data/5.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
