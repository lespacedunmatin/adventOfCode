const fs = require('fs')

class BandOfElves {
    elves = []

    get maxCaloriesCarriedByAnElf() {
        return this.elves.reduce((max, elf) => max > elf.totalCalories ? max : elf.totalCalories, 0)
    }

    get caloriesCarriedByThreeTopElves() {
        this.elves.sort((a, b) => b.totalCalories - a.totalCalories )

        return this.elves.slice(0, 3).reduce((sum, elf) => sum + elf.totalCalories, 0)
    }

    constructor(elves) {
        this.elves = elves
    }

    newElf() {
        this.elves.push(new Elf())
    }
}
class Elf {
    bag = []

    get totalCalories() {
        return this.bag.reduce((acc, value) => acc + value, 0)
    }

    constructor() {
    }
}

function treatData(data) {

    const groupDataPerElf = () => {
        const lines = data.split('\n')
        const bandOfElves = new BandOfElves([new Elf()])

        for (const line of lines) {
            if (line === '') {
                bandOfElves.newElf();
                continue
            }

            bandOfElves.elves[bandOfElves.elves.length - 1].bag.push(parseInt(line, 10))
        }

        return bandOfElves
    }

    const bandOfElves = groupDataPerElf()
    console.log(bandOfElves.caloriesCarriedByThreeTopElves) // expect 207456
}

fs.readFile('./data/1.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }

    treatData(data);
})