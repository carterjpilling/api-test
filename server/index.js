require('dotenv').config()
const express = require('express')
const massive = require('massive')
const enrollCtrl = require('./controllers/enrollmentController')
const studentCtrl = require('./controllers/studentController')
const classCtrl = require('./controllers/classController')
const teachCtrl = require('./controllers/teacherController')


const app = express()

const { CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())

//Class Endpoints
app.get('/api/classes', classCtrl.getClasses)
app.post('/api/classes', classCtrl.addClass)
app.put('/api/classes/:id', classCtrl.changeClassTeacher)
app.delete('/api/classes/:id', classCtrl.deleteClass)

//Student Endpoints
app.get('/api/students', studentCtrl.getAllStudents)
app.get('/api/student/:studentid', studentCtrl.getOneStudent)
app.post('/api/students', studentCtrl.newStudent)
app.put('/api/students/:studentid', studentCtrl.updateGPA)
app.delete('/api/student/:studentid', studentCtrl.deleteStudent)

//Teacher Endpoints


//Enrollment Endpoints


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})