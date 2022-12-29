const fs = require('fs')

function treatData(data) {
	function treatLine(line) {
		if (line === '') {
			return 0
		}

		return [...line].map(height => ({height: parseInt(height, 10), visible: undefined}))
	}
	function isVisible(treeGrid, vIndex, hIndex) {
		const tree = treeGrid[vIndex][hIndex]

		if (vIndex === 0 || hIndex === 0 || vIndex === treeGrid.length - 1 || hIndex === treeGrid[vIndex].length - 1) {
			return true
		}

		const north = treeGrid.filter((line, lineIndex) => lineIndex < vIndex).map(line => line[hIndex])
		const east = treeGrid[vIndex].filter((tree, treeIndex) => treeIndex > hIndex)
		const south = treeGrid.filter((line, lineIndex) => lineIndex > vIndex).map(line => line[hIndex])
		const west = treeGrid[vIndex].filter((tree, treeIndex) => treeIndex < hIndex)

		// Visible if in at least one direction all the trees are smaller.
		return [north, east, south, west].some(direction => direction.every(aTree => aTree.height < tree.height))
	}
	const countVisibleTreesInLine = (line) => line.reduce((acc, tree) => acc + (tree.visible ? 1 : 0), 0)

	const lines = data.split('\n')
	const treeGrid = lines.map(line => treatLine(line))
		.map((line, vIndex, treeGrid) => line
			.map((tree, hIndex) => ({eight: tree.height, visible: isVisible(treeGrid, vIndex, hIndex)}))
		)

	console.log(treeGrid.reduce((acc, line) => acc + countVisibleTreesInLine(line), 0)) // expected:
}

// example data
/*treatData(`30373
25512
65332
33549
35390`)*/ // expected: 21

fs.readFile('./data/8.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
