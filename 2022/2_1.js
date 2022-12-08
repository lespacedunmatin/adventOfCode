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
        case 'X':
            return rock
        case 'B':
        case 'Y':
            return paper
        case 'C':
        case 'Z':
            return scissors
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
        const [opponent, me] = round.split(' ').map(letter => letterToShape(letter))

        if (opponent === me) {
            return score.draw + me.value
        }

        return me.defeats(opponent) ? score.win + me.value : score.loose + me.value
    }

    console.log(rounds.reduce((acc, round) => acc + roundScore(round), 0)) // Expect 13675
}

/*treatData(`A Y
B X
C Z`)*/ // expect 15

fs.readFile('./data/2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})