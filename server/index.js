require('dotenv').config()
const express = require('express')
const massive = require('massive')
const enrollCtrl = require('./controllers/enrollmentController')
const studentCtrl = require('./controllers/studentController')
const classCtrl = require('./controllers/classController')


const app = express()

const { CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())

//Class Endpoints
app.get('/api/classes', classCtrl.getClasses)
app.post('/api/classes', classCtrl.addClass)
app.put('/api/classes/:classid', classCtrl.changeClassRoom)
app.delete('/api/classes/:classid', classCtrl.deleteClass)

//Student Endpoints
app.get('/api/students', studentCtrl.getAllStudents)
app.get('/api/students/:studentid', studentCtrl.getOneStudent)
app.post('/api/students', studentCtrl.newStudent)
app.put('/api/students/:studentid', studentCtrl.updateGPA)
app.delete('/api/students/:studentid', studentCtrl.deleteStudent)


//Enrollment Endpoints
app.get('/api/enrollments', enrollCtrl.getAllEnrollments)
app.get('/api/enrollments/:classname', enrollCtrl.getOneClassEnrollments)
app.post('/api/enrollments/:classid/:studentid', enrollCtrl.enrollStudent)
app.delete('/api/enrollments/:classid/:studentid', enrollCtrl.dropClassEnrollment)




massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})