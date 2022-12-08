const fs = require('fs')

function treatData(data) {
	const span = 14
	let index = 0
	const allDifferents = (chars) => ![...chars]
		.some((char, index, array) => index !== array.length && array.slice(index + 1).includes(char));
	let spanChars = data.slice(0, span)
	while (!allDifferents(spanChars) && index <= data.length - span) {
		index++
		spanChars = data.slice(index, index + span)
	}

	console.log(index + span)
}

// example data
/*treatData(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`) // expected: 19
treatData(`bvwbjplbgvbhsrlpgdmjqwftvncz`) // expected: 23
treatData(`nppdvjthqldpwncqszvftbrmjlhg`) // expected: 23
treatData(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`) // expected: 29
treatData(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`) // expected: 26*/

fs.readFile('./data/6.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
