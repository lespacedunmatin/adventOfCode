const fs = require('fs')

function treatData(data) {
    function buildPairs() {
        const pairs = []
        function treatLine(line) {
            if (line === '') {
                return ''
            }

            return eval(line) // Don’t do that
        }

        const lines = data.split('\n').map(line => treatLine(line))

        lines.forEach((line, index) => {
            switch (index % 3) {
                case 0:
                    pairs.push([line])
                    break
                case 1:
                    pairs[pairs.length - 1].push(line)
                    break
                case 2:
                default:
                    break
            }
        })

        return pairs
    }

    function isPairInRightOrder(pair) {
        const [left, right] = pair
        let index = 0

        function isNumber(test) {
            return typeof test === 'number'
        }
        function isList(test) {
            return Array.isArray(test)
        }
        function testIndex() {
            function order(a, b) {
                if (a === b) {
                    return 0
                }

                if (a < b) {
                    return 1
                }

                return -1
            }

            // Left ran out of items
            if (left[index] === undefined && right[index] !== undefined) {
                return 1
            }

            // Right ran out of items
            if (left[index] !== undefined && right[index] === undefined) {
                return -1
            }

            // Both lists are empty
            if (left[index] === undefined && right[index] === undefined) {
                return 0
            }

            if (isNumber(left[index]) && isNumber(right[index])) {
                return order(left[index], right[index])
            } else if (isList(left[index]) && isList(right[index])) {
                const order = isPairInRightOrder([left[index], right[index]])

                switch(order) {
                    case 0:
                        break
                    default:
                        return order
                }
            } else if (isNumber(left[index])) {
                return isPairInRightOrder([[left[index]], right[index]])
            } else {
                return isPairInRightOrder([left[index], [right[index]]])
            }

            return 0
        }

        if (!left.length && !right.length) {
            return 0
        }

        if (!left.length && right.length) {
            return 1
        }

        if (!right.length && left.length) {
            return -1
        }

        while (index < Math.max(left.length, right.length)) {
            switch (testIndex()) {
                case 1:
                    return 1
                case -1:
                    return -1
                case 0:
                default:
                    // will test next value
                    break
            }

            index++
        }

        return 0
    }

    const rightOrderIndices = buildPairs().map(pair => isPairInRightOrder(pair))
        .map((pairOrder, index) => pairOrder === 1 ? index + 1 : 0)
        .filter(rightOrderPairIndex => !!rightOrderPairIndex)

    console.log('result :', rightOrderIndices.reduce((acc, pairIndex) => acc + pairIndex, 0)) // expected: 5808
}

// example data
/*treatData(`[[],[9]]
[[],[4]]
`)*/
/*treatData(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`) // expected: 13*/


fs.readFile('./data/13.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data)
})
