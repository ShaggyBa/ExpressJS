const uuid = require('uuid')

const fs = require('fs')
const path = require('path')

class AddCourse {
	constructor(title, price, imageURL) {
		this.title = title
		this.price = price
		this.imageURL = imageURL
		this.id = uuid.v4()
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			image: this.imageURL,
			id: this.id
		}
	}

	async save() {
		const courses = await AddCourse.getAll()

		courses.push(this.toJSON())

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				(err) => {
					if (err) reject(err)
					else resolve()

				}

			)
		})


	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				'utf-8',
				(err, content) => {
					if (err) reject(err)
					else resolve(JSON.parse(content))
				}
			)
		})
	}
}

module.exports = AddCourse