const { Router } = require('express')

const Course = require('../models/CourseModel')

const router = Router()

router.get('/', async (req, res) => {
	const courses = await Course.getAll()
	res.render('courses', {
		title: "Courses",
		isCourses: true,
		courses
	})
})


router.get('/:id', async (req, res) => {
	const course = await Course.getByID(req.params.id)
	res.render('course', {
		layout: "empty",
		title: `Course ${course.title}`,
		course
	})
})

router.get('/:id/editcourse', async (req, res) => {
	const course = await Course.getByID(req.params.id)
	if (!req.query.allow) {
		return res.redirect('/')
	}
	res.render('editсourse', {
		title: `Edit ${course.title}`,
		course
	})
})

router.post('/editcourse', async (req, res) => {
	await Course.update(req.body)
	res.redirect('/courses')
})

router.get('/:id/deletecourse', async (req, res) => {
	const course = await Course.getByID(req.params.id)
	if (!req.query.allow) {
		return res.redirect('/')
	}
	res.render('deletecourse', {
		title: `Delete ${course.title}?`,
		course
	})
})

router.post('/deletecourse', async (req, res) => {
	await Course.deleteCourse(req.body)
	res.redirect('/courses')
})

module.exports = router
