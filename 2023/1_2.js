const fs = require('fs')

function treatData(data) {
    function treatLine(line) {
        if (line === '') {
            return 0
        }

        /*const digitsAsLetters = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        }*/
        // Why ?
        const digitsAsLetters = {
            one: 'on1ne',
            two: 'tw2wo',
            three: 'thre3hree',
            four: 'fou4our',
            five: 'fiv5ive',
            six: 'si6ix',
            seven: 'seve7even',
            eight: 'eigh8ight',
            nine: 'nin9ine'
        }

        let digitsAsLettersKeys = Object.keys(digitsAsLetters).join('|')
        let findDigitsAsLetterRegExp = new RegExp(`(${digitsAsLettersKeys})`)
        let match

        while((match = findDigitsAsLetterRegExp.exec(line)) !== null) {
            line = line.replace(match[1], digitsAsLetters[match[1]])
        }

        const firstDigitRegex = /^\D*(\d)/g
        const lastDigitRegex = /(\d)\D*$/g
        const firstNumber = firstDigitRegex.exec(line)[1]
        const lastNumber = lastDigitRegex.exec(line)[1]

        return parseInt(firstNumber + lastNumber, 10)
    }

    const lines = data.split('\n')

    console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected: 53254
}

// example data
/*treatData(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`) // expected: 281*/

fs.readFile('./data/1.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})
