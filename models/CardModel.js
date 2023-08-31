const path = require('path')
const fs = require('fs')


const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'card.json')

class Card {
	static async fetch() {
		return new Promise((resolve, reject) => {
			fs.readFile(pathToFile, 'utf-8', (err, content) => {
				if (err) reject(err)
				else resolve(JSON.parse(content))
			})
		})
	}

	static async add(course) {
		const card = await Card.fetch()

		const index = card.courses.findIndex(c => c.id === course.id)
		const candidate = card.courses[index]

		if (candidate) {
			candidate.count++
			card.courses[index] = candidate
		}
		else {
			course.count = 1
			card.courses.push(course)
		}

		card.price += +course.price

		return new Promise((resolve, reject) => {
			fs.writeFile(pathToFile, JSON.stringify(card), (err) => {
				if (err) reject(err)
				else resolve()
			})
		})
	}


	static async remove(id) {
		const card = await Card.fetch()

		const index = card.courses.findIndex(c => c.id === id)

		const course = card.courses[index]

		if (course?.count === 1) {
			card.courses = card.courses.filter(c => c.id !== id)
		}
		else {
			card.courses[index].count--
		}

		card.price -= course.price

		return new Promise((resolve, reject) => {
			fs.writeFile(pathToFile, JSON.stringify(card), (err) => {
				if (err) reject(err)
				else resolve(card)
			})
		})
	}

}

module.exports = Card