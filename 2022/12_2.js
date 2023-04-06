const fs = require('fs')

function treatData(data) {
    const treatLine = (line, yIndex) => {
        const letterToNumber = (letter) => {
            switch (letter) {
                case 'S':
                    return 0
                case 'E':
                    return 27
                default:
                    return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1
            }
        }

        if (line === '') {
            return
        }

        return [...line].map((letter, xIndex) => ({elevation: letterToNumber(letter), x: xIndex, y: yIndex, stepNb: undefined}))
    }
    const getUnexploredTiles = (lastStep) => {
        const surroundingTiles = []

        // Above
        if (lastStep.x > 0) {
            surroundingTiles.push(tiles.find(tile => tile.x === lastStep.x - 1 && tile.y === lastStep.y))
        }

        // Under
        if (lastStep.x < nbColumns - 1) {
            surroundingTiles.push(tiles.find(tile => tile.x === lastStep.x + 1 && tile.y === lastStep.y))
        }

        // Left
        if (lastStep.y > 0) {
            surroundingTiles.push(tiles.find(tile => tile.x === lastStep.x && tile.y === lastStep.y - 1))
        }

        // Right
        if (lastStep.y < nbLines - 1) {
            surroundingTiles.push(tiles.find(tile => tile.x === lastStep.x && tile.y === lastStep.y + 1))
        }

        // Filter already visited tiles and unreachable tiles
        return surroundingTiles
            .filter(tile => (!visitedTiles.includes(tile)) && lastStep.elevation - tile.elevation <= 1)
    }
    const lines = data.split('\n')
    const nbLines = lines.length
    const nbColumns = lines[0].length
    const tiles = lines.map((line, yIndex) => treatLine(line, yIndex)).flat()
    const start = tiles.find(tile => tile.elevation === 0)
    const end = tiles.find(tile => tile.elevation === 27)
    const visitedTiles = [end]
    let paths = [visitedTiles]
    let pathFound = undefined
    let loopCount = 0

    // Normalize elevation of start and end
    start.elevation = 1
    end.stepNb = 0
    end.elevation = 26

    while (!pathFound) {
        loopCount++

        if (loopCount > nbLines * nbColumns) {
            throw new Error('Infinite loop suspected')
        }

        const newPaths = []

        for (let path of paths) {
            const lastStep = path[path.length - 1]

            for (let tile of getUnexploredTiles(lastStep)) {
                tile.stepNb = lastStep.stepNb + 1
                newPaths.push([...path, tile])
                visitedTiles.push(tile)

                if (tile.elevation === 1) {
                    pathFound = [...path, tile]
                }
            }
        }

        paths = newPaths
    }

    console.log(pathFound[pathFound.length - 1].stepNb)
}

// example data
/* treatData(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`) // expected: 29 */

fs.readFile('./data/12.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data) // expected: 443
})
