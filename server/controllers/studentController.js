module.exports = {
  newStudent: async (req, res) => {
    const db = req.app.get('db')
    const { first_name, last_name, home_state } = req.body

    if ((!first_name) || (!last_name) || (!home_state)) {
      return res.send('Please provide all required information including First and Last Name and Home State.')
    }
    await db.new_student([first_name, last_name, home_state])

    res.sendStatus(200)
  },
  getAllStudents: async (req, res) => {
    const db = req.app.get('db')
    const students = await db.get_all_students([])

    res.status(200).send(students)
  },
  getOneStudent: async (req, res) => {
    const db = req.app.get('db')
    const { studentid } = req.params

    if (!studentid) {
      res.status(404).send('Student not found.')
    }

    const [student] = await db.get_one_student([studentid])
    res.status(200).send(student)
  },
  updateGPA: async (req, res) => {
    const db = req.app.get('db')
    const { studentid } = req.params
    const { gpa } = req.body

    const [studentcheck] = await db.get_one_student([studentid])
    if (!studentcheck) {
      return res.status(404).send('Student not found.')
    }

    if (!gpa) {
      res.status(400).send('Please provide a GPA')
    }

    const [student] = await db.update_gpa([gpa, studentid])
    res.status(200).send(student)
  },
  deleteStudent: async (req, res) => {
    const db = req.app.get('db')
    const { studentid } = req.params

    const [studentcheck] = await db.get_one_student([studentid])
    if (!studentcheck) {
      return res.status(404).send('Student not found.')
    }

    await db.delete_student([studentid])
    res.sendStatus(200)
  }
}