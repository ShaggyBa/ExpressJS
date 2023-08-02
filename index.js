const express = require('express')
const expressHandleBars = require('express-handlebars')

const mainPage = require('./routes/mainPageRoutes')
const courses = require('./routes/coursesRoutes')
const addCourse = require('./routes/addCourseRoutes')


const app = express()
const hbs = expressHandleBars.create(
	{
		defaultLayout: 'main',
		extname: 'hbs'
	})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', mainPage)
app.use('/courses', courses)
app.use('/addcourse', addCourse)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})