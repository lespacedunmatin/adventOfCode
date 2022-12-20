const fs = require('fs')

class File {
	name
	size

	constructor(data) {
		this.name = data.name
		this.size = data.size
	}
}
class Directory {
	filesAndDirectories = []
	parentDirectory
	name

	get size() {
		// Should memoïze for perfs
		return this.filesAndDirectories.reduce((acc, fileOrDirectory) => acc + fileOrDirectory.size, 0)
	}

	get directories() {
		return this.filesAndDirectories.filter(fileOrDirectory => fileOrDirectory instanceof Directory)
	}

	get files() {
		return this.filesAndDirectories.filter(fileOrDirectory => fileOrDirectory instanceof File)
	}

	constructor(data) {
		this.parentDirectory = data.parentDirectory
		this.name = data.name
	}

	findDirectory(directoryName) {
		return this.filesAndDirectories.find(fileOrDirectory => {
			if (fileOrDirectory instanceof File) {
				return false
			}

			return fileOrDirectory.name === directoryName
		})
	}

	findFile(fileName) {
		return this.filesAndDirectories.find(fileOrDirectory => {
			if (fileOrDirectory instanceof Directory) {
				return false
			}

			return fileOrDirectory.name === fileName
		})
	}

	findOrCreateDirectory(directoryName) {
		const childDirectory = this.findDirectory(directoryName)

		if (childDirectory) {
			return childDirectory
		}

		const newDirectory = new Directory({parentDirectory: this, name: directoryName})

		this.filesAndDirectories.push(newDirectory)

		return newDirectory;
	}

	findOrCreateFile(data) {
		const file = this.findFile(data.name)

		if (file) {
			return file
		}

		const newFile = new File(data)

		this.filesAndDirectories.push(newFile)

		return newFile
	}

	getAllDirectories() {
		const directories = []

		for (let directory of this.directories) {
			directories.push(directory, ...directory.getAllDirectories())
		}

		return directories
	}
}
class MyFileSystem {
	currentDirectory
	structure = new Directory({name: '/', parentDirectory: undefined})

	constructor() {
		this.structure.parentDirectory = this.structure
		this.goToRoot()
	}

	addDirectory(directoryName) {
		this.currentDirectory.findOrCreateDirectory(directoryName)
	}

	addFileIfNotExists(data) {
		this.currentDirectory.findOrCreateFile(data)
	}

	getDirectoriesUnderSize(size) {
		return this.structure.getAllDirectories().filter(directory => directory.size <= size)
	}

	goToRoot() {
		this.currentDirectory = this.structure
	}

	goToChildDirectory(directoryName) {
		this.currentDirectory = this.currentDirectory.findOrCreateDirectory(directoryName)
	}

	goToParentDirectory() {
		this.currentDirectory = this.currentDirectory.parentDirectory
	}
}

function treatData(data) {
	const fileSystem = new MyFileSystem()
	const lines = data.split('\n')

	for (let line of lines) {
		const [firstChars, secondChars, thirdChars] = line.split(' ')
		switch (firstChars) {
			case '$':
				switch (secondChars) {
					case 'cd':
						switch (thirdChars) {
							case '/':
								fileSystem.goToRoot()
								break
							case '..':
								fileSystem.goToParentDirectory()
								break
							default:
								fileSystem.goToChildDirectory(thirdChars)
								break
						}
						break
					case 'ls':
						// nothing to do I guess
						break
				}
				break
			case 'dir':
				fileSystem.addDirectory(secondChars)
				break
			default:
				fileSystem.addFileIfNotExists({size : parseInt(firstChars, 10), name: secondChars})
				break
		}
	}

	console.log(fileSystem.getDirectoriesUnderSize(100_000)
		.reduce((acc, directory) => acc + directory.size, 0)) // expected: 1_648_397
}

// example data
/* treatData(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)*/ // expected: 95_437

fs.readFile('./data/7.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return
	}

	treatData(data)
})
