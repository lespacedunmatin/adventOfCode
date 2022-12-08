const fs = require('fs')

class Shape {
    value
    _defeats

    constructor(data) {
        this.value = data.value
    }

    defeats(shape) {
        // First call sets the value
        if (!this._defeats) {
            this._defeats = shape
            return
        }

        return this._defeats === shape
    }
}

const rock = new Shape({value: 1})
const paper = new Shape({value: 2})
const scissors = new Shape({value: 3})
const score = {win: 6, draw: 3, loose: 0}

function letterToShape(letter) {
    switch (letter) {
        case 'A':
            return rock
        case 'B':
            return paper
        case 'C':
            return scissors
        default:
            throw new Error('Unexpected letter');
    }
}

function letterToExpectedResult(letter) {
    switch (letter) {
        case 'X':
            return 'loose'
        case 'Y':
            return 'draw'
        case 'Z':
            return 'win'
        default:
            throw new Error('Unexpected letter');
    }
}

rock.defeats(scissors)
paper.defeats(rock)
scissors.defeats(paper)

function treatData(data) {
    const rounds = data.split('\n')
    const roundScore = (round) => {
        const [opponent, expectedResult] = round.split(' ')
            .map((letter, index) => index ? letterToExpectedResult(letter) : letterToShape(letter))

        switch (expectedResult) {
            case 'win':
                const winningShape = () => [rock, paper, scissors].find(shape => shape.defeats(opponent))
                return score[expectedResult] + winningShape().value
            case 'draw':
                return score[expectedResult] + opponent.value
            case 'loose':
                const loosingShape = () => [rock, paper, scissors].find(shape => opponent.defeats(shape))
                return score[expectedResult] + loosingShape().value
                // could also be
                // return score[expectedResult] + opponent._defeats.value
        }
    }

    console.log(rounds.reduce((acc, round) => acc + roundScore(round), 0)) // Expect 14184
}

/*treatData(`A Y
B X
C Z`)*/ // expect 12

fs.readFile('./data/2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})