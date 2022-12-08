const fs = require('fs')

function getCommonLetter(string) {
	const nbItems = string.length
	const compartmentA = string.slice(0, nbItems / 2)
	const compartmentB = string.slice(nbItems / 2, nbItems)

	return [...compartmentA].find(letter => compartmentB.indexOf(letter) > -1)
}
function letterToValue(letter) {
	if (!letter) {
		return 0
	}

	const charCode = letter.charCodeAt(0)
	const ZCharCode = 90
	const ACharCode = 65
	const aCharCode = 97
	const upperCaseBonus = 26
	const isLowerCaseLetter = charCode > ZCharCode

	return isLowerCaseLetter ? charCode - aCharCode + 1 : charCode - ACharCode + 1 + upperCaseBonus
}

function treatData(data) {
	const commonObjectValue = (rucksack) => letterToValue(getCommonLetter(rucksack))
	const rucksacks = data.split('\n')
	
	console.log(rucksacks.reduce((acc, rucksack) => acc + commonObjectValue(rucksack), 0)) // expected: 7848
}

/* treatData(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)*/ // expect 157

fs.readFile('./data/3.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
