const { Router } = require('express')
const AddCourse = require('../models/addCourseModel')


const router = Router()


router.get('/', (req, res) => {
	res.render('addcourse', {
		title: "Add course",
		isAdd: true
	})
})

router.post('/', async (req, res) => {
	const course = req.body
	const addCourse = new AddCourse(course.title, course.price, course.imageURL)
	await addCourse.save()
})

module.exports = router
