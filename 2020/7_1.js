const fs = require('fs')

class Bag {
	constructor(data) {
		this.name = data.name
		this.contains = data.contains || []
		this.containedBy = []
	}
}

function treatData(data) {
	const bags = {}
	const targetBagName = 'shiny gold'
	const bagsThatCanContainTarget = []
	
	
	function removeBagBags(string) {
		return string.replace(' bags', '').replace(' bag', '')
	}
	
	function findBag(bagName) {
		let bag = bags[bagName]
		
		if (!bag) {
			bag = new Bag({name: bagName})
			bags[bagName] = bag
		}
		
		return bag
	}
	
	function treatContains(containsString) {
		if (!containsString) {
			return
		}
		
		if (containsString.startsWith('no other')) {
			return []
		}
		
		let contains = containsString.replace('.', '').split(', ')
		
		contains = contains.map(string => {
			const bagsContained = []
			
			string = removeBagBags(string)
			
			let [quantity, ...bagName] = string.split(' ')
			
			bagName = bagName.join(' ')
			
			bag = findBag(bagName)
			
			return {quantity, bag}
		})
		
		return contains
	}
	
	function treatLine(line) {
		if (line === '') {
			return
		}
		const [bagName, containsString] = line.split(' bags contain ')
		const contains = treatContains(containsString)
		const bag = findBag(removeBagBags(bagName))
		
		bag.contains = contains
		
		contains.forEach(containsItem => {
			containsItem.bag.containedBy.push(bag)
		})
	}
	
	function filterByTargetBag() {		
		const targetBag = findBag(targetBagName)
		
		function flattenBags(bag) {
			bag.containedBy.forEach(container => {
				if (!bagsThatCanContainTarget.includes(container)) {
					bagsThatCanContainTarget.push(container)
					
					flattenBags(container)
				}
			})
		}
		
		flattenBags(targetBag)
	}
	
	data.split('\n')
		.forEach(treatLine)

	filterByTargetBag()
	
	console.log(bagsThatCanContainTarget.length) // expected: 124
}

fs.readFile('./data/7.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	
	treatData(data)
})
