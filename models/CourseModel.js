const uuid = require('uuid')

const fs = require('fs')
const path = require('path')

class Course {
	constructor(title, price, image) {
		this.title = title
		this.price = price
		this.image = image
		this.id = uuid.v4()
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			image: this.image,
			id: this.id
		}
	}

	async save() {
		const courses = await Course.getAll()

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

	static async getByID(id) {
		const coursesData = await Course.getAll()

		return coursesData.find(course => course.id === id)
	}

	static async update(course) {
		const courses = await Course.getAll()
		const index = courses.findIndex(c => c.id === course.id)

		courses[index] = course

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

	static async deleteCourse(course) {
		const courses = await Course.getAll()
		const index = courses.findIndex(c => c.id === course.id)


		courses.splice(index, 1)

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
}

module.exports = Course