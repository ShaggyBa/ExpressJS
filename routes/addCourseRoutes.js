const { Router } = require('express')
const Course = require('../models/CourseModel')


const router = Router()


router.get('/', (req, res) => {
	res.render('addcourse', {
		title: "Add course",
		isAdd: true
	})
})

router.post('/', async (req, res) => {
	const course = req.body
	const addCourse = new Course(course.title, course.price, course.imageURL)
	await addCourse.save()
	res.redirect("courses")
})

module.exports = router
