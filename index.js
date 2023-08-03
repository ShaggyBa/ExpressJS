const express = require('express')
const expressHandleBars = require('express-handlebars')

const mainPageRoutes = require('./routes/mainPageRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const addCourseRoutes = require('./routes/addCourseRoutes')
const cardRoutes = require('./routes/card')

const app = express()
const hbs = expressHandleBars.create(
	{
		defaultLayout: 'main',
		extname: 'hbs'
	})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', mainPageRoutes)
app.use('/courses', coursesRoutes)
app.use('/addcourse', addCourseRoutes)
app.use('/card', cardRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})