const fs = require('fs')

function getCommonLetter(group) {
	const [firstSac, ...otherSacs] = group
	return [...firstSac].find(letter => otherSacs.every(sac => sac.indexOf(letter) > -1))
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
	const commonObjectValue = (group) => letterToValue(getCommonLetter(group))
	const rucksacks = data.split('\n')
	const groups = rucksacks.reduce((groups, rucksack, index) => {
		if (index % 3 === 0) {
			groups.push([])
		}

		groups[groups.length - 1].push(rucksack)

		return groups
	}, [])

	console.log(groups.reduce((acc, group) => acc + commonObjectValue(group), 0)) // expected: 2616
}

/*treatData(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)*/ // expect 70

fs.readFile('./data/3.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
