class Test {
	divisibleBy
	ifTrue
	ifFalse

	constructor(data) {
		this.divisibleBy = data.divisibleBy
		this.ifTrue = data.ifTrue
		this.ifFalse = data.ifFalse
	}

	result(newWorryValue) {
		return newWorryValue % this.divisibleBy === 0 ? this.ifTrue : this.ifFalse;
	}
}
class Monkey {
	item
	operation
	test
	nbInspections
	constructor(data) {
		this.nbInspections = 0
		this.items = data.items
		this.operation = data.operation
		this.test = data.test
	}

	throwTo(item, monkeyId) {
		const targetMonkey = monkeyPack.monkeys[monkeyId]

		if (monkeyId === undefined || monkeyId === null) {
			throw new Error(`no target monkeyId`)
		}

		if (!targetMonkey) {
			throw new Error(`no target monkey ${monkeyId}`)
		}

		if (targetMonkey === this) {
			throw new Error(`Can’t throw to self`)
		}

		targetMonkey.items.push(item)
	}

	inspect() {
		while (this.items.length) {
			const item = this.items.shift()
			const newWorryValue = (this.operation === 'squared' ? item * item : eval(`${item} ${this.operation}`)) % monkeyPack.superModulo

			this.throwTo(newWorryValue, this.test.result(newWorryValue))
			this.nbInspections++
		}
	}
}
class MonkeyPack {
	_superModulo
	monkeys
	get monkeyBusiness() {
		// Do not sort monkeys
		const tempMonkeys = [...this.monkeys]
		tempMonkeys.sort((a, b) => b.nbInspections - a.nbInspections)

		return tempMonkeys[0].nbInspections * tempMonkeys[1].nbInspections
	}

	get superModulo() {
		// Thanks to the reddit discussion
		if (!this._superModulo) {
			this._superModulo = this.monkeys.reduce((acc, monkey) => acc * monkey.test.divisibleBy, 1)
		}
		return this._superModulo
	}

	constructor(data) {
		this.monkeys = data
	}
}

const nbOfRounds = 10_000
/* const monkeyPack = new MonkeyPack([
	new Monkey({items: [79, 98], operation: `* 19`, test: new Test({divisibleBy: 23, ifTrue: 2, ifFalse: 3})}),
	new Monkey({items: [54, 65, 75, 74], operation: `+ 6`, test: new Test({divisibleBy: 19, ifTrue: 2, ifFalse: 0})}),
	new Monkey({items: [79, 60, 97], operation: `squared`, test: new Test({divisibleBy: 13, ifTrue: 1, ifFalse: 3})}),
	new Monkey({items: [74], operation: `+ 3`, test: new Test({divisibleBy: 17, ifTrue: 0, ifFalse: 1})})
]) // expected: 10_605 */
const monkeyPack = new MonkeyPack([
	new Monkey({items: [72, 64, 51, 57, 93, 97, 68], operation: `* 19`, test: new Test({divisibleBy: 17, ifTrue: 4, ifFalse: 7})}),
	new Monkey({items: [62], operation: `* 11`, test: new Test({divisibleBy: 3, ifTrue: 3, ifFalse: 2})}),
	new Monkey({items: [57, 94, 69, 79, 72], operation: `+ 6`, test: new Test({divisibleBy: 19, ifTrue: 0, ifFalse: 4})}),
	new Monkey({items: [80, 64, 92, 93, 64, 56], operation: `+ 5`, test: new Test({divisibleBy: 7, ifTrue: 2, ifFalse: 0})}),
	new Monkey({items: [70, 88, 95, 99, 78, 72, 65, 94], operation: `+ 7`, test: new Test({divisibleBy: 2, ifTrue: 7, ifFalse: 5})}),
	new Monkey({items: [57, 95, 81, 61], operation: `squared`, test: new Test({divisibleBy: 5, ifTrue: 1, ifFalse: 6})}),
	new Monkey({items: [79, 99], operation: `+ 2`, test: new Test({divisibleBy: 11, ifTrue: 3, ifFalse: 1})}),
	new Monkey({items: [68, 98, 62], operation: `+ 3`, test: new Test({divisibleBy: 13, ifTrue: 5, ifFalse: 6})})
]) // expected: 25935263541
let roundId = 0

while (roundId < nbOfRounds) {
	roundId++

	for (const monkey of monkeyPack.monkeys) {
		monkey.inspect()
	}
}

console.log(monkeyPack.monkeyBusiness)
