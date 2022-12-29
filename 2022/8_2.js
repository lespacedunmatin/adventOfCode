const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return 0
		}

		return [...line].map(height => ({height: parseInt(height, 10), scenicScore: undefined}))
	}
	function getScenicScore(treeGrid, vIndex, hIndex) {
		const tree = treeGrid[vIndex][hIndex]
		const dirScenicScore = (trees) => {
			const firstTallerTreeIndex = trees.findIndex(aTree => aTree.height >= tree.height)

			return firstTallerTreeIndex > -1 ? trees.slice(0, firstTallerTreeIndex + 1).length : trees.length
		}

		if (vIndex === 0 || hIndex === 0 || vIndex === treeGrid.length - 1 || hIndex === treeGrid[vIndex].length - 1) {
			return 0
		}

		const north = treeGrid.filter((line, lineIndex) => lineIndex < vIndex).map(line => line[hIndex]).reverse()
		const east = treeGrid[vIndex].filter((tree, treeIndex) => treeIndex > hIndex)
		const south = treeGrid.filter((line, lineIndex) => lineIndex > vIndex).map(line => line[hIndex])
		const west = treeGrid[vIndex].filter((tree, treeIndex) => treeIndex < hIndex).reverse()

		return dirScenicScore(north) * dirScenicScore(east) * dirScenicScore(south) * dirScenicScore(west)
	}

	const lines = data.split('\n')
	const treeGrid = lines.map(line => treatLine(line))
		.map((line, vIndex, treeGrid) => line
			.map((tree, hIndex) => ({eight: tree.height, scenicScore: getScenicScore(treeGrid, vIndex, hIndex)}))
		)

	console.log(treeGrid.reduce((acc, line) => {
		const lineHighestScenicScore = line.sort((a, b) => b.scenicScore - a.scenicScore)[0].scenicScore

		return lineHighestScenicScore > acc ? lineHighestScenicScore : acc
	}, 0)) // expected:
}

// example data
/* treatData(`30373
25512
65332
33549
35390`)*/ // expected: 8

fs.readFile('./data/8.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
