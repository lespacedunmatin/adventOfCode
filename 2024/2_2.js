const fs = require('fs')

function treatData(data) {
    const safeDiff = 3;
    const isLineSafe = line => {
        if (line === '') {
            return 0
        }

        const values = line.split(' ').map(value => parseInt(value, 10))
        const valuesHaveError = (valuesList) => {
            const isIncreasing = valuesList[1] - valuesList[0] > 0
            const isValueUnsafe = (value, index, arr) =>
                (isIncreasing && value < arr[index - 1]) ||
                (!isIncreasing && value > arr[index - 1]) ||
                value === arr[index - 1] ||
                Math.abs(value - arr[index - 1]) > safeDiff

            return valuesList.some((value, index, arr) => isValueUnsafe(value, index, arr))
        }
        const hasListWithoutError = values => {
            let testIndex = 0

            while (testIndex < values.length) {
                const valuesListTest = [...values]

                valuesListTest.splice(testIndex, 1)

                if (!valuesHaveError(valuesListTest)) {
                    return true
                }

                testIndex++
            }

            return false
        }

        return valuesHaveError(values) ?
            hasListWithoutError(values)
            : true
    }
    const treatLine = (line) => isLineSafe(line) ? 1 : 0
    const lines = data.split('\n')

    console.log(lines.reduce((acc, line) => acc + treatLine(line), 0)) // expected: 707
}

// example data

/*
treatData(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`) // expected: 4
// Merci https://www.reddit.com/r/adventofcode/comments/1h4shdu/2024_day_2_part2_edge_case_finder/
treatData(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
48 46 47 49 51 54 56
1 1 2 3 4 5
1 2 3 4 5 5
5 1 2 3 4 5
1 4 3 2 1
1 6 7 8 9
1 2 3 4 3
9 8 7 6 7
7 10 8 10 11
29 28 27 25 26 25 22 20`) // expected: 14
*/
fs.readFile('./data/2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})

