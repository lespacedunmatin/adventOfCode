const fs = require('fs')

class Passport {

	/* 
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
	*/
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
		return this.birthYearIsValid && this.issueYearIsValid && this.expirationYearIsValid && this.heightIsValid && this.hairColorIsValid && this.eyeColorIsValid && this.passportNumberIsValid && this.countryIdIsValid
	}
	
	get birthYearIsValid() {
		const birthYear = Number(this.byr)
		
		return birthYear >= 1920 && birthYear < 2003
	}
	
	get issueYearIsValid() {
		const issueYear = Number(this.iyr)
		
		return issueYear >= 2010 && issueYear < 2021
	}
	
	get expirationYearIsValid() {
		const expirationYear = Number(this.eyr)
		
		return expirationYear >= 2020 && expirationYear < 2031
	}
	
	get heightIsValid() {		
		if (!this.hgt) {
			return false
		}
		
		const match = RegExp(/^(\d*)(in|cm)/).exec(this.hgt)
		
		if (!match) {
			return false
		}
		
		const [, size, unit] = match
		
		switch (unit) {
			case 'in':
				return Number(size) > 58 && Number(size) < 77
				break
			case 'cm':
				return Number(size) > 149 && Number(size) < 194
				break
			default: 
				return false
		}
		
	}
	
	get hairColorIsValid() {
		return RegExp(/^#[0-9a-f]{6}$/).test(this.hcl)
	}
	
	get eyeColorIsValid() {
		const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
		
		return validColors.includes(this.ecl)
	}
	
	get passportNumberIsValid() {		
		return RegExp(/^\d{9}$/).test(this.pid)
	}

	get countryIdIsValid() {
		return true
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
