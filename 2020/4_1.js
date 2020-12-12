const fs = require('fs')

class Passport {	
	constructor() {
		this.byr = undefined
		this.iyr = undefined
		this.eyr = undefined
		this.hgt = undefined
		this.hcl = undefined
		this.ecl = undefined
		this.pid = undefined
		this.cid = undefined
	}
	
	get isValid() {
		return !!this.byr && !!this.iyr && !!this.eyr && !!this.hgt && !!this.hcl && !!this.ecl && !!this.pid
	}
}

function treatData(data) {
	const passports = []
	let passportIndex = 0
	let newPassport = true
	let result
	
	function fillPassportsData(line) {
		if (line.length === 0) {
			newPassport = true
			return
		}
		
		if (newPassport) {
			newPassport = false
			passportIndex++
			passports[passportIndex] = new Passport()
		}
		
		line.split(' ').forEach(item => {
			let [key, value] = item.split(':')
			passports[passportIndex][key] = value
		})
	}
	
	function checkPassports() {
		result = passports.reduce((nbValid, passport) => passport.isValid ? nbValid + 1 : nbValid, 0)
	}
	
	data.split('\n')
		.forEach(fillPassportsData)
		
	checkPassports()
		
	console.log(result) // expected: 242
}

fs.readFile('./data/4.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data);
})
