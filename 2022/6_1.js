const fs = require('fs')

function treatData(data) {
	const span = 4
	let index = 0
	const allDifferents = (chars) => ![...chars]
		.some((char, index, array) => index !== array.length && array.slice(index + 1).includes(char));
	let spanChars = data.slice(0, span)

	while (!allDifferents(spanChars) && index <= data.length - span) {
		index++
		spanChars = data.slice(index, index + span)
	}

	console.log(index + span) // expected: 1757
}

// example data
/*treatData(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`) // expected: 7
treatData(`bvwbjplbgvbhsrlpgdmjqwftvncz`) // expected: 5
treatData(`nppdvjthqldpwncqszvftbrmjlhg`) // expected: 6
treatData(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`) // expected: 10
treatData(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`) // expected: 11*/

fs.readFile('./data/6.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
