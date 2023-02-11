const fs = require('fs')

function treatData(data) {
    const addPrefix = 'addx '
    const registerValues = [1, 1]
    const crtRows = []
    let lastValue = 1

    function treatLine(line) {
        if (line === '') {
            return
        }

        if (line.startsWith(addPrefix)) {
            const value = parseInt(line.replace(addPrefix, ''), 10)

            registerValues.push(lastValue)

            lastValue = lastValue + value

            registerValues.push(lastValue)
        }

        if (line === 'noop') {
            registerValues.push(lastValue)
        }
    }
    function calculateCRT() {
        let currentRow = ''
        let currentPosition
        const usefulRegisterValues = registerValues.slice(1)

        usefulRegisterValues.forEach((registerValue, index) => {
            currentPosition = index % 40

            currentRow += Math.abs(currentPosition - registerValue) < 2 ? '#' : '.'

            if (index % 40 === 39) {
                crtRows.push(currentRow.slice())
                currentRow = ''
            }
        })
    }

    data.split('\n').map(line => treatLine(line))
    calculateCRT()

    console.log(crtRows)
    // Expected
    /*
      '####.###...##..###..#..#.####..##..#..#.',
      '#....#..#.#..#.#..#.#..#.#....#..#.#..#.',
      '###..#..#.#....#..#.####.###..#....####.',
      '#....###..#.##.###..#..#.#....#.##.#..#.',
      '#....#....#..#.#....#..#.#....#..#.#..#.',
      '#....#.....###.#....#..#.#.....###.#..#.'
     */
}

// example data
/* treatData(`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`)*/
// expected:
/*
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
 */

fs.readFile('./data/10.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})
